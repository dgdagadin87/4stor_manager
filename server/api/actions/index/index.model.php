<?php

class indexModel {
    
    public $connection = null;
    
    public function run () {
        //$this->connect();
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
//        $SQL = 'SELECT *, (SELECT COUNT(*) FROM `cats2stories` WHERE categories.catId = cats2stories.catId) AS numStors FROM `categories`';
//        $Query = DB_Query ('mysql', $SQL, $this->connection);
//        if (!$Query) {
//            return 'Ошибка при получении списка категорий';
//        }
//        $categories = array();
//        while($catData = DB_FetchAssoc ('mysql', $Query)) {
//            $category = array();
//            $category['categoryId'] = $catData['catId'];
//            $category['categoryName'] = $catData['catName'];
//            $category['categoryHref'] = $catData['catHref'];
//            $category['categoryStors'] = $catData['numStors'];
//            $categories[] = $category;
//        }
        $categories = array(
            array(
                'categoryId' => 1,
                'categoryName' => 'Истории из жизни',
                'categoryUrl' => 'href1',
                'categoryStors' => 777,
                'stors' => array(
                    array(
                        'storId'         => 1,
                        'storName'       => 'История 1',
                        'storHref'       => 'link',
                        'storShortDesc'  => 'Краткое описание',
                        'storAuthorName' => 'Author',
                        'storAuthorHref' => 'hhh',
                        'storRate'       => 7,
                        'storDate'       => 'date',
                        'storWatches'    => 777,
                        'storComments'   => 7
                    )
                )
            ),
            array(
                'categoryId' => 2,
                'categoryName' => 'Творческие истории',
                'categoryUrl' => 'href2',
                'categoryStors' => 77,
                'stors' => array(
                    array(
                        'storId'         => 1,
                        'storName'       => 'История 1',
                        'storHref'       => 'link',
                        'storShortDesc'  => 'Краткое описание',
                        'storAuthorName' => 'Author',
                        'storAuthorHref' => 'hhh',
                        'storRate'       => 7,
                        'storDate'       => 'date',
                        'storWatches'    => 777,
                        'storComments'   => 7
                    )
                )
            ),
            array(
                'categoryId' => 3,
                'categoryName' => 'Несерьезные истории',
                'categoryUrl' => 'href3',
                'categoryStors' => 7,
                'stors' => array(
                    array(
                        'storId'         => 1,
                        'storName'       => 'История 1',
                        'storHref'       => 'link',
                        'storShortDesc'  => 'Краткое описание',
                        'storAuthorName' => 'Author',
                        'storAuthorHref' => 'hhh',
                        'storRate'       => 7,
                        'storDate'       => 'date',
                        'storWatches'    => 777,
                        'storComments'   => 7
                    )
                )
            )
        );
        return $categories;
    }
    
    public function connect () {
        if (is_null($this->connection)) {
            $this->connection = DB_Connect('mysql');
        }
        DB_SetUTF8($this->connection, 'mysql');
    }
    
}

