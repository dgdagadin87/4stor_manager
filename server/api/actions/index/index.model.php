<?php

class indexModel {
    
    public $connection = null;
    
    public function run () {
        $this->connect();
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
        return $laReturn;
    }
    
    public function getCatStors() {
        $SQL = ''
            . '(SELECT c.*, c2s.catId as cid,s.* FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId LEFT JOIN categories c ON c2s.catId = c.catId WHERE c2s.catId IN (5) ORDER BY c2s.storId, s.storDate DESC LIMIT 5) '
            . 'UNION '
            . '(SELECT c.*, c2s.catId as cid,s.* FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId LEFT JOIN categories c ON c2s.catId = c.catId WHERE c2s.catId IN (6) ORDER BY c2s.storId, s.storDate DESC LIMIT 5) '
            . 'UNION '
            . '(SELECT c.*, c2s.catId as cid,s.* FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId LEFT JOIN categories c ON c2s.catId = c.catId WHERE c2s.catId IN (16) ORDER BY c2s.storId, s.storDate DESC LIMIT 5)';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении данных главной страницы';
        }
        $tmpIndex = array();
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $catId = $Data['cid'];
            $storId = $Data['storId'];
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
                    'storAuthorName' => 'Author',
                    'storAuthorHref' => 'hhh',
                    'storRate'       => $Data['storRate'],
                    'storDate'       => $Data['storDate'],
                    'storWatches'    => $Data['storWatches'],
                    'storComments'   => $Data['storComments']
                );
            }
        }
        
        $tmpIndex = array_values($tmpIndex);
        foreach ($tmpIndex as $indexKey=>$indexValue) {
            $tmpIndex[$indexKey]['stors'] = array_values($indexValue['stors']);
        }
        
        return ($tmpIndex);
    }
    
    public function connect () {
        if (is_null($this->connection)) {
            $this->connection = DB_Connect('mysql');
        }
        DB_SetUTF8($this->connection, 'mysql');
    }
    
}