<?php
include("../testmysql.php");
include("./gzero_test.php");
$gzero = new GzeroTest();
switch ($_GET['pdisplay']){
    case 'display_add_event':
        print $gzero->displayAddEventDialog();
        break;
}

?>