<?php
include("../testmysql.php");

class GzeroBase
{
    public function readKeyHtml($file)
    {
        return file_get_contents($file);
    }
    
    public function gzeroSqlQuery($queryStr)
    {
        return $db->exec($queryStr);
    }
    
    public function gzeroSqlFetchArray($query)
    {
        return $query->fetch();
    }
    
    public function showTemplate($file, $sort)
    {
        $file = file_get_contents($file);
        $file = explode("<!-- START_TEMPLATE -->",$file); //第一次出現<!-- START_TEMPLATE -->之後剩餘的字串
        $lengh = strpos($file[$sort+1], "<!-- END_TEMPLATE -->");//找到傳回字串「第一次」出現的位置
        return substr($file[$sort+1],0,$lengh);
    }
    
    public function siteHeader($file)
    {
        $file = substr($file,0,strpos($file,"<!--VGO SITE_MAIN -->"));
        $file = str_replace("<!--VGO SITE_HEADER -->",file_get_contents("./testHeader.html"),$file);
        return $file;
    }
    
    public function siteFooter($file)
    {
        $lengh = strlen($file);
        $file = substr($file,strpos($file,"<!--VGO SITE_MAIN -->"),$lengh);
        $file = str_replace("<!--VGO SITE_FOOTER -->",file_get_contents("./testFooter.html"),$file);
        return $file;
    }
}

?>