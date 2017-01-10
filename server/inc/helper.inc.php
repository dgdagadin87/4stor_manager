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
            return ($dayMonthYear . ' в ' . $hourMinute);
        }
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
    
}

