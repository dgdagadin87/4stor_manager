<?php

class statchartModel extends abstractModel {
    
    public function run () {
        $this->connect();
        return $this->getStatchart();
    }
    
    public function getStatchart () {
        $laReturn = array(
            'success' => true,
            'message' => '',
            'data'    => array()
        );
        $statchart = $this->getAppChartData();
        if (!is_array($statchart)) {
            $laReturn['success'] = false;
            $laReturn['message'] = $statchart;
            return $laReturn;
        }
        $laReturn['data'] = $statchart;
        return $laReturn;
    }

    public function getAppChartData() {
        $Return = array();
        
        $chartData = $this->getChartData();
        if (!is_array($chartData)) {
            return ($chartData);
        }
        $Return = $chartData;
        $Return['colors'] = $this->getChartColors();
  
        return $Return;
    }
    
    public function getChartData() {
        
        // данные о категориях
        $catIds = array();
        $SQL = 'SELECT c.*, COUNT(DISTINCT s.storId) AS numOfStors FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId LEFT JOIN categories c ON c2s.catId = c.catId GROUP BY c2s.catId ORDER BY numOfStors DESC LIMIT 6';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении данных о категориях';
        }

        $data = array(
            'chart' => array(),
            'categories'  => array(),
            'total' => 0
        );
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $catIds[] = $Data['catId'];
            $data['chart'][] = $Data['numOfStors'];
            $data['categories'][] = $Data['catName'];
            $data['total'] += $Data['numOfStors'];
        }
        
        $SQL = 'SELECT COUNT(*) FROM cats2stories c2s WHERE catId NOT IN (' . implode(',', $catIds) . ')';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении данных о категориях (2)';
        }
        $numStors = DB_Result ('mysql', $Query, 0, 0);
        $data['chart'][] = $numStors;
        $data['categories'][] = 'Прочие';
        $data['total'] += $numStors;
        
        return ($data);
    }
    
    public function getChartColors() {
        return array(
            'blue',
            'red',
            '#F79647',
            '#86B402',
            'green',
            'red',
            "aqua",
            '#52514E',
            '#4F81BC',
            '#A064A1',
            '#F79647'
        );
    }
    
}