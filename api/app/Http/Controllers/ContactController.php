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

            // Enregistrer l'erreur réelle pour diagnostic (fix-500.sh lit ce fichier)
            $logPath = storage_path('logs/mail-error.log');
            $message = '[' . now()->toIso8601String() . '] ' . $e->getMessage() . "\n"
                . $e->getFile() . ':' . $e->getLine() . "\n"
                . $e->getTraceAsString() . "\n---\n";
            @file_put_contents($logPath, $message, FILE_APPEND | LOCK_EX);

            $response = [
                'success' => false,
                'error' => 'Erreur lors de l’envoi du message. Réessayez plus tard.',
            ];
            if (config('app.debug')) {
                $response['debug'] = $e->getMessage();
            }

            return response()->json($response, 500);
        }
    }
}
