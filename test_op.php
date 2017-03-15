<?php
include("../testmysql.php");
include("./gzero_test.php");
$gzero = new GzeroTest();
$layout = $gzero->readKeyHtml("index_key.html");
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