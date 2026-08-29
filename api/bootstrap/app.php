<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // L'API tourne derrière deux proxies nginx (celui de l'hôte, puis celui
        // du conteneur web). Sans cette déclaration, Laravel voit l'IP de la
        // passerelle Docker pour TOUS les visiteurs : le `throttle` du
        // formulaire de contact deviendrait un quota global de 5 requêtes/minute
        // partagé par tout le monde, et donc trivial à saturer.
        // On ne fait confiance qu'aux plages privées (les proxies), jamais à un
        // X-Forwarded-For envoyé depuis Internet : l'IP réelle du client reste
        // la dernière adresse non approuvée de la chaîne.
        $middleware->trustProxies(at: [
            '127.0.0.1',
            '10.0.0.0/8',
            '172.16.0.0/12',
            '192.168.0.0/16',
        ]);

        $middleware->append(\App\Http\Middleware\SecurityHeaders::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
