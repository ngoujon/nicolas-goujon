<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
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
            replyTo: [new Address($this->email, $this->name)],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-to-owner',
            with: [
                'body' => $this->message,
            ],
        );
    }
}
