<?php
/*    Using "mysqli" instead of "mysql" that is obsolete.
*     Utilisation de "mysqli" � la place de "mysql" qui est obsol�te.
* Change the value of parameter 3 if you have set a password on the root userid
* Changer la valeur du 3e param�tre si vous avez mis un mot de passe � root
*/
$dsn = "mysql:host=127.0.0.1;dbname=test;charset=utf8";
try{
$db = new PDO($dsn, "root", "");
}catch(Exception $ex){
die("connect admin error");
}
?>
