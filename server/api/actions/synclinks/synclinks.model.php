<?php

class synclinksModel extends abstractModel {

    public function run () {
        $this->connect();
        return $this->getLinks();
    }
    
    public function getLinks () {
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
        return $laReturn;
    }
    
    public function getSyncLinks () {
        $Return = array();
        $SQL = 'SELECT * FROM sync_links';
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