<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

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
            subject: '[Contact site] Message de ' . $this->name . ' - ' . $this->subjectsLine,
        );
    }

    public function content(): Content
    {
        return new Content(
            text: 'emails.contact-to-owner',
        );
    }
}
