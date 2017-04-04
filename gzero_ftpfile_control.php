<?php
include("../testmysql.php");

class ftpFileControl
{
    private $fileDir = '';//存放的資料夾
    private $fileName = '';//儲存的檔名(含副檔名) ex: test.jpg
    private $fileDistPath;//上傳的路徑
    private $connId;
    private $ftpData = array();
    
    function __construct($ftpData = array())
    {
        $this->resetFtpData();
        $this->ftpConnect();
    }
    
    public function resetFtpData()
    {
        
        $this->ftpData = array(
            'FTP_SITE' => FTP_SITE,
            'FTP_USER' => FTP_USER,
            'FTP_PASS' => FTP_PASS,
        );
    }
    public function ftpClose()
    {
        ftp_close($this->conn_id);
    }
    public function ftpConnect()
    {
        $this->connId = ftp_connect($this->ftpData['FTP_SITE']);
        @$login_result = ftp_login($this->connId, $this->ftpData['FTP_USER'], $this->ftpData['FTP_PASS']);
        if ((!$this->connId) || (!$login_result)) {
            echo "FTP connection has failed!";
            echo "Attempted to connect to " . $this->ftpData['FTP_SITE'] . " for user " . $this->ftpData['FTP_USER'] . " ";
        } else {
            ftp_pasv($this->connId, true);
        }
    }
    
    public function issetFile($filePath)
    {
        $fileSize = ftp_size($this->connId, $filePath);
        if ($fileSize >= 0) {
            return true;
        } else {
            return false;
        }
    }
    
    public function setUploadPath($relative)
    {
        $path = explode("/", $relative);
        $absPath = null;
        for ($i = 0; $i < sizeof($path); $i++) {
            $absPath .= ($path[$i] . "/");
            @ftp_mkdir($this->conn_id, $absPath);
        }
        $this->fileDir = $absPath;
    }
    
    public function returnNewFilePath($filePath)
    {
        $number = 1;
        while (issetFile($filePath)) {
            $filePath = pathinfo($filePath);
            $filePath = $filePath['dirname'] . "/" . $filePath['basename'] . "(" . $number . ")" . $filePath['extension'];
            $number++;
        }
        return $filePath;
    }
    
    public function uploadFile($file)
    {
        $filePath = $this->fileDir . $file['name'];
        if (issetFile($filePath)) {
            $filePath = $this->returnNewFilePath($filePath);
        }
        $ret = ftp_nb_put($this->conn_id, $filePath, $file['tmp_name'], FTP_BINARY);
        while ($ret == FTP_MOREDATA) {
            $ret = ftp_nb_continue($this->conn_id);
        }
    }
    function resize_image($imgSize=450, $imgQuality=90, $fileDir = null, $dirDistPath = null, $fileName = null){
        if($fileDir != null)
            $this->fileDir = $fileDir;
        if($dirDistPath != null)
            $this->dirDistPath = $dirDistPath;
        if($fileName != null)
            $this->fileName = $fileName;
        
        if (file_exists($this->fileDir)) {
            $this->ftpOpen();
            $this->setDir($this->dirDistPath);
            $this->fileDistPath = $this->dirDistPath."/".$this->fileName;
            $this->fileDistPath = $this->checkFileName($this->fileDistPath);
            
            $mResize = $this->photoResizeOriginalImageRatio($this->fileDir, $imgSize, $imgQuality, 0);
            if($mResize != false) {
                $handle1 = fopen("ftp://".$this->ftpData['FTP_USER'].":".$this->ftpData['FTP_PASS']."@".$this->ftpData['FTP_SITE']."/".trim($this->fileDistPath), "w");
                stream_set_blocking($handle1, 0);
                stream_set_timeout($handle1, 20);
                $mCorrect = false;
                for ($written = 0; $written < strlen($mResize['content']); $written += $fwrite) {
                    $fwrite = fwrite($handle1, substr($mResize['content'], $written));
                }
                fflush($handle1);
                fclose($handle1);
                return $this->fileDistPath;
            }else{
                return 'Resize failed';
            }
        }else{
            return 'Can not find "'.$this->fileDir.'"';
        }
    }
    private function photoResizeOriginalImageRatio ($p_photo_file, $p_max_size, $p_quality = 85, $p_ratio=0) {
        $type = getImageSize($p_photo_file); // [] if you don't have exif you could use getImageSize()
        $allowedTypes = array(
            1,  // [] gif
            2,  // [] jpg
            3,  // [] png
            6   // [] bmp
        );
        if (!in_array($type[2], $allowedTypes)) {
            return false;
        }
        switch ($type[2]) {
            case 1 :
                $pic = @imageCreateFromGif($p_photo_file);
                break;
            case 2 :
                $pic = @imageCreateFromJpeg($p_photo_file);
                break;
            case 3 :
                $pic = @imageCreateFromPng($p_photo_file);
                break;
            case 6 :
                $pic = @imageCreateFromwBmp($p_photo_file);
                break;
        }
        if ($pic) {
            if($p_ratio > 0) {
                $thumb = @imagecreatetruecolor ($p_max_size, $p_max_size) or die ("Can't create Image!");
                $width = imagesx($pic);
                $height = imagesy($pic);
                if($width > $p_max_size) {
                    if ($width < $height) {
                        $twidth = $p_max_size;
                        $theight = $twidth * $height / $width;
                        imagecopyresampled($thumb, $pic, 0, 0, 0, ($height/2)-($width/2), $twidth, $theight, $width, $height);
                    } else {
                        $theight = $p_max_size;
                        $twidth = $theight * $width / $height;
                        imagecopyresampled($thumb, $pic, 0, 0, ($width/2)-($height/2), 0, $twidth, $theight, $width, $height);
                    }
                    
                    ob_start();
                    ImageJPEG ($thumb, '', $p_quality);
                    $image_buffer = ob_get_contents();
                    ob_end_clean();
                    ImageDestroy($thumb);
                    
                    imagedestroy($pic);
                    return $image_buffer;
                }
            }else {
                $width = imagesx($pic);
                $height = imagesy($pic);
                
                $twidth = $p_max_size;
                $theight = round($twidth * $height / $width, 0);
                
                $thumb = @imagecreatetruecolor ($twidth, $theight) or die ("Can't create Image!");
                imagecopyresampled($thumb, $pic, 0, 0, 0, 0, $twidth, $theight, $width, $height);
                
                ob_start();
                ImageJPEG ($thumb, null, $p_quality);
                $image_buffer = ob_get_contents();
                $mLen = ob_get_length();
                ob_end_clean();
                ImageDestroy($thumb);
                
                imagedestroy($pic);
                return array('content' => $image_buffer, 'length' => $mLen);
            }
        }
        return false;
    }
}

?>