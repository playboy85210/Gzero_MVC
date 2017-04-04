<?php
include("./gzero_base.php");

class GzeroTest extends GzeroBase
{
    public function displayAddEventDialog($date)
    {
        $paraData = array(
            '<!-- START_TIME -->'=> $date
        );
        return $this->showTemplate("./dialog.html",0,$paraData);
    }
    
    public function siteMain($type)
    {
        switch ($type) {
            case "manager":
                $paraData = array(
                    '<!-- Comment -->' => 'comment',
                    '<!-- Comment2 -->' => 'comment2',
                    '<!-- Comment3 -->' => 'comment3'
                );
                $paraData1 = array();
                $paraData1[] = array(
                    '<!-- Comment_Loop -->' => 'Comment_Loop1<br/>'
                );
                $paraData1[] = array(
                    '<!-- Comment_Loop -->' => 'Comment_Loop2<br/>'
                );
                $main = $this->showTemplateLoop("./testMain.html", 1, 0, $paraData, $paraData1);
                break;
            default:
                break;
        }
        return $main;
    }
    
}

?>