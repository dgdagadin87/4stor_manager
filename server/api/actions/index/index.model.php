<?php

class indexModel {
    
    public $connection = null;
    
    public $lifeHistoriesId = null;
    public $artHistoriesId  = null;
    public $natHistoriesId  = null;
    
    public function run () {
        $this->connect();
        $this->setCatsIdByName();
        return $this->getIndex();
    }
    
    public function getIndex () {
        $laReturn = array(
            'success' => true,
            'message' => '',
            'data'    => array()
        );
        $index = $this->getCatStors();
        if (!is_array($index)) {
            $laReturn['success'] = false;
            $laReturn['message'] = $index;
            return $laReturn;
        }
        $laReturn['data']['index'] = $index;
        $laReturn['data']['breadcrumbs'] = $this->getBreadCrumbs();
        return $laReturn;
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
            $authorName = $Data['authorName'];
            $authorHref = $Data['authorHref'];
            $authors[$authorId] = array(
                'authorName' => $Data['authorName'],
                'authorHref' => $Data['authorHref'],
            );
        }
        return ($authors);
    }
    
    public function setCatsIdByName () {
        $SQL = 'SELECT catId, catName FROM categories WHERE catName IN (\'Творческие истории\', \'Природные аномальные явления\', \'Истории из жизни\')';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении данных категорий';
        }
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $catId = $Data['catId'];
            $catName = $Data['catName'];
            if ($catName === 'Творческие истории') {
                $this->artHistoriesId = $catId;
            }
            if ($catName === 'Природные аномальные явления') {
                $this->natHistoriesId = $catId;
            }
            if ($catName === 'Истории из жизни') {
                $this->lifeHistoriesId = $catId;
            }
        }
    }

    public function getCatStors() {
        $SQL = ''
            . '(SELECT c.*, c2s.catId as cid,s.* FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId LEFT JOIN categories c ON c2s.catId = c.catId WHERE c2s.catId IN (' . $this->lifeHistoriesId . ') ORDER BY s.storDate DESC LIMIT 5) '
            . 'UNION '
            . '(SELECT c.*, c2s.catId as cid,s.* FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId LEFT JOIN categories c ON c2s.catId = c.catId WHERE c2s.catId IN (' . $this->artHistoriesId . ') ORDER BY s.storDate DESC LIMIT 5) '
            . 'UNION '
            . '(SELECT c.*, c2s.catId as cid,s.* FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId LEFT JOIN categories c ON c2s.catId = c.catId WHERE c2s.catId IN (' . $this->natHistoriesId . ') ORDER BY s.storDate DESC LIMIT 5)';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении данных главной страницы';
        }
        $tmpIndex = array();
        $authorIds = array();
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $catId = $Data['cid'];
            $storId = $Data['storId'];
            if (!array_key_exists($Data['storAuthorId'], $authorIds)) {
                $authorIds[] = $Data['storAuthorId'];
            }
            if (!isset($tmpIndex[$catId])) {
                $tmpIndex[$catId] = array(
                    'categoryId' => $Data['cid'],
                    'categoryName' => $Data['catName'],
                    'categoryUrl'  => $Data['catHref'],
                    'stors' => array()
                );
            }
            if (!isset($tmpIndex[$catId]['stors'][$storId])) {
                $tmpIndex[$catId]['stors'][$storId] = array(
                    'storId'         => $storId,
                    'storName'       => $Data['storName'],
                    'storHref'       => $Data['storHref'],
                    'storShortDesc'  => $Data['storDesc'],
                    'storAuthorId'   => $Data['storAuthorId'],
                    'storAuthorName' => '',
                    'storAuthorHref' => '',
                    'storRate'       => $Data['storRate'],
                    'storDate'       => $Data['storDate'],
                    'storWatches'    => $Data['storWatches'],
                    'storComments'   => $Data['storComments']
                );
            }
        }
        
        $authors = $this->getAuthors($authorIds);
        
        $tmpIndex = array_values($tmpIndex);
        foreach ($tmpIndex as $indexKey=>$indexValue) {
            $tmpIndex[$indexKey]['stors'] = array_values($indexValue['stors']);
            foreach ($tmpIndex[$indexKey]['stors'] as $k=>$v) {
                $tmpIndex[$indexKey]['stors'][$k]['storAuthorName'] = $authors[$v['storAuthorId']]['authorName'];
                $tmpIndex[$indexKey]['stors'][$k]['storAuthorHref'] = $authors[$v['storAuthorId']]['authorHref'];
            }
        }
        
        return ($tmpIndex);
    }
    
    public function getBreadCrumbs () {
        return array(
            array(
                'isMain' => true,
                'url' => '',
                'name' => 'Главная страница'
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