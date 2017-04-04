<?php
header("Cache-Control: no-store, no-cache");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
include("../testmysql.php");
$dsn = "mysql:host=127.0.0.1;dbname=test;charset=utf8";
try {
    $db = new PDO($dsn, "root", "");
    $count = sizeof($_POST['data']);
    for ($i = 0; $i < $count; $i++) {
        if (strpos($_POST['name'][$i], "涼")) {
            $type = 104;
        } elseif (strpos($_POST['name'][$i], "微寒")) {
            $type = 102;
        } else if (strpos($_POST['name'][$i], "大寒")) {
            $type = 103;
        } elseif (strpos($_POST['name'][$i], "平")) {
            $type = 1000;
        } else {
            $type = 101;
        }
        $name = strtok($_POST['name'][$i], "(");
        $query = $db->query("SELECT `drug_name` FROM `drugs` WHERE `drug_name` = '" . $name . "'");
        if ($query->rowCount()) {
            echo "have";
        } else {
            /*var_dump("INSERT INTO `drugs`(`drug_id`, `drug_name`,`drug_image`, `drug_price`, `usefulness`, `flavor_tropism`, `drug_type`,`drug_url`)
    VALUES (null,'" . strtok($_POST['name'][$i], "(") . "','" . $_POST['img'][$i] . "','0','" . str_replace("【功效】", "", strstr($_POST['data'][$i], "【功效】")) . "','" . str_replace("【性味歸經】", "", substr($_POST['data'][$i], 0, strpos($_POST['data'][$i], "【功效】"))) . "','" . $type . "','')");
            */
            $query = $db->query("INSERT INTO `drugs`(`drug_id`, `drug_name`,`drug_image`, `drug_price`, `usefulness`, `flavor_tropism`, `drug_type`,`drug_url`)
    VALUES (null,'" . $name . "','" . $_POST['img'][$i] . "','0','" . str_replace("【功效】", "", strstr($_POST['data'][$i], "【功效】")) . "','" . str_replace("【性味歸經】", "", substr($_POST['data'][$i], 0, strpos($_POST['data'][$i], "【功效】"))) . "','" . $type . "','')");
        }
    }
} catch (Exception $ex) {
    die("connect admin error");
}

?>