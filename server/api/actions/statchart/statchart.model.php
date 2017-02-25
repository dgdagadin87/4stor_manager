<?php

class statchartModel extends abstractModel {
    
    public function run () {
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
        $SQL = 'SELECT c.*, COUNT(DISTINCT s.storId) AS numOfStors FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId LEFT JOIN categories c ON c2s.catId = c.catId GROUP BY c2s.catId ORDER BY numOfStors DESC LIMIT 8';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении данных о категориях';
        }

        $data = array(
            'chart' => array(),
            'categories'  => array(),
            'labels' => array(),
            'total' => 0
        );
        
        $count = 1;
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $catIds[] = $Data['catId'];
            $data['chart'][] = $Data['numOfStors'];
            $data['categories'][] = $Data['catName'];
            $data['labels'][] = '(' . $count . ')';
            $data['total'] += $Data['numOfStors'];
            
            $count++;
        }
        
        $SQL = 'SELECT COUNT(*) FROM cats2stories c2s WHERE catId NOT IN (' . implode(',', $catIds) . ')';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении данных о категориях (2)';
        }
        $numStors = DB_Result ('mysql', $Query, 0, 0);
        $data['chart'][] = $numStors;
        $data['categories'][] = 'Прочие';
        $data['labels'][] = '(' . $count . ')';
        $data['total'] += $numStors;
        
        $data['total_true'] = $this->getTotalTrue();
        
        return ($data);
    }
    
    public function getTotalTrue() {
        $SQL = 'SELECT COUNT(DISTINCT s.storId) FROM stories s LEFT JOIN cats2stories c2s ON c2s.storId = s.storId WHERE c2s.catId IN (' . implode(',', $this->getCategories()) . ')';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении количества историй в поиске';
        }
        $numStores = DB_Result ('mysql', $Query, 0, 0);
        return ($numStores);
    }
    
    public function getCategories() {
        $SQL = 'SELECT catId FROM `categories`';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении списка категорий';
        }
        $categories = array();
        while($catData = DB_FetchAssoc ('mysql', $Query)) {
            $categories[] = $catData['catId'];
        }
        return $categories;
    }
    
    public function getChartColors() {
        return array(
            '#d70206',
            '#f05b4f',
            '#f4c63d',
            '#d17905',
            '#453d3f',
            '#59922b',
            '#0544d3',
            '#6b0392',
            '#f05b4f'
        );
    }
    
}