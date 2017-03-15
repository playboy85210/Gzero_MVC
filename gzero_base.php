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
    
    public function showTemplate($file, $sort,$paraData)
    {
        $file = file_get_contents($file);
        $file = explode("<!-- START_TEMPLATE -->",$file); //第一次出現<!-- START_TEMPLATE -->之後剩餘的字串
        str_replace("<!-- Comment -->",file_get_contents("./change.html"),$file);
        foreach ($paraData as $key => $value){
            $file = str_replace($key, $value, $file);
        }
        $lengh = strpos($file[$sort+1], "<!-- END_TEMPLATE -->");//找到傳回字串「第一次」出現的位置
        return substr($file[$sort+1],0,$lengh);
    }
    public function showTemplateLoop($file, $startsort,$loop,$paraData,$two_nd_array)
    {
        $file = file_get_contents($file);
        $file = explode("<!-- START_TEMPLATE -->",$file); //根據每一次出現<!-- START_TEMPLATE -->之後的字串為一個陣列
        $lengh = strpos($file[$startsort+1], "<!-- END_TEMPLATE -->");//找到傳回字串「第一次<!-- END_TEMPLATE -->」出現的位置
        $file = substr($file[$startsort+1],0,$lengh);
        $beginLoop = explode("<!-- BEGIN_LOOP -->",$file);
        $loopLengh = strpos($beginLoop[$loop+1], "<!-- END_LOOP -->");
        $string = substr($beginLoop[$loop+1],0,$loopLengh);
        $loopString = null;
        foreach ($paraData as $key => $value){
            $file = str_replace($key, $value, $file);
        }
        for ($i = 0; $i < sizeof($two_nd_array) ;$i++) {
            foreach ($two_nd_array[$i] as $key => $value){
                $file = str_replace($key, null, $file);
                $loopString .= $value;
            }
        }
        $file = str_replace('<!-- BEGIN_LOOP -->', $loopString, $file);
        $file = str_replace('<!-- END_LOOP -->', null, $file);
        return $file;
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
        $file = substr($file,strpos($file,"<!--VGO SITE_FOOTER -->"),$lengh);
        $file = str_replace("<!--VGO SITE_FOOTER -->",file_get_contents("./testFooter.html"),$file);
        return $file;
    }
}

?>