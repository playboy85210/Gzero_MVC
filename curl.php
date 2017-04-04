<?php
$url = "127.0.0.1:8080/jilin/testurl.php";
$paraData = array(
    'name'=>'Gzero',
    'number' => '1102104207'
);
$getaddr = $url . "?" . http_build_query($paraData);
$ch = curl_init($getaddr);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
$result = curl_exec($ch);
echo $result;
?>