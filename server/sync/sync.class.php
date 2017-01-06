<?php

class serverSync {
    
    public $dom;
    public $xpath;
    public $href;
    public $data;
    
    public function __construct($paConf) {
        $this->model = $paConf['model'];
    }
    
    public function synchronize() {
        $syncLinks = $this->model->getSyncLinks();
        foreach ($syncLinks as $linkData) {
            $this->_syncronizeLink($linkData);
        }
    }
    
    public function _syncronizeLink($linkData) {
        if ($linkData['linkIsMultipage'] === true) {
            for ($i = 1; $i < 1000000; $i++) {
                $syncPageResult = $this->_syncronizePage($linkData['linkHref'] . 'page/' . $i . '/');
                if ($syncPageResult === false) {
                    echo 'Link "' . $linkData['linkHref'] . '" is already synchronized';
                    break;
                }
            }
        }
        else {
            $this->_syncronizePage($linkData['linkHref']);
            echo 'Link "' . $linkData['linkHref'] . '" is already synchronized';
        }
    }
    
    private function _syncronizePage($psHref) {
        $this->dom = new DOMDocument();
        
        $laIds = $laNames = $laLinks = $laRates = $laDescs = $laAuthors = $laCats = $laDates = $laWatches = $laComments = array();
        
        @$this->dom->loadHTML(file_get_contents($psHref));
        
        $this->xpath = new DOMXpath($this->dom);
        
        // Id, Name, link
        $elements = $this->xpath->query(".//*[@class='story_item']/header/h2/a");

        if (!is_null($elements)) {
            $lnCnt = 0;
            foreach ($elements as $element) {
                $lsId = $this->_getStorId($element);
                $lsName = $this->_getStorName($element);
                $lsLink = $this->_getStorLink($element);
                
                $laIds[$lnCnt]   = $lsId;
                $laNames[$lnCnt] = $lsName;
                $laLinks[$lnCnt] = $lsLink;
                
                $lnCnt++;
            }
        }

        // if is empty
        if (sizeof($laIds) < 1) {
            return false;
        }

        for ($_Cnt = 0; $_Cnt < sizeof($laIds); $_Cnt++) {
            
            // xpath counter
            $xpathCnt = $_Cnt + 1;
            
            // Rating
            $ratingList = $this->xpath->query(".//*[@id='dle-content']/section[" . $xpathCnt . "]/header/h2/div/span");
            $lnRate = $ratingList->length < 1 ? "0" : $this->_getStorRate($ratingList->item(0));
            $laRates[$_Cnt] = $lnRate;
            
            // Num watches
            $watchesList = $this->xpath->query(".//*[@id='dle-content']/section[" . $xpathCnt . "]/footer/span/span[2]");
            $lnWatches = $watchesList->length < 1 ? 0 : $this->_getNumWatches($watchesList->item(0));
            $laWatches[$_Cnt] = $lnWatches;
            
            // Num comments
            $commentsList = $this->xpath->query(".//*[@id='dle-content']/section[" . $xpathCnt . "]/footer/span/span[3]/a/span");
            $lnComments = $commentsList->length < 1 ? 0 : $this->_getNumComments($commentsList->item(0));
            $laComments[$_Cnt] = $lnComments;
            
            // Short desc
            $descList = $this->xpath->query(".//*[@id='dle-content']/section[" . $xpathCnt . "]/div[@class='desc']/p");
            $lsDesc = $descList->length < 1 ? '' : $this->_getStorDesc($descList->item(0));
            $laDescs[$_Cnt] = $lsDesc;

            // Date
            $dateList = $this->xpath->query(".//*[@id='dle-content']/section[" . $xpathCnt . "]/footer/span[@class='white']");
            $lsDate = $dateList->length < 1 ? '' : $this->_getStorDate($dateList->item(0));
            $laDates[$_Cnt] = $lsDate;
            
            // Author
            $authorList = $this->xpath->query(".//*[@id='dle-content']/section[" . $xpathCnt . "]/footer/span[@class='white']/span[@class='autor']/a");
            $laCurAuthor = $authorList->length < 1 ? array() : $this->_getStorAuthor($authorList->item(0));
            $laAuthors[$_Cnt] = $laCurAuthor;
            
            // Cats
            $catList = $this->xpath->query(".//*[@id='dle-content']/section[" . $xpathCnt . "]/header/div[@class='parent']");
            $laCurCats = $catList->length < 1 ? array() : $this->_getStorCats($catList->item(0));
            $laCats[$_Cnt] = $laCurCats;
        }
        
        $this->data = $this->_getStorArray($laIds, $laNames, $laLinks, $laRates, $laDescs, $laAuthors, $laCats, $laDates, $laWatches, $laComments);
        //$this->_ouputDebug();
        $this->_putPageIntoDB();
    }
    
