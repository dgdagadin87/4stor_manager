<?php

class Helper {
    
    public static function Main_Log ($logDir, $psStr) {
        $FileFlag = 'a+';
	$FileHandler = fopen ($logDir . '/log.txt', $FileFlag);
	flock($FileHandler, LOCK_EX);
	$LogWrite = fwrite ($FileHandler, $psStr);
	if (!$LogWrite) {
            exit ('Error while logging');
	}
	flock($FileHandler, LOCK_UN);
	fclose ($FileHandler);
    }
    
    public static function Main_GetActions () {
        return array(
            'index',
            'common',
            'category',
            'search',
            'statistics',
            'statchart',
            'synclinks',
            'addlink',
            'editlink',
            'dellink'
        );
    }
    
    public static function Main_ConvertDate($psDate, $psMode='BASE') {
        if ($psMode === 'BASE') {
            $paDate = explode('.', $psDate);
            $return = $paDate[2] . '.' . $paDate[1] . '.' . $paDate[0];
            return $return;
        }
        if ($psMode === 'OUTPUT') {
            $paDate = explode(' ', $psDate);
            $psFirst = $paDate[0];
            $paFirst = explode('-', $psFirst);
            $dayMonthYear = $paFirst[2] . '.' . $paFirst[1] . '.' . $paFirst[0];
            $psSecond = $paDate[1];
            $paSecond = explode(':', $psSecond);
            $hourMinute = $paSecond[0] . ':' . $paSecond[1];
            return ($dayMonthYear . ' ' . $hourMinute);
        }
    }
    
    public static function Main_ConvertDesc($psDesc, $psHref) {
        return preg_replace('/(<\/p>\s*)$/ui', '<a class="read-more" href="' . $psHref . '">читать далее...</a>', $psDesc);
    }
    
    public static function Main_Validate() {
        if (!defined('_VALIDATION_')) {
            exit('Error code: 1');
        }
    }
    
    public static function Main_GetMode() {
        $mode = isset($_GET['mode']) ? $_GET['mode'] : 'gui';
        switch($mode){
            case 'gui':
            default:
                return 'gui';
            case 'json':
                return 'json';
            case 'login':
                return 'login';
            case 'logout':
                return 'logout';
        }
    }
    
    public static function Main_StringToBool($string) {
        if ($string === 'false') {
            return false;
        }
        else {
            return true;
        }
    }
    
    public static function SetConfigs () {
	error_reporting(E_ALL);
        set_time_limit(0);
	ini_set('magic_quotes_runtime', 0);
	ini_set('magic_quotes_sybase', 0);
	ini_set('register_globals', 'Off');
	ini_set('session.use_trans_sid', FALSE);
	ini_set('session.use_only_cookies', TRUE);
    }
    
    public static function SetHeaders () {
	header('Content-Type: text/html; charset=utf-8');
    }
    
    public static function Hash($string) {
        return sha1($string);
    }
    
    public static function generateGUID(){
        if (function_exists('com_create_guid')){
            return com_create_guid();
        }
        else{
            mt_srand((double)microtime()*10000);
            $charid = strtoupper(md5(uniqid(rand(), true)));
            $hyphen = chr(45);// "-"
            $uuid = chr(123)// "{"
                .substr($charid, 0, 8).$hyphen
                .substr($charid, 8, 4).$hyphen
                .substr($charid,12, 4).$hyphen
                .substr($charid,16, 4).$hyphen
                .substr($charid,20,12)
                .chr(125);// "}"
            return $uuid;
        }
    }
    
}

