<?php

// définition des variables
$prenom = $_POST['prenom'];
$nom = $_POST['nom'];
$mail = $_POST['email'];
$content = $_POST['message'];

//echo "<br><br>" ;
$message  = "Vous avez reçu un message depuis votre site internet.</b><br><br>";
$message .= "<b>Prénom NOM: </b>".$prenom." ".$nom."<br>";
$message .= "<b>Email : </b>".$mail."<br>";
$message .= "<br>";
$message .= $content."<br>";

//echo $message;
$to      = 'pro@ngoujon.net';
$subject = "contact web : ".$mail ;
$headers = 'From:'.$mail. "\r\n" .
'Reply-To:'.$mail. "\r\n" .
"Content-type:text/html;charset=UTF-8" . "\r\n".
'X-Mailer: PHP/' . phpversion();

$sendmail = mail($to, $subject, $message, $headers);

if(!$sendmail) {
  // echo "Error";
  header('Location: ./index?mail=erreur#home');
} else {
  // echo "Success";
  header('Location: ../index?mail=envoye#home');
}

?>
