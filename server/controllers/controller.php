<?php

class Controller {

    public static function actionLogin(){
        if (!isset($_POST['login']) || empty($_POST['login']) || !isset($_POST['pass']) || empty($_POST['pass'])) {
            echo (json_encode(array(
                'success' => false,
                'message' => 'Не заполнен логин и/или пароль',
                'data' => array()
            )));
            exit();
        }

        $connection = DbConnection::getInstance()->getConnection();
        $userName = DB_EscapeString('mysql', $connection, $_POST['login']);
        $userPass = Helper::Hash($_POST['pass']);
        $SQL = 'SELECT * FROM system_users WHERE userLogin = \'' . $userName . '\' AND userPassword = \'' . $userPass . '\'';
        $Query = DB_Query ('mysql', $SQL, $connection);
        if (!$Query) {
            echo (json_encode(array(
                'success' => false,
                'message' => 'Ошибка. Обратитесь к администратору',
                'data' => array()
            )));
            exit();
        }
        $numUsers = DB_NumRows ('mysql', $Query);
        if ($numUsers < 1) {
            echo (json_encode(array(
                'success' => false,
                'message' => 'Неправильно введен логин/пароль',
                'data' => array()
            )));
            exit();
        }
        $userData = DB_FetchAssoc ('mysql', $Query);
        Session::CreateUserSession($userData);
        echo (json_encode(array(
                'success' => true,
                'message' => 'ь',
                'data' => array()
            )));
            exit();
    }
    public static function actionJSON(){
        if (Session::CheckAuth()) {
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
    public static function actionGUI(){
        Session::CheckAuth() ? Tpl::loadMain() : Tpl::loadLogin();
    }

}

