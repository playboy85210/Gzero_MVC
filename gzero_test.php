<?php
include ("./gzero_base.php");
class GzeroTest extends GzeroBase
{
    public function gzeroSqlQuery($queryStr)
    {
        return $db->exec($queryStr);
    }
    
    public function siteMain($type)
    {
        switch ($type) {
            case "manager":
                $main = $this->showTemplate("./test.html",$type);
                break;
            default:
                break;
        }
        return $main;
    }
    
}

?>