<?php

namespace App\Http\Controllers;

use App\Mail\ContactConfirmation;
use App\Mail\ContactToOwner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Throwable;

/**
 * Formulaire de contact du site (POST /api/contact, limité à 5 requêtes/minute par IP).
 *
 * Envoie le message au propriétaire du site, puis un accusé de réception à l'expéditeur.
 */
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

        // Défense en profondeur : retire toute balise HTML des champs libres avant usage,
        // en plus de l'échappement automatique de Blade dans les templates d'email.
        $name = strip_tags($validated['name']);
        $message = strip_tags($validated['message']);
        $subjects = array_map('strip_tags', $validated['subjects'] ?? []);
        $subjectsLine = $subjects ? implode(', ', $subjects) : 'Contact depuis le site web';

        $recipient = $this->resolveRecipient();
        if ($recipient === null) {
            return response()->json([
                'success' => false,
                'error' => 'Service email non configuré.',
            ], 503);
        }

        try {
            Mail::to($recipient)->send(new ContactToOwner(
                name: $name,
                email: $validated['email'],
                message: $message,
                subjectsLine: $subjectsLine,
            ));

            Mail::to($validated['email'])->send(new ContactConfirmation(
                name: $name,
                message: $message,
                subjectsLine: $subjectsLine,
            ));

            return response()->json(['success' => true]);
        } catch (Throwable $e) {
            report($e);
            $this->logMailError($e);

            $response = [
                'success' => false,
                'error' => 'Erreur lors de l’envoi du message. Réessayez plus tard.',
            ];
            // Détails d’erreur uniquement en local (jamais en prod, même si APP_DEBUG=true)
            if (config('app.env') === 'local' && config('app.debug')) {
                $response['debug'] = $e->getMessage();
                $response['debug_file'] = $e->getFile().':'.$e->getLine();
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

    /**
     * Adresse destinataire des messages (CONTACT_EMAIL_TO). En local, repli sur l'adresse
     * d'expédition pour permettre les tests avec MailHog ; ailleurs, null si non configurée.
     */
    private function resolveRecipient(): ?string
    {
        $recipient = config('mail.contact_to');
        if (! empty($recipient)) {
            return $recipient;
        }

        return config('app.env') === 'local' ? config('mail.from.address', 'dev@localhost') : null;
    }

    /**
     * Trace l'erreur d'envoi dans storage/logs/mail-error.log (lu par tools/fix-500.sh).
     */
    private function logMailError(Throwable $e): void
    {
        $entry = '['.now()->toIso8601String().'] '.$e->getMessage()."\n"
            .$e->getFile().':'.$e->getLine()."\n"
            .$e->getTraceAsString()."\n---\n";
        @file_put_contents(storage_path('logs/mail-error.log'), $entry, FILE_APPEND | LOCK_EX);
    }
}
