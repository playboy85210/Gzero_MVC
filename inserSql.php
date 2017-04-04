<?php
if(isset($_POST['data'])) {
    $json = $_POST['data'];
    var_dump(json_decode($json, true));
  } else {
    echo "Noooooooob";
   }
?>