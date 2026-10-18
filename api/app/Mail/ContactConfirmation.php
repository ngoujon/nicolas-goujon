<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

/**
 * Accusé de réception envoyé à l'expéditeur, avec un rappel de son message.
 */
class ContactConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $message,
        public string $subjectsLine,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmation de réception de votre message - Nicolas GOUJON',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-confirmation',
            // `$message` est réservé dans les vues d'email Laravel : le texte y est exposé sous `body`.
            with: [
                'body' => $this->message,
            ],
        );
    }
}
