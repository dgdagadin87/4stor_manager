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
    
    public static function CheckAuth() {
        if (!isset($_SESSION['user'])) {
            return false;
        }
        return true;
    }
    
    public static function CreateUserSession($userData) {
        if (isset($_SESSION['user'])) {
            unset($_SESSION['user']);
        }
        $_SESSION['user'] = array(
            'login' => $userData['userLogin'],
            'name' => $userData['userName']
        );
    }
    
    
    public static function GetSessionId() {
        return (session_id());
    }
    
}