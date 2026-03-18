<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Confirmation</title></head>
<body>
<p>Bonjour {{ $name ?? '' }},</p>
<p>Votre message envoyé depuis le formulaire de contact m'est bien parvenu.</p>
<p>Vous aurez une réponse dans les meilleurs délais.</p>
<p>Copie de votre message :</p>
<p>---<br>Sujets : {{ $subjectsLine ?? '' }}</p>
<p>Message :<br>{{ $body ?? '' }}</p>
<p>---</p>
<p>Cordialement,<br>Nicolas GOUJON - Développeur Web &amp; Product Owner</p>
</body>
</html>
