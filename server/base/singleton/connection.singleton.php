<?php

class DbConnection {

    private $_connection;
    private static $_instance;

    public static function getInstance() {
        if(!self::$_instance) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private function __construct() {
        $this->_connection = DB_Connect('mysql');
        DB_SetUTF8($this->_connection, 'mysql');
    }

    private function __clone () {}
    private function __wakeup() {}

    public function getConnection() {
        return $this->_connection;
    }

}