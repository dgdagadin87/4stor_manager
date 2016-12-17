<?php

class synclinksModel extends abstractModel {

    public $numPages = 1;
    public $curPage  = 1;
    
    public $numOfLinks = 0;
    
    public function run () {
        $this->connect();
        return $this->getLinks();
    }
    
    public function getMeta() {
        // количество ссылок для синхронизации
        $SQL = 'SELECT COUNT(*) FROM `sync_links`';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении количества ссылок для синхронизации';
        }
        $numLinks = DB_Result ('mysql', $Query, 0, 0);
        $numPages = $numLinks > 0 ? ceil ($numLinks / 1) : 1;
        
        $page = !isset ($_GET['page']) || !ctype_digit ($_GET['page']) ? 1 : intval ($_GET['page']);
        if ($page < 1) {
            $page = 1;
        }
        else if ($page > $numPages) {
            $page = $numPages;
        }

        $this->curPage = $page;
        $this->numPages = $numPages;
        $this->numOfLinks = $numLinks;
        
        return (true);
    }
    
    public function getLinks () {
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
        $links = $this->getSyncLinks();
        if (!is_array($links)) {
            $laReturn['success'] = false;
            $laReturn['message'] = $links;
            return $laReturn;
        }
        $laReturn['data']['links'] = $links;
        $laReturn['data']['paging'] = array(
            '_currentPage' => $this->curPage,
            '_numOfPages' => $this->numPages
        );
        return $laReturn;
    }
    
    public function getSyncLinks () {
        $Return = array();
        $SQL = 'SELECT * FROM sync_links sl ORDER BY sl.linkName ASC LIMIT ' . 1*($this->curPage - 1) . ', 1';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении ссылок для синхронизации';
        }
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $Return[] = array(
                'linkId' => $Data['linkId'],
                'linkName' => $Data['linkName'],
                'linkHref' => $Data['linkHref'],
                'linkIsOn' => $Data['linkIsOn'] === 'y' ? true : false,
                'linkIsMultipage' => $Data['linkIsMultipage'] === 'y' ? true : false
            );
        }
        return ($Return);
    }
    
}