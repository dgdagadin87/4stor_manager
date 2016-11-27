<?php

class statisticsModel extends abstractModel {
    
    public function run () {
        $this->connect();
        return $this->getStatistics();
    }
    
    public function getStatistics () {
        $laReturn = array(
            'success' => true,
            'message' => '',
            'data'    => array()
        );
        $statistics = $this->getAppStat();
        if (!is_array($statistics)) {
            $laReturn['success'] = false;
            $laReturn['message'] = $statistics;
            return $laReturn;
        }
        $laReturn['data']['statistics'] = $statistics;
        return $laReturn;
    }

    public function getAppStat() {
        
        // данные о категориях
        $SQL = 'SELECT c.*, MAX(s.storRate) as maxRate, AVG(s.storRate) as avgRate, MIN(s.storRate) AS minRate, COUNT(DISTINCT s.storId) AS numOfStors FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId LEFT JOIN categories c ON c2s.catId = c.catId GROUP BY c2s.catId';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении данных о категориях';
        }

        $statistics = array();
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $statistics[] = array(
                'catId'      => $Data['catId'],
                'catName'    => $Data['catName'],
                'catHref'    => $Data['catHref'],
                'maxRate'    => number_format ($Data['maxRate'], 0, '.', ' '),
                'avgRate'    => number_format ($Data['avgRate'], 2, '.', ' '),
                'minRate'    => number_format ($Data['minRate'], 0, '.', ' '),
                'numOfStors' => number_format ($Data['numOfStors'], 0, '.', ' ')
            );
        }
        
        return ($statistics);
    }
    
}