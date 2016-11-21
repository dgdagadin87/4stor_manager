<?php

class searchModel {
    
    public $connection = null;
    
    public $categories = array();

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
        return $this->getCategory();
    }
    
    public function getFullStorCatList ($storIds) {
        $laStors = array();
        $SQL = 'SELECT catId, storId FROM cats2stories WHERE storId IN (' . implode(',', $storIds) . ')';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении полного списка категорий рассказов';
        }
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $storId = $Data['storId'];
            $catId  = $Data['catId'];
            if (!isset($laStors[$storId])) {
                $laStors[$storId] = array();
            }
            $laStors[$storId][] = array(
                'catId' => $catId,
                'catName' => $this->categories[$catId]
            );
        }
        return $laStors;
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
        if ($storRateStart > $storRateEnd) {
            return 'Поля "Рейтинг от" не должно быть больше поля "Рейтинг до"';
        }
        
        // Если минимальные просмотры больше максимальных
        if ($storWatchesFrom > $storRateEnd) {
            return 'Поля "Просмотров от" не должно быть больше поля "Просмотров до"';
        }
        
        // Если минимальные комментарии больше максимальных
        if ($storCommentsFrom > $storCommentsTo) {
            return 'Поля "Комментариев от" не должно быть больше поля "Комментариев до"';
        }
        
        // Если даты не соответствуют своему формату
        //if (даты не соответствуют формату) {
        //    return 'Поля дат должны соответствовать формату "дд.мм.гггг"';
        //}
        
        // категория
        $categoryId = isset($_GET['catId']) ? intval($_GET['catId']) : 0;
        if ($categoryId < 1) {
            return 'Не определена категория';
        }

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
            
            if ($categoryId == $catId) {
                $this->categoryName = $catName;
            }
        }
        if (is_null($this->categoryName)) {
            return 'Указанной категории нет в списке';
        }
        
        // количество историй в категории
        $SQL = 'SELECT COUNT(*) FROM `cats2stories` WHERE catId = ' . $categoryId;
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении количества историй в категории';
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
        $this->categoryId = $categoryId;
        $this->curPage = $page;
        $this->numPages = $numPages;
        $this->numOfStors = $numStores;
        
        $this->storName = $storName;
        $this->storRateStart = $storRateStart;
        $this->storRateEnd = $storRateEnd;
        $this->storDateFrom = $storDateFrom;
        $this->storDateTo = $storDateTo;
        $this->storWatchesFrom = $storWatchesFrom;
        $this->storWatchesTo = $storWatchesTo;
        $this->storWatchesTo = $storWatchesTo;
        $this->storCommentsTo = $storCommentsTo;
        
        return (true);
    }
    
    public function getAuthors ($authorIds) {
        $SQL = 'SELECT * FROM authors WHERE authorId IN (' . implode(',', $authorIds) . ')';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении данных авторов';
        }
        $authors = array();
        while($Data = DB_FetchAssoc ('mysql', $Query)) {
            $authorId = $Data['authorId'];
            $authors[$authorId] = array(
                'authorName' => $Data['authorName'],
                'authorHref' => $Data['authorHref'],
            );
        }
        return ($authors);
    }
    
    public function getSearch () {
        
        $metaResult = $this->getMeta();
        if ($metaResult !== true) {
            return ($metaResult);
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
        // условия поиска
        
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
            $laConditions[] = 's.storName ILIKE "%' . DB_EscapeString('mysql', $this->connection, $this->storName) . '%"';
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
            $laConditions[] = 'DATE(`s.storDate`) >= ' . Helper::Main_ConvertDate($this->storDateFrom) . '';
        }
        
        if (!empty($this->storDateTo)) {
            $laConditions[] = 'DATE(`s.storDate`) <= ' . Helper::Main_ConvertDate($this->storDateTo) . '';
        }
        
        $lsSql = ' ' . implode(' AND ', $laConditions) . ' ';
        
        return ($lsSql);
    }
    
    public function getSortByArray() {
        return array(
            'storDate',
            'storRate',
            'storComments',
            'storWatches',
            'storName'
        );
    }
    
    public function getSortTypeArray() {
        return array(
            'ASC',
            'DESC'
        );
    }
    
    public function connect () {
        if (is_null($this->connection)) {
            $this->connection = DB_Connect('mysql');
        }
        DB_SetUTF8($this->connection, 'mysql');
    }
    
}

