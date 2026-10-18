<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

/**
 * Message du formulaire de contact transmis au propriétaire du site.
 * Le Reply-To pointe vers l'expéditeur pour pouvoir lui répondre directement.
 */
class ContactToOwner extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $email,
        public string $message,
        public string $subjectsLine,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '[Contact site] Message de '.$this->name.' - '.$this->subjectsLine,
            replyTo: [new Address($this->email, $this->name)],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-to-owner',
            // `$message` est réservé dans les vues d'email Laravel : le texte y est exposé sous `body`.
            with: [
                'body' => $this->message,
            ],
        );
    }
}
