<?php

class categoriesModel {
    
    public $connection = null;
    
    public function run () {
        $this->connect();
        return $this->getCategories();
    }
    
    public function getCategories() {
        $SQL = 'SELECT * FROM `categories`';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            exit ($SQL . "\r\n" . DB_Error ('mysql', $this->connection));
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

