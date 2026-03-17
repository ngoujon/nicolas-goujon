<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Contact</title></head>
<body>
<p>Nouveau message depuis le formulaire de contact</p>
<p><strong>Sujets :</strong> {{ $subjectsLine ?? '' }}</p>
<p><strong>Nom :</strong> {{ $name ?? '' }}</p>
<p><strong>Email :</strong> {{ $email ?? '' }}</p>
<p><strong>Message :</strong></p>
<p>{{ $body ?? '' }}</p>
</body>
</html>
