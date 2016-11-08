<?php

class categoryModel {
    
    public $connection = null;
    
    public function run () {
        $this->connect();
        return $this->getCategory();
    }
    
    public function getCategory () {
        $laReturn = array(
            'success' => true,
            'message' => '',
            'data'    => array()
        );
        $stors = $this->getStors();
        if (!is_array($stors)) {
            $laReturn['success'] = false;
            $laReturn['message'] = $stors;
            return $laReturn;
        }
        $laReturn['data']['stors'] = $stors;
        return $laReturn;
    }
    
    public function getStors() {
        $SQL = 'SELECT *, (SELECT COUNT(*) FROM `cats2stories` WHERE categories.catId = cats2stories.catId) AS numStors FROM `categories`';
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

