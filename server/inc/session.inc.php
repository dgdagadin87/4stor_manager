<?php

class Session {
    
    public static function Start() {
        $lifeTime = 0;
	$cookiePath = '/';
	$cookieDomain = '';
	$cookieSecure = FALSE;
	$httpOnly = TRUE;
	session_set_cookie_params($lifeTime, $cookiePath, $cookieDomain, $cookieSecure, $httpOnly);
        session_start();
    }
    
    public static function CheckToken() {
        if (!isset($_SESSION['_token'])) {
            return false;
        }
        if (!isset($_SERVER['_token'])) {
            return false;
        }
        if ($_SESSION['_token'] <> $_SERVER['_token']) {
            return false;
        }
        return true;
    }
    
    public static function GetSessionId() {
        return (session_id());
    }
    
}