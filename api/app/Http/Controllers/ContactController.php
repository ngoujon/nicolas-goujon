<?php

namespace App\Http\Controllers;

use App\Mail\ContactConfirmation;
use App\Mail\ContactToOwner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /** Délai minimum (ms) entre l'affichage du formulaire et sa soumission. */
    private const MIN_ELAPSED_MS = 3000;

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string|max:10000',
            'subjects' => 'sometimes|array',
            'subjects.*' => 'string|max:255',
            // Honeypot : champ invisible côté front, ne doit jamais être rempli par un humain.
            'website' => 'nullable|string|max:255',
            'elapsed_ms' => 'nullable|integer|min:0',
        ]);

        if ($this->looksLikeSpam($validated)) {
            // On répond succès sans envoyer d'email, pour ne pas donner d'indice au bot.
            return response()->json(['success' => true]);
        }

        $subjects = $validated['subjects'] ?? [];
        $subjectsLine = count($subjects) > 0
            ? implode(', ', $subjects)
            : 'Contact depuis le site web';

        $contactEmailTo = config('mail.contact_to');
        if (empty($contactEmailTo)) {
            // En local / dev, accepter une adresse factice pour MailHog
            if (config('app.env') === 'local') {
                $contactEmailTo = config('mail.from.address', 'dev@localhost');
            } else {
                return response()->json([
                    'success' => false,
                    'error' => 'Service email non configuré.',
                ], 503);
            }
        }

        try {
            Mail::to($contactEmailTo)
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
            // Détails d’erreur uniquement en local (jamais en prod, même si APP_DEBUG=true)
            if (config('app.env') === 'local' && config('app.debug')) {
                $response['debug'] = $e->getMessage();
                $response['debug_file'] = $e->getFile() . ':' . $e->getLine();
            }

            return response()->json($response, 500);
        }
    }

    /**
     * Détecte un bot via honeypot rempli ou soumission trop rapide après affichage du formulaire.
     */
    private function looksLikeSpam(array $validated): bool
    {
        if (! empty($validated['website'])) {
            return true;
        }

        $elapsedMs = $validated['elapsed_ms'] ?? null;

        return $elapsedMs !== null && $elapsedMs < self::MIN_ELAPSED_MS;
    }
}
