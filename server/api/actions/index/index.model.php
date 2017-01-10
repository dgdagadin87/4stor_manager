<?php

class indexModel extends abstractModel {
    
    public $categories = array();
    
    public $lifeHistoriesId = null;
    public $artHistoriesId  = null;
    public $natHistoriesId  = null;
    
    public function run () {
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
        $laReturn['data']['pageMeta'] = array(
            'pageCode' => 'index',
            'pageTitle' => 'Главная страница'
        );
        $laReturn['data']['breadcrumbs'] = $this->getBreadCrumbs();
        return $laReturn;
    }
    
    public function setCatsIdByName () {
        $SQL = 'SELECT catId, catName FROM categories';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении данных категорий';
        }
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $catId = $Data['catId'];
            $catName = $Data['catName'];
            
            $this->categories[$catId] = $catName;
            
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
        $laSQL = array();
        foreach (array($this->lifeHistoriesId, $this->artHistoriesId, $this->natHistoriesId) as $historyId) {
            if (!is_null($historyId)) {
                $laSQL[] = '(SELECT c.*, c2s.catId as cid,s.* FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId LEFT JOIN categories c ON c2s.catId = c.catId WHERE c2s.catId IN (' . $historyId . ') ORDER BY s.storDate DESC LIMIT 5) ';
            }
        }
        
        if (sizeof($laSQL) > 0) {
            $SQL = implode(' UNION ', $laSQL);
            $Query = DB_Query ('mysql', $SQL, $this->connection);
            if (!$Query) {
                return 'Ошибка при получении данных главной страницы';
            }
            $tmpIndex = array();
            $authorIds = array();

            $storIds = array();

            while($Data = DB_FetchAssoc ('mysql', $Query)) {
                $catId = $Data['cid'];
                $storId = $Data['storId'];
                $storIds[] = $storId;
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
                        'storDate'       => Helper::Main_ConvertDate($Data['storDate'], 'OUTPUT'),
                        'storWatches'    => $Data['storWatches'],
                        'storComments'   => $Data['storComments'],
                        'storCats'       => array()
                    );
                }
            }

            $cats = $this->getFullStorCatList($storIds);
            $authors = $this->getAuthors($authorIds);

            $tmpIndex = array_values($tmpIndex);
            foreach ($tmpIndex as $indexKey=>$indexValue) {
                $tmpIndex[$indexKey]['stors'] = array_values($indexValue['stors']);
                foreach ($tmpIndex[$indexKey]['stors'] as $k=>$v) {
                    $tmpIndex[$indexKey]['stors'][$k]['storAuthorName'] = $authors[$v['storAuthorId']]['authorName'];
                    $tmpIndex[$indexKey]['stors'][$k]['storAuthorHref'] = $authors[$v['storAuthorId']]['authorHref'];
                    $tmpIndex[$indexKey]['stors'][$k]['storCats'] = $cats[$v['storId']];
                }
            }

            return ($tmpIndex);
        }
        return array();
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
    
}