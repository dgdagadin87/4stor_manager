<?php

class commonModel {
    
    public $connection = null;
    
    public function run () {
        $this->connect();
        return $this->getCommon();
    }
    
    public function getCommon () {
        $laReturn = array(
            'success' => true,
            'message' => '',
            'data'    => array()
        );
        $categories = $this->getCategories();
        if (!is_array($categories)) {
            $laReturn['success'] = false;
            $laReturn['message'] = $categories;
            return $laReturn;
        }
        $headers = $this->getHeaders();
        $laReturn['data']['categories'] = $categories;
        $laReturn['data']['headers'] = $headers;
        return $laReturn;
    }
    
    public function getCategories() {
        $SQL = 'SELECT *, (SELECT COUNT(*) FROM `cats2stories` WHERE categories.catId = cats2stories.catId) AS numStors FROM `categories` ORDER BY catImportant DESC';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении списка категорий';
        }
        $categories = array();
        while($catData = DB_FetchAssoc ('mysql', $Query)) {
            $category = array();
            $category['categoryId'] = $catData['catId'];
            $category['categoryName'] = $catData['catName'];
            $category['categoryHref'] = $catData['catHref'];
            $category['categoryStors'] = $catData['numStors'];
            $category['categoryImportant'] = $catData['catImportant'];
            $categories[] = $category;
        }
        return $categories;
    }
    
    public function getHeaders() {
        return array(
            array(
                'headerId' => 1,
                'headerName' => 'Главная',
                'headerURL' => '',
                'selected' => false,
                'outer' => false,
                'forActive' => array(
                    '',
                    'category'
                )
            ),
            array(
                'headerId' => 2,
                'headerName' => 'Поиск',
                'headerURL' => 'search',
                'selected' => false,
                'outer' => false,
                'forActive' => array(
                    'search'
                )
            ),
            array(
                'headerId' => 3,
                'headerName' => 'Статистика',
                'headerURL' => 'statistics',
                'selected' => false,
                'outer' => false,
                'forActive' => array(
                    'statistics',
                    'statchart'
                )
            ),
            array(
                'headerId' => 4,
                'headerName' => 'Настройки',
                'headerURL' => 'settings',
                'selected' => false,
                'outer' => false,
                'forActive' => array(
                    'settings'
                )
            ),
            array(
                'headerId' => 5,
                'headerName' => '4stor.ru',
                'headerURL' => 'http://4stor.ru',
                'selected' => false,
                'outer' => true,
                'forActive' => array()
            )
        );
    }
    
    public function connect () {
        if (is_null($this->connection)) {
            $this->connection = DB_Connect('mysql');
        }
        DB_SetUTF8($this->connection, 'mysql');
    }
    
}

