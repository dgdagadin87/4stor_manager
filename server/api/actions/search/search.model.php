<?php

class searchModel extends abstractModel {

    public $numPages = 1;
    public $curPage  = 1;
    
    public $numOfStors = 0;
    
    public $sortBy = '';
    public $sortType = '';
    
    public $storName = null;
    public $storRateStart = null;
    public $storRateEnd = null;
    public $storDateFrom = null;
    public $storDateTo = null;
    public $storWatchesFrom = null;
    public $storWatchesTo = null;
    public $storCommentsFrom = null;
    public $storCommentsTo = null;
    
    public function run () {
        $this->connect();
        return $this->getSearch();
    }
    
    public function getMeta() {
        // сортировка
        $sortBy = isset($_GET['sortBy']) && in_array($_GET['sortBy'], $this->getSortByArray()) ? $_GET['sortBy'] : 'storDate';
        $sortType = isset($_GET['sortType']) && in_array($_GET['sortType'], $this->getSortTypeArray()) ? $_GET['sortType'] : 'DESC';
        
        // критерии поиска
        $storName = isset($_GET['storName']) && !empty($_GET['storName']) ? trim($_GET['storName']) : null;
        $storRateStart = isset($_GET['storRateStart']) && !empty($_GET['storRateStart']) ? intval($_GET['storRateStart']) : null;
        $storRateEnd = isset($_GET['storRateEnd']) && !empty($_GET['storRateEnd']) ? intval($_GET['storRateEnd']) : null;
        $storDateFrom = isset($_GET['storDateFrom']) && !empty($_GET['storDateFrom']) ? $_GET['storDateFrom'] : null;
        $storDateTo = isset($_GET['storDateTo']) && !empty($_GET['storDateTo']) ? $_GET['storDateTo'] : null;
        $storWatchesFrom = isset($_GET['storWatchesFrom']) && !empty($_GET['storWatchesFrom']) ? intval($_GET['storWatchesFrom']) : null;
        $storWatchesTo = isset($_GET['storWatchesTo']) ? $_GET['storWatchesTo'] : null;
        $storCommentsFrom = isset($_GET['storCommentsFrom']) && !empty($_GET['storCommentsFrom']) ? intval($_GET['storCommentsFrom']) : null;
        $storCommentsTo = isset($_GET['storCommentsFrom']) ? $_GET['storCommentsFrom'] : null;
        
        // все критерии пустые
        if (empty($storName) && empty($storRateStart) && empty($storRateEnd) && empty($storDateFrom) && empty($storDateTo) && empty($storWatchesFrom) && empty($storWatchesTo) && empty($storCommentsFrom) && empty($storCommentsTo)) {
            return 'Хотя бы один критерий для поиска должен быть заполнен';
        }
        
        // Если минимальный рейтинг больше максимального
        if (!empty($storRateStart) && !empty($storRateEnd) && ($storRateStart > $storRateEnd)) {
            return 'Поля "Рейтинг от" не должно быть больше поля "Рейтинг до"';
        }
        
        // Если минимальные просмотры больше максимальных
        if (!empty($storWatchesFrom) && !empty($storRateEnd) && ($storWatchesFrom > $storRateEnd)) {
            return 'Поля "Просмотров от" не должно быть больше поля "Просмотров до"';
        }
        
        // Если минимальные комментарии больше максимальных
        if (!empty($storCommentsFrom) && !empty($storCommentsTo) && ($storCommentsFrom > $storCommentsTo)) {
            return 'Поля "Комментариев от" не должно быть больше поля "Комментариев до"';
        }
        
        // Если даты не соответствуют своему формату
        //if (даты не соответствуют формату) {
        //    return 'Поля дат должны соответствовать формату "дд.мм.гггг"';
        //}
        
        $this->storName = $storName;
        $this->storRateStart = $storRateStart;
        $this->storRateEnd = $storRateEnd;
        $this->storDateFrom = $storDateFrom;
        $this->storDateTo = $storDateTo;
        $this->storWatchesFrom = $storWatchesFrom;
        $this->storWatchesTo = $storWatchesTo;
        $this->storWatchesTo = $storWatchesTo;
        $this->storCommentsTo = $storCommentsTo;

        // полный список категорий
        $SQL = 'SELECT catId, catName FROM categories';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении данных категорий';
        }
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $catId = $Data['catId'];
            $catName = $Data['catName'];
            $this->categories[$catId] = $catName;
        }
        
        // количество историй в поиске
        $SQL = 'SELECT COUNT(*) FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId LEFT JOIN categories c ON c2s.catId = c.catId WHERE ' . $this->getSearchConditions();
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {exit($SQL);
            return 'Ошибка при получении количества историй в поиске';
        }
        $numStores = DB_Result ('mysql', $Query, 0, 0);
        $numPages = $numStores > 0 ? ceil ($numStores / 10) : 1;
        
        $page = !isset ($_GET['page']) || !ctype_digit ($_GET['page']) ? 1 : intval ($_GET['page']);
        if ($page < 1) {
            $page = 1;
        }
        else if ($page > $numPages) {
            $page = $numPages;
        }
        
        $this->sortType = $sortType;
        $this->sortBy = $sortBy;
        $this->curPage = $page;
        $this->numPages = $numPages;
        $this->numOfStors = $numStores;
        
        return (true);
    }

    public function getSearch () {
        
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
        $stors = $this->getSearchStors();
        if (!is_array($stors)) {
            $laReturn['success'] = false;
            $laReturn['message'] = $stors;
            return $laReturn;
        }
        $laReturn['data']['search'] = $stors;
        $laReturn['data']['meta'] = array(
            '_currentPage' => $this->curPage,
            '_numOfStors' => $this->numOfStors,
            '_sortBy' => $this->sortBy,
            '_sortType' => $this->sortType,
        );
        $laReturn['data']['paging'] = array(
            '_currentPage' => $this->curPage,
            '_numOfPages' => $this->numPages
        );
        return $laReturn;
    }
    
    public function getSearchStors() {
        // данные рассказов по выбранным критериям поиска
        $SQL = 'SELECT c.*, c2s.catId as cid,s.* FROM cats2stories c2s LEFT JOIN stories s ON c2s.storId = s.storId LEFT JOIN categories c ON c2s.catId = c.catId WHERE ' . $this->getSearchConditions() . ' ORDER BY s.' . $this->sortBy . ' ' . $this->sortType . ' LIMIT ' . 10*($this->curPage - 1) . ', 10';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении списка рассказов по выбранным критериям';
        }
        
        $authors = array();
        $stors   = array();
        $storIds = array();
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $storIds[] = $Data['storId'];
            $authors[] = $Data['storAuthorId'];
            $stors[] = array(
                'storId'         => $Data['storId'],
                'storName'       => $Data['storName'],
                'storHref'       => $Data['storHref'],
                'storShortDesc'  => $Data['storDesc'],
                'storAuthorId'   => $Data['storAuthorId'],
                'storAuthorName' => '',
                'storAuthorHref' => '',
                'storRate'       => $Data['storRate'],
                'storDate'       => $Data['storDate'],
                'storWatches'    => $Data['storWatches'],
                'storComments'   => $Data['storComments'],
                'storCats'       => array()
            );
        }
        
        $cats = $this->getFullStorCatList($storIds);
        $authors = $this->getAuthors($authors);
        
        foreach ($stors as $storKey=>$storData) {
            $stors[$storKey]['storAuthorName'] = $authors[$storData['storAuthorId']]['authorName'];
            $stors[$storKey]['storAuthorHref'] = $authors[$storData['storAuthorId']]['authorHref'];
            $stors[$storKey]['storCats'] = $cats[$storData['storId']];
        }
        
        return $stors;
    }

    public function getSearchConditions() {
        $laConditions = array();
        
        if (!empty($this->storName)) {
            $laConditions[] = 's.storName LIKE "%' . DB_EscapeString('mysql', $this->connection, $this->storName) . '%"';
        }
        
        if (!empty($this->storRateStart)) {
            $laConditions[] = 's.storRate >= ' . $this->storRateStart . '';
        }
        
        if (!empty($this->storRateEnd)) {
            $laConditions[] = 's.storRate <= ' . $this->storRateEnd . '';
        }
        
        if (!empty($this->storWatchesFrom)) {
            $laConditions[] = 's.storWatches >= ' . $this->storWatchesFrom . '';
        }
        
        if (!empty($this->storWatchesTo)) {
            $laConditions[] = 's.storWatches <= ' . $this->storWatchesTo . '';
        }
        
        if (!empty($this->storCommentsFrom)) {
            $laConditions[] = 's.storComments >= ' . $this->storCommentsFrom . '';
        }
        
        if (!empty($this->storCommentsFrom)) {
            $laConditions[] = 's.storComments <= ' . $this->storCommentsFrom . '';
        }
        
        if (!empty($this->storDateFrom)) {
            $laConditions[] = 'DATE(s.storDate) >= "' . Helper::Main_ConvertDate($this->storDateFrom) . '"';
        }
        
        if (!empty($this->storDateTo)) {
            $laConditions[] = 'DATE(s.storDate) <= "' . Helper::Main_ConvertDate($this->storDateTo) . '"';
        }
        
        $lsSql = ' ' . implode(' AND ', $laConditions) . ' ';
        
        return ($lsSql);
    }
    
}

