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
        $laReturn['data']['categories'] = $categories;
        return $laReturn;
    }
    
    public function getCategories() {
        $SQL = 'SELECT * FROM `categories`';
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
            $categories[] = $category;
        }
        return $categories;
    }
    
    public function connect () {
        if (is_null($this->connection)) {
            $this->connection = DB_Connect('mysql');
        }
        DB_SetUTF8($this->connection, 'mysql');
    }
    
}

