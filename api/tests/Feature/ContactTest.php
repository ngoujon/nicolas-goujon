<?php

namespace Tests\Feature;

use App\Mail\ContactConfirmation;
use App\Mail\ContactToOwner;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

/**
 * Tests du formulaire de contact (POST /api/contact).
 */
class ContactTest extends TestCase
{
    /** Données valides d'une soumission humaine (délai suffisant, honeypot vide). */
    private array $payload = [
        'name' => 'Jean Test',
        'email' => 'jean@example.com',
        'message' => 'Bonjour',
        'subjects' => ['Créer un site vitrine'],
        'website' => '',
        'elapsed_ms' => 5000,
    ];

    protected function setUp(): void
    {
        parent::setUp();
        Mail::fake();
        config(['mail.contact_to' => 'owner@example.com']);
    }

    public function test_healthcheck_responds(): void
    {
        $this->get('/up')->assertOk();
    }

    public function test_sends_message_to_owner_and_confirmation_to_sender(): void
    {
        $this->postJson('/api/contact', $this->payload)
            ->assertOk()
            ->assertJson(['success' => true]);

        Mail::assertSent(ContactToOwner::class, fn ($mail) => $mail->hasTo('owner@example.com')
            && $mail->subjectsLine === 'Créer un site vitrine');
        Mail::assertSent(ContactConfirmation::class, fn ($mail) => $mail->hasTo('jean@example.com'));
    }

    public function test_strips_html_tags_from_free_text_fields(): void
    {
        $this->postJson('/api/contact', [...$this->payload, 'name' => '<b>Jean</b>', 'message' => '<script>x</script>Salut'])
            ->assertOk();

        Mail::assertSent(ContactToOwner::class, fn ($mail) => $mail->name === 'Jean' && $mail->message === 'xSalut');
    }

    public function test_validates_required_fields(): void
    {
        $this->postJson('/api/contact', ['email' => 'pas-un-email'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email', 'message']);

        Mail::assertNothingSent();
    }

    public function test_silently_ignores_bots(): void
    {
        // Honeypot rempli
        $this->postJson('/api/contact', [...$this->payload, 'website' => 'http://spam.example'])
            ->assertOk()->assertJson(['success' => true]);
        // Soumission trop rapide
        $this->postJson('/api/contact', [...$this->payload, 'elapsed_ms' => 500])
            ->assertOk()->assertJson(['success' => true]);

        Mail::assertNothingSent();
    }

    public function test_returns_503_when_recipient_is_not_configured(): void
    {
        config(['mail.contact_to' => null]);

        $this->postJson('/api/contact', $this->payload)->assertStatus(503);

        Mail::assertNothingSent();
    }

    public function test_adds_security_headers(): void
    {
        $this->postJson('/api/contact', $this->payload)
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'DENY');
    }
}
