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
            $laReturn['message'] = $index;
            return $laReturn;
        }
        $laReturn['data']['statistics'] = $statistics;
        return $laReturn;
    }

    public function getAppStat() {
        return array(
            'numOfCategories'     => 19,
            'numOfStories'        => 20000,
            'numOfAuthors'        => 3000,
            'mostPopularCatId'    => 1,
            'mostPopularCatName'  => 'Истории из жизни',
            'lessPopularCatId'    => 9,
            'lessPopularCatName'  => 'Страшные арты',
            'mostPopularStorId'   => 25772,
            'mostPopularStorName' => 'НЛО, доказательства существования',
            'lessPopularStorId'   => 854,
            'lessPopularStorName' => 'Фотографии НЛО',
        );
    }
    
}