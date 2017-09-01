<?php

class userlistsModel extends abstractModel {

    public $numPages = 1;
    public $curPage  = 1;
    
    public $numOfLinks = 0;
    
    public function run () {
        return $this->getUserlist();
    }
    
    public function getUserlist () {
        $laReturn = array(
            'success' => true,
            'message' => '',
            'data'    => array(
                'userlist' => array(
                    array(
                        'userId' => 1,
                        'userLogin' => 'Medved',
                        'userName' => 'Медведь',
                        'isSwitched' => true
                    ),
                    array(
                        'userId' => 2,
                        'userLogin' => 'Brovievna',
                        'userName' => 'Брова',
                        'isSwitched' => true
                    )
                )
            )
        );
        return $laReturn;
    }
    
    public function getSyncLinks () {
        $Return = array();
        $SQL = 'SELECT * FROM sync_links sl ORDER BY sl.linkName ASC LIMIT ' . 20*($this->curPage - 1) . ', 20';
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