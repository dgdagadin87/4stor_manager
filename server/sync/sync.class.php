<?php

class serverSync {
    
    public $dom;
    public $xpath;
    public $href;
    public $data;
    
    public function __construct($paConf) {
        $this->dom = new DOMDocument();
        $this->href = $paConf['href'];
        $this->model = $paConf['model'];
    }
    
    public function synchronize() {
        for ($i = 1; $i < 1000000; $i++) {
            $this->_syncronizePage($this->href . 'page/' . $i . '/');
        }
    }
    
    private function _syncronizePage($psHref) {
        
        $laIds = $laNames = $laLinks = $laRates = $laDescs = $laAuthors = $laCats = $laDates = array();
        
        @$this->dom->loadHTML(file_get_contents($psHref));
        
        $this->xpath = new DOMXpath($this->dom);
        
        // if is empty
        $elements = $this->xpath->query(".//*[@id='dle-content']");
        $b = $elements->length<1 ? 'true' : 'false';
        Helper::Main_Log(__DIR__, $psHref . '---' . $b . "\n\r");
//        Helper::Main_Log(__DIR__, $b);
//        exit;
        $length = $elements->length;
        if ($b === 'true') {
            exit('All stories of this category are synchronized.');
        }
        
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
        
        // Rating
        $elements = $this->xpath->query(".//*[@class='story_item']/header/h2/div[@class='rate']/span");
        if (!is_null($elements)) {
            $lnCnt = 0;
            foreach ($elements as $element) {
                $lnRate = $this->_getStorRate($element);
                
                $laRates[$lnCnt] = $lnRate;
                
                $lnCnt++;
            }
        }
        
        // Short desc
        $elements = $this->xpath->query(".//*[@class='story_item']/div[@class='desc']/p");
        if (!is_null($elements)) {
            $lnCnt = 0;
            foreach ($elements as $element) {
                $lsDesc = $this->_getStorDesc($element);
                
                $laDescs[$lnCnt] = $lsDesc;
                
                $lnCnt++;
            }
        }
        
        // Date
        $elements = $this->xpath->query(".//*[@class='story_item']/footer/span[@class='white']");
        if (!is_null($elements)) {
            $lnCnt = 0;
            foreach ($elements as $element) {
                $lsDate = $this->_getStorDate($element);
                
                $laDates[$lnCnt] = $lsDate;
                
                $lnCnt++;
            }
        }
        
        // Author
        $elements = $this->xpath->query(".//*[@class='story_item']/footer/span[@class='white']/span[@class='autor']/a");
        if (!is_null($elements)) {
            $lnCnt = 0;
            foreach ($elements as $element) {
                $laCurAuthor = $this->_getStorAuthor($element);
                
                $laAuthors[$lnCnt] = $laCurAuthor;
                
                $lnCnt++;
            }
        }
        
        // Cats
        $elements = $this->xpath->query(".//*[@class='story_item']/header/div[@class='parent']");
        if (!is_null($elements)) {
            $lnCnt = 0;
            foreach ($elements as $element) {
                $laCurCats = $this->_getStorCats($element);
                
                $laCats[$lnCnt] = $laCurCats;
                
                $lnCnt++;
            }
        }
        
        $this->data = $this->_getStorArray($laIds, $laNames, $laLinks, $laRates, $laDescs, $laAuthors, $laCats, $laDates);
        
        $this->_putPageIntoDB();
    }
    
    private function _getStorId($element) {
        $link = $element->getAttribute('href');
        preg_match('/\/(([\d]{1,100})-[\-a-zA-Z]+?)\.html$/ui', $link, $match);
        $lnId = isset($match[2]) ? $match[2] : 0;
        return ($lnId);
    }
    
    private function _getStorName($element) {
        return ($element->nodeValue);
    }
    
    private function _getStorLink($element) {
        return ($element->getAttribute('href'));
    }
    
    private function _getStorDate($element) {
        preg_match ('/^([\d]{1,2}-[\d]{1,2}-\d\d\d\d),\s*\d\d:\d\d/', $element->nodeValue, $match);
        $lsDate = $match[1];
        return $this->_prepareDate($lsDate);
    }
    
    private function _prepareDate ($psDate) {
        $laDate = explode('-', $psDate);
        $laDate[0] = strlen($laDate[0]) < 2 ? '0'.$laDate[0] : $laDate[0];
        $laDate[1] = strlen($laDate[0]) < 2 ? '0'.$laDate[1] : $laDate[1];
        return ($laDate[2] . '-' . $laDate[1] . '-' . $laDate[0]);
    }
    
    private function _getStorRate($element) {
        return ($element->nodeValue);
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
    
    private function _getStorArray($paIds, $paNames, $paLinks, $paRates, $paDescs, $paAuthors, $paCats, $paDates) {
        $laReturn = array();
        $lnSizeof = sizeof($paIds);
        for ($i = 0; $i < $lnSizeof; $i++) {
            $laCurStor = array(
                'name'   => $paNames[$i],
                'link'   => $paLinks[$i],
                'rate'   => $paRates[$i],
                'date'   => $paDates[$i],
                'desc'   => $paDescs[$i],
                'author' => $paAuthors[$i],
                'cats'   => $paCats[$i]
            );
            $laReturn[$paIds[$i]] = $laCurStor;
        }
        return ($laReturn);
    }
    
    private function _putPageIntoDB () {
        $this->model->run($this->data);
    }
    
    private function _ouputDebug () {
        echo '<pre>';
        var_dump($this->data);
        exit;
    }
    
}

