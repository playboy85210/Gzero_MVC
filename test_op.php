<?php
header("Cache-Control: no-store, no-cache");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
include("../testmysql.php");
include("./gzero_test.php");
$gzero = new GzeroTest();
$layout = $gzero->readKeyHtml("index_key2.html");
///將不同html結合
$f = file_get_contents("./test.html");
//替換多個special tag
/*$paraData = array(
    '<!-- Comment -->' => 'comment',
    '<!-- Comment2 -->' => 'comment2',
    '<!-- Comment3 -->' => 'comment3'
);
foreach ($paraData as $key => $value){
    $f = str_replace($key, $value, $f);
}
echo $f;*/
/*-------------------------------------------------------------------------------*/

echo $gzero->siteHeader($layout);
echo $gzero->siteMain("manager");
echo $gzero->siteFooter($layout);

?>