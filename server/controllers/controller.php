<?php

class Controller {

    public static function Login(){
        if (!isset($_POST['login']) || empty($_POST['login']) || !isset($_POST['pass']) || empty($_POST['pass'])) {
            echo (json_encode(array(
                'success' => false,
                'message' => 'Не заполнен логин и/или пароль',
                'data' => array()
            )));
            exit();
        }
    }
    public static function JSON(){
        if (Session::CheckToken()) {
            $lsAction = isset($_GET['action']) && in_array($_GET['action'], Helper::Main_GetActions()) ? $_GET['action'] : 'index';
            require __DIR__ . '/../api/actions/' . $lsAction . '/' . $lsAction . '.model.php';
            require __DIR__ . '/../api/actions/' . $lsAction . '/' . $lsAction . '.php';
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

