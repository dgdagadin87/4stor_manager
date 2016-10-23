<?php

//соединение с сервером
function DB_Connect ($DBType) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_connect (CONNECTION_HOST, CONNECTION_USER, CONNECTION_PASSWORD, CONNECTION_DB);
            break;
        }

        default:
        {
            return mysqli_connect (CONNECTION_HOST, CONNECTION_USER, CONNECTION_PASSWORD, CONNECTION_DB);
            break;
        }
    }
}

//Выбор базы данных
function DB_SelectDatabase ($DBType, $DBName, $ServerConn) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_select_db ($ServerConn, $DBName);
            break;
        }

        default:
        {
            return mysqli_select_db ($ServerConn, $DBName);
            break;
        }
    }
}

//Запрос к базе данных
function DB_Query ($DBType, $QueryString, $ServerConn) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_query ($ServerConn, $QueryString);
            break;
        }

        default:
        {
            return mysqli_query ($ServerConn, $QueryString);
            break;
        }
    }
}

function DB_SetUTF8 ($ConnResource, $DBType) {

    switch ($DBType) {
        case'mysql':
        default: {
            DB_Query($DBType, "SET NAMES utf8", $ConnResource);
            break;
        }
    }
}

//Запрос к базе данных
function DB_NumRows ($DBType, $QueryResult) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_num_rows ($QueryResult);
            break;
        }

        default:
        {
            return mysqli_num_rows ($QueryResult);
            break;
        }
    }
}

//Ассоциативный массив из результата запроса
function DB_FetchAssoc ($DBType, $QueryResult) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_fetch_assoc ($QueryResult);
            break;
        }

        default:
        {
            return mysqli_fetch_assoc ($QueryResult);
            break;
        }
    }
}

//Ассоциативный массив из результата запроса
function DB_Result ($DBType, $QueryResource, $Row, $Column) {
    switch ($DBType) {
        case "mysql":
        {
            return mysql_result ($QueryResource, $Row, $Column);
            break;
        }

        default:
        {
            return mysql_result ($QueryResource, $Row, $Column);
            break;
        }
    }
}

//экранирование служебный SQL-символов
function DB_EscapeString ($DBType, $ConnectResource, $String) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_real_escape_string ($ConnectResource, $String);
            break;
        }

        default:
        {
            return mysqli_real_escape_string ($ConnectResource, $String);
            break;
        }
    }
}

//извлечение последнего автоинкрементарного ид-шника
function DB_LastID ($DBType, $ServerConn) {
    switch ($DBType) {
        case "mysql":
        {
            return mysqli_insert_id ($ServerConn);
            break;
        }

        default:
        {
            return mysqli_insert_id ($ServerConn);
            break;
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
            break;
        }
    }
}