<?php

class Controller {

    public static function Login(){
        
    }
    public static function JSON(){
        if (Session::CheckToken()) {
            $lsAction = isset($_GET['action']) && in_array($_GET['action'], Helper::Main_GetActions()) ? $_GET['action'] : 'index';
            require 'server/actions/' . $lsAction . '/' . $lsAction . '.model.php';
            require 'server/actions/' . $lsAction . '/' . $lsAction . '.php';
        }
        else {
            echo (json_encode(array(
                'success' => false,
                'message' => 'Войдите в систему',
                'data' => array()
            )));
            exit();
        }
    }
    public static function GUI(){
        Session::CheckToken() ? Tpl::loadMain() : Tpl::loadLogin();
    }

}

