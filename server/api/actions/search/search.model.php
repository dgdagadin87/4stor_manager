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
    
    public $searchInShortDesc = true;
    
    public $categoryList = array();
    
    public function run () {
        return $this->getSearch();
    }
    
    public function getMeta() {
        // сортировка
        $sortBy = isset($_POST['sortBy']) && in_array($_POST['sortBy'], $this->getSortByArray()) ? $_POST['sortBy'] : 'storDate';
        $sortType = isset($_POST['sortType']) && in_array($_POST['sortType'], $this->getSortTypeArray()) ? $_POST['sortType'] : 'DESC';
        
        // критерии поиска
        $storName = isset($_POST['storName']) && !empty($_POST['storName']) ? trim($_POST['storName']) : null;
        $storRateStart = isset($_POST['storRateStart']) && is_numeric($_POST['storRateStart']) ? intval($_POST['storRateStart']) : null;
        $storRateEnd = isset($_POST['storRateEnd']) && is_numeric($_POST['storRateEnd']) ? intval($_POST['storRateEnd']) : null;
        $storDateFrom = isset($_POST['storDateFrom']) && !empty($_POST['storDateFrom']) ? $_POST['storDateFrom'] : null;
        $storDateTo = isset($_POST['storDateTo']) && !empty($_POST['storDateTo']) ? $_POST['storDateTo'] : null;
        $storWatchesFrom = isset($_POST['storWatchesFrom']) && ctype_digit($_POST['storWatchesFrom']) ? intval($_POST['storWatchesFrom']) : null;
        $storWatchesTo = isset($_POST['storWatchesTo']) && ctype_digit($_POST['storWatchesTo']) ? intval($_POST['storWatchesTo']) : null;
        $storCommentsFrom = isset($_POST['storCommentsFrom']) && ctype_digit($_POST['storCommentsFrom']) ? intval($_POST['storCommentsFrom']) : null;
        $storCommentsTo = isset($_POST['storCommentsTo']) && ctype_digit($_POST['storCommentsTo']) ? intval($_POST['storCommentsTo']) : null;
        
        $searchInShortDesc = isset($_POST['searchInShortDesc']) && Helper::Main_StringToBool($_POST['searchInShortDesc']) === true ? true : false;
        
        // категории
        $catsList = isset($_POST['categories']) && is_array($_POST['categories']) ? $_POST['categories'] : array();
        
        // если пустые категории
        if (sizeof($catsList) < 1) {
            return 'Хотя бы одна категория должна быть выбрана';
        }

        // все критерии пустые
        //if (empty($storName) && empty($storRateStart) && empty($storRateEnd) && empty($storDateFrom) && empty($storDateTo) && empty($storWatchesFrom) && empty($storWatchesTo) && empty($storCommentsFrom) && empty($storCommentsTo)) {
        //    return 'Хотя бы один критерий для поиска должен быть заполнен';
        //}
        
        // Если минимальный рейтинг больше максимального
        if (!empty($storRateStart) && !empty($storRateEnd) && ($storRateStart > $storRateEnd)) {
            return 'Поля "Рейтинг от" не должно быть больше поля "Рейтинг до"';
        }
        
        // Если минимальные просмотры больше максимальных
        if (!empty($storWatchesFrom) && !empty($storWatchesTo) && ($storWatchesFrom > $storWatchesTo)) {
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
        $this->storCommentsFrom = $storCommentsFrom;
        $this->storCommentsTo = $storCommentsTo;

        $this->searchInShortDesc = $searchInShortDesc;
        
        $this->categoryList = $catsList;

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
        $SQL = 'SELECT COUNT(DISTINCT s.storId) FROM stories s LEFT JOIN cats2stories c2s ON c2s.storId = s.storId WHERE ' . $this->getSearchConditions();
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при получении количества историй в поиске';
        }
        $numStores = DB_Result ('mysql', $Query, 0, 0);
        $numPages = $numStores > 0 ? ceil ($numStores / 10) : 1;
        
        $page = !isset ($_POST['page']) || !ctype_digit ($_POST['page']) ? 1 : intval ($_POST['page']);
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
        $SQL = 'SELECT DISTINCT s.* FROM stories s LEFT JOIN cats2stories c2s ON c2s.storId = s.storId WHERE ' . $this->getSearchConditions() . ' ORDER BY s.' . $this->sortBy . ' ' . $this->sortType . ' LIMIT ' . 10*($this->curPage - 1) . ', 10';
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
                'storDate'       => Helper::Main_ConvertDate($Data['storDate'], 'OUTPUT'),
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
        
        $laConditions[] = 'c2s.catId IN (' . implode(',', $this->categoryList) . ')';
        
        if (!empty($this->storName)) {
            $storName = DB_EscapeString('mysql', $this->connection, $this->storName);
            $likeString = 's.storName LIKE "%' . $storName . '%"';
            if ($this->searchInShortDesc) {
                $likeString .= ' OR s.storDesc LIKE "%' . $storName . '%"';
            }
            $laConditions[] = $likeString;
        }
        
        if (!is_null($this->storRateStart)) {
            $laConditions[] = 's.storRate >= ' . $this->storRateStart . '';
        }
        
        if (!is_null($this->storRateEnd)) {
            $laConditions[] = 's.storRate <= ' . $this->storRateEnd . '';
        }
        
        if (!is_null($this->storWatchesFrom)) {
            $laConditions[] = 's.storWatches >= ' . $this->storWatchesFrom . '';
        }
        
        if (!is_null($this->storWatchesTo)) {
            $laConditions[] = 's.storWatches <= ' . $this->storWatchesTo . '';
        }
        
        if (!is_null($this->storCommentsFrom)) {
            $laConditions[] = 's.storComments >= ' . $this->storCommentsFrom . '';
        }
        
        if (!is_null($this->storCommentsTo)) {
            $laConditions[] = 's.storComments <= ' . $this->storCommentsTo . '';
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

