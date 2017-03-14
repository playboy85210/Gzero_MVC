<?php
include("../testmysql.php");
include ("./gzero_test.php");
$gzero = new GzeroTest();
$layout = $gzero->readKeyHtml("index_key.html");
///將不同html結合
/*$f = file_get_contents("./test.html");
echo str_replace("<!-- Comment -->",file_get_contents("./change.html"),$f);*/
/*-------------------------------------------------------------------------------*/
echo $gzero->siteHeader($layout);
echo $gzero->siteMain("manager");
echo $gzero->siteFooter($layout);

?>