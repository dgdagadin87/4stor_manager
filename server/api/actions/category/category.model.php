<?php

class categoryModel {
    
    public $connection = null;
    
    public $categoryId   = null;
    public $categoryName = null;
    
    public $numPages = 1;
    public $curPage  = 1;
    
    public $sortBy = '';
    public $sortType = '';
    
    public function run () {
        $this->connect();
        return $this->getCategory();
    }
    
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
    
    public function getMeta() {
        // сортировка
        $sortBy = isset($_GET['sortBy']) && in_array($_GET['sortBy'], $this->getSortByArray()) ? $_GET['sortBy'] : 'storDate';
        $sortType = isset($_GET['sortType']) && in_array($_GET['sortType'], $this->getSortTypeArray()) ? $_GET['sortType'] : 'DESC';
        
        // категория
        $categoryId = isset($_GET['catId']) ? intval($_GET['catId']) : 0;
        if ($categoryId < 1) {
            return 'Не определена категория';
        }
        
        // количество историй в категории
        $SQL = 'SELECT COUNT(*) FROM `stories` WHERE `catId` = ' . $categoryId;
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении количества историй в категории';
        }
        $numStores = DB_Result ('mysql', $Query, 0, 0);
        $numPages = $numStores > 0 ? ceil ($numStores / 10) : 1;
        
        $page = !isset ($_GET['page']) || !ctype_digit ($_GET['page']) ? 1 : intval ($_GET['page']);
        if ($page < 1) {
            $page = 1;
        }
        else if ($page > $numPages) {
            $page = $numPages;
        }
        
        $this->sortType = $sortType;
        $this->sortBy = $sortBy;
        $this->categoryId = $categoryId;
        $this->curPage = $page;
        $this->numPages = $numPages;
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
    
    public function getCategory () {
        
        $this->getMeta();
        
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
        $laReturn['data']['paging'] = array(
            'page' => $this->curPage,
            'numPages' => $this->numPages
        );
        return $laReturn;
    }
    
    public function getStors() {
        // данные рассказов на текущей странице
        $SQL = 'SELECT c.*, c2s.catId as cid,s.* FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId LEFT JOIN categories c ON c2s.catId = c.catId WHERE c2s.catId IN (' . $this->categoryId . ') ORDER BY s.' . $this->sortBy . ' ' . $this->sortType . ' LIMIT ' . 10*($this->curPage - 1) . ', 10';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении списка рассказов выбранной категории';
        }
        
        $authors = array();
        $stors   = array();
        $storIds = array();
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $storIds[] = $Data['storId'];
            $authors[] = $Data['storAuthorId'];
            $stors[] = array(
                'storId'         => $Data['storId'],
                'storName'       => $Data['storName'],
                'storHref'       => $Data['storHref'],
                'storShortDesc'  => $Data['storDesc'],
                'storAuthorId'   => $Data['storAuthorId'],
                'storAuthorName' => '',
                'storAuthorHref' => '',
                'storRate'       => $Data['storRate'],
                'storDate'       => $Data['storDate'],
                'storWatches'    => $Data['storWatches'],
                'storComments'   => $Data['storComments'],
                'storCats'       => array()
            );
        }
        
        $cats = $this->getFullStorCatList($storIds);
        $authors = $this->getAuthors($authors);
        
        foreach ($stors as $storKey=>$storData) {
            $stors[$storKey]['storAuthorName'] = $authors[$storData['storAuthorId']]['storAuthorName'];
            $stors[$storKey]['storAuthorHref'] = $authors[$storData['storAuthorId']]['storAuthorHref'];
            $stors[$storKey]['storCats'] = $cats[$storData['storId']];
        }
        
        return $stors;
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

