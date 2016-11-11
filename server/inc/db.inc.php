<?php

//соединение с сервером
function DB_Connect ($DBType) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_connect (CONNECTION_HOST, CONNECTION_USER, CONNECTION_PASSWORD, CONNECTION_DB);
        }

        default:
        {
            return mysqli_connect (CONNECTION_HOST, CONNECTION_USER, CONNECTION_PASSWORD, CONNECTION_DB);
        }
    }
}

//Выбор базы данных
function DB_SelectDatabase ($DBType, $DBName, $ServerConn) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_select_db ($ServerConn, $DBName);
        }

        default:
        {
            return mysqli_select_db ($ServerConn, $DBName);
        }
    }
}

//Запрос к базе данных
function DB_Query ($DBType, $QueryString, $ServerConn) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_query ($ServerConn, $QueryString);
        }

        default:
        {
            return mysqli_query ($ServerConn, $QueryString);
        }
    }
}

function DB_SetUTF8 ($ConnResource, $DBType) {

    switch ($DBType) {
        case'mysql':
        default: {
            DB_Query($DBType, "SET NAMES utf8", $ConnResource);
        }
    }
}

//Запрос к базе данных
function DB_NumRows ($DBType, $QueryResult) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_num_rows ($QueryResult);
        }

        default:
        {
            return mysqli_num_rows ($QueryResult);
        }
    }
}

//Ассоциативный массив из результата запроса
function DB_FetchAssoc ($DBType, $QueryResult) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_fetch_assoc ($QueryResult);
        }

        default:
        {
            return mysqli_fetch_assoc ($QueryResult);
        }
    }
}

//Ассоциативный массив из результата запроса
function DB_Result ($DBType, $QueryResult, $Row, $Column) {
    switch ($DBType) {
        case "mysql":
        default:
        {
            mysqli_data_seek($QueryResult, $Row);
            $resRow = (is_numeric($Column)) ? mysqli_fetch_row($QueryResult) : mysqli_fetch_assoc($QueryResult);
            if (isset($resRow[$Column])){
                return $resRow[$Column];
            }
        }
    }
}

//экранирование служебный SQL-символов
function DB_EscapeString ($DBType, $ConnectResource, $String) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_real_escape_string ($ConnectResource, $String);
        }

        default:
        {
            return mysqli_real_escape_string ($ConnectResource, $String);
        }
    }
}

//извлечение последнего автоинкрементарного ид-шника
function DB_LastID ($DBType, $ServerConn) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_insert_id ($ServerConn);
        }

        default:
        {
            return mysqli_insert_id ($ServerConn);
        }
    }
}

//ошибка бд
function DB_Error ($DBType, $ConnectResource) {
    switch ($DBType) {
        case "mysql":
        default:
        {
            return mysqli_errno ($ConnectResource) . ": " . mysqli_error ($ConnectResource);
        }
    }
}