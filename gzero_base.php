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
        $file = file_get_contents("./" . $file);
        for ($i = 0; $i <= $sort; $i++) {
            $file = strstr($file, "<!-- START_TEMPLATE -->"); //第一次出現<!-- START_TEMPLATE -->之後剩餘的字串
        }
        $lengh = strpos($file, "<!-- END_TEMPLATE -->");//找到傳回字串「第一次」出現的位置
        return substr($file, 0, $lengh);
    }
    
    public function siteHeader($file)
    {
        
        return strpos($file,"<!--VGO SITE_MAIN -->",0);
    }
}

?>