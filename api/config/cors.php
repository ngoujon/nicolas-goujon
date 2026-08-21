<?php

// Restreint le CORS à l'API de contact : uniquement POST, depuis le domaine du site
// (au lieu du défaut Laravel qui autorise '*'). Le site étant servi via un proxy nginx
// sur le même domaine que l'API en production, ce réglage est surtout une défense en
// profondeur contre les appels cross-origin non désirés.
return [

    'paths' => ['api/*'],

    'allowed_methods' => ['POST'],

    'allowed_origins' => array_filter(array_map('trim', explode(',', env('CORS_ALLOWED_ORIGINS', env('APP_URL', ''))))),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['Content-Type', 'Accept'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
