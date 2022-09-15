<!DOCTYPE html>
<html lang="fr">
    <head>
        <?php
            require_once('settings.php');
            require_once('data/header.php')
        ?>
    </head>
    <body>
    <?php
        if ($maintenance =="yes") {
            require_once('data/maintenance.php');
        }
         else {
            require_once('data/content.php');
         }  
        ?>
    </body>
</html>