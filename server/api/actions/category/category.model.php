<?php

class categoryModel extends abstractModel {

    public $categoryId   = null;
    public $categoryName = null;
    
    public $numPages = 1;
    public $curPage  = 1;
    
    public $numOfStors = 0;
    
    public $sortBy = '';
    public $sortType = '';
    
    public function run () {
        $this->connect();
        return $this->getCategory();
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

        // полный список категорий
        $SQL = 'SELECT catId, catName FROM categories';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении данных категорий';
        }
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $catId = $Data['catId'];
            $catName = $Data['catName'];
            $this->categories[$catId] = $catName;
            
            if ($categoryId == $catId) {
                $this->categoryName = $catName;
            }
        }
        if (is_null($this->categoryName)) {
            return 'Указанной категории нет в списке';
        }
        
        // количество историй в категории
        $SQL = 'SELECT COUNT(*) FROM `cats2stories` WHERE catId = ' . $categoryId;
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
        $this->numOfStors = $numStores;
        
        return (true);
    }
    
    public function getCategory () {
        
        $metaResult = $this->getMeta();
        if ($metaResult !== true) {
            return (array(
                'success' => false,
                'message' => $metaResult,
                'data'    => array()
            ));
        }
        
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
        $laReturn['data']['category'] = $stors;
        $laReturn['data']['breadcrumbs'] = $this->getBreadCrumbs();
        $laReturn['data']['categoryName'] = $this->categoryName;
        $laReturn['data']['pageMeta'] = array(
            'pageCode' => $this->categoryName === 'Лучшие Истории Сайта' ? 'best' : 'category',
            'pageTitle' => $this->categoryName
        );
        $laReturn['data']['meta'] = array(
            '_currentPage' => $this->curPage,
            '_numOfStors' => $this->numOfStors,
            '_sortBy' => $this->sortBy,
            '_sortType' => $this->sortType,
        );
        $laReturn['data']['paging'] = array(
            '_currentPage' => $this->curPage,
            '_numOfPages' => $this->numPages
        );
        return $laReturn;
    }
    
    public function getStors() {
        // данные рассказов на текущей странице
        $SQL = 'SELECT s.* FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId WHERE c2s.catId IN (' . $this->categoryId . ') ORDER BY s.' . $this->sortBy . ' ' . $this->sortType . ' LIMIT ' . 10*($this->curPage - 1) . ', 10';
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
            $stors[$storKey]['storAuthorName'] = $authors[$storData['storAuthorId']]['authorName'];
            $stors[$storKey]['storAuthorHref'] = $authors[$storData['storAuthorId']]['authorHref'];
            $stors[$storKey]['storCats'] = $cats[$storData['storId']];
        }
        
        return $stors;
    }
    
    public function getBreadCrumbs () {
        return array(
            array(
                'isMain' => true,
                'url' => '',
                'name' => 'Главная страница'
            ),
            array(
                'isMain' => false,
                'url' => 'category/' . $this->categoryId,
                'name' => $this->categoryName
            )
        );
    }
    
}

