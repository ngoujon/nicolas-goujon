<?php

namespace App\Http\Controllers;

use App\Mail\ContactConfirmation;
use App\Mail\ContactToOwner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string|max:10000',
            'subjects' => 'sometimes|array',
            'subjects.*' => 'string|max:255',
        ]);

        $subjects = $validated['subjects'] ?? [];
        $subjectsLine = count($subjects) > 0
            ? implode(', ', $subjects)
            : 'Contact depuis le site web';

        $contactEmailTo = config('mail.contact_to');
        if (empty($contactEmailTo)) {
            return response()->json([
                'success' => false,
                'error' => 'Service email non configuré.',
            ], 503);
        }

        try {
            Mail::to($contactEmailTo)
                ->replyTo($validated['email'], $validated['name'])
                ->send(new ContactToOwner(
                    name: $validated['name'],
                    email: $validated['email'],
                    message: $validated['message'],
                    subjectsLine: $subjectsLine,
                ));

            Mail::to($validated['email'])
                ->send(new ContactConfirmation(
                    name: $validated['name'],
                    message: $validated['message'],
                    subjectsLine: $subjectsLine,
                ));

            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
                'success' => false,
                'error' => 'Erreur lors de l’envoi du message. Réessayez plus tard.',
            ], 500);
        }
    }
}