    private function _getStorId($element) {
        $link = $element->getAttribute('href');
        //preg_match('/\/(([\d]{1,100})-[\-a-zA-Z]+?)\.html$/ui', $link, $match);
        //$lnId = isset($match[2]) ? $match[2] : 0;
        $linkArray = explode('/', $link);
        $lastElementIndex = sizeof($linkArray) - 1;
        $lastElement = $linkArray[$lastElementIndex];
        $lastArray = explode('-', $lastElement);
        $lnId = $lastArray[0];
        return ($lnId);
    }
    
    private function _getStorName($element) {
        return ($element->nodeValue);
    }
    
    private function _getStorLink($element) {
        return ($element->getAttribute('href'));
    }
    
    private function _getStorDate($element) {
        preg_match ('/^(.*?),\s*(\d\d:\d\d)/', $element->nodeValue, $match);
        $lsDate = $match[1];
        $lsTime = $match[2] . ':00';
        return $this->_prepareDate($lsDate, $lsTime);
    }
    
    private function _prepareDate ($psDate, $psTime) {
        $laTime = explode(':',$psTime);
        if (preg_match('/сегодня/ui', $psDate)) {
            $today = mktime($laTime[0], $laTime[1], 0, date("m")  , date("d"), date("Y"));
            return (date("Y-m-d H:i:s", $today));
        }
        else if (preg_match('/вчера/ui', $psDate)) {
            $yesterday = mktime($laTime[0], $laTime[1], 0, date("m")  , date("d")-1, date("Y"));
            return date("Y-m-d H:i:s", $yesterday);
        }
        $laDate = explode('-', $psDate);
        $laDate[0] = strlen($laDate[0]) < 2 ? '0'.$laDate[0] : $laDate[0];
        $laDate[1] = strlen($laDate[0]) < 2 ? '0'.$laDate[1] : $laDate[1];
        return ($laDate[2] . '-' . $laDate[1] . '-' . $laDate[0] . ' ' . $psTime);
    }
    
    private function _getStorRate($element) {
        return ($element->nodeValue);
    }
    
    private function _getNumWatches($element) {
        $value = $element->nodeValue;
        $array = preg_split('/\s*:\s*/',$value);
        $watches = $array[1];
        $watches = str_replace(' ', '', $watches);
        $watches = intval($watches);
        return ($watches);
    }
    
    private function _getNumComments($element) {
        $value = $element->nodeValue;
        $value = empty($value) ? '0' : intval($value);
        return ($value);
    }
    
    private function _getStorAuthor($element) {
        $laReturn = array();
        $laReturn['name'] = $element->nodeValue;
        $laReturn['href'] = $element->getAttribute('href');
        return ($laReturn);
    }
    
    private function _getStorDesc($element) {
        return ($this->dom->saveXML($element));
    }
    
    private function _getStorCats($element) {
        $laCats = array();
        $catString = $element->nodeValue;
        $laCats = preg_split('/\s*\/\s*/', $catString);
        return $laCats;
    }
    
    private function _getStorArray($paIds, $paNames, $paLinks, $paRates, $paDescs, $paAuthors, $paCats, $paDates, $paWatches, $paComments) {
        $laReturn = array();
        $lnSizeof = sizeof($paIds);

        for ($i = 0; $i < $lnSizeof; $i++) {
            $laCurStor = array(
                'name'    => $paNames[$i],
                'link'    => $paLinks[$i],
                'rate'    => $paRates[$i],
                'watches' => $paWatches[$i],
                'comments'=> !isset($paComments[$i]) ? 0 : intval($paComments[$i]),
                'date'    => $paDates[$i],
                'desc'    => $paDescs[$i],
                'author'  => $paAuthors[$i],
                'cats'    => $paCats[$i]
            );
            $laReturn[$paIds[$i]] = $laCurStor;
        }
        return ($laReturn);
    }
    
    private function _putPageIntoDB () {
        $this->model->run($this->data);
    }
    
    private function _ouputDebug () {
        header('Content-Type: text/html; charset=utf-8');
        echo '<pre>';
        var_dump($this->data);
        exit;
    }
    
}

