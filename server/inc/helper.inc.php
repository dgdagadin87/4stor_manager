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
            'categories'
        );
    }
    
}

