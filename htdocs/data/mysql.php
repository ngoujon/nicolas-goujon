<?php

$dbhost = "DBHOST";
$dbname = "DBNAME";
$dbuser = "DBUSER";
$dbpass = "DBPASS";

try {

    /* Connexion à une base MySQL avec l'invocation de pilote */
    $host = 'mysql:dbname='.$dbname.';host='.$dbhost;
    
    $mysqlClient = new PDO($host, $dbuser, $dbpass);


  $mysqlClient->setAttribute(PDO::ATTR_EMULATE_PREPARES, 1);

}
catch(Exception $e)
{
  // En cas d'erreur, on affiche un message et on arrête tout
  die('Erreur : '.$e->getMessage());
}

?>
