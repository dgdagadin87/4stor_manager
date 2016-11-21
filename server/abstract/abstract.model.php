<?php

abstract class abstractModel {
    
    public $connection = null;
    
    public $categories = array();
    
    abstract function run();

    public function getFullStorCatList ($storIds) {
        $laStors = array();
        $SQL = 'SELECT catId, storId FROM cats2stories WHERE storId IN (' . implode(',', $storIds) . ')';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении полного списка категорий рассказов';
        }
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $storId = $Data['storId'];
            $catId  = $Data['catId'];
            if (!isset($laStors[$storId])) {
                $laStors[$storId] = array();
            }
            $laStors[$storId][] = array(
                'catId' => $catId,
                'catName' => $this->categories[$catId]
            );
        }
        return $laStors;
    }
    
    public function getAuthors ($authorIds) {
        $SQL = 'SELECT * FROM authors WHERE authorId IN (' . implode(',', $authorIds) . ')';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении данных авторов';
        }
        $authors = array();
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $authorId = $Data['authorId'];
            $authors[$authorId] = array(
                'authorName' => $Data['authorName'],
                'authorHref' => $Data['authorHref'],
            );
        }
        return ($authors);
    }
    
    public function getSortByArray() {
        return array(
            'storDate',
            'storRate',
            'storComments',
            'storWatches',
            'storName'
        );
    }
    
    public function getSortTypeArray() {
        return array(
            'ASC',
            'DESC'
        );
    }
    
    public function connect () {
        if (is_null($this->connection)) {
            $this->connection = DB_Connect('mysql');
        }
        DB_SetUTF8($this->connection, 'mysql');
    }
    
}

