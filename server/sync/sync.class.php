<?php

class serverSync {
    
    public $dom;
    public $xpath;
    public $href;
    public $data;
    
    public function __construct($paConf) {
        $this->dom = new DOMDocument();
        $this->href = $paConf['href'];
        $this->lastPage = $paConf['lastPage'];
        $this->model = $paConf['model'];
    }
    
    public function synchronize() {
        $this->_syncronizePage('http://4stor.ru/histori-for-life/page/2/');
    }
    
    private function _syncronizePage($psHref) {
        
        $laIds = $laNames = $laLinks = $laRates = $laDescs = $laAuthors = $laCats = $laDates = array();
        
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
        preg_match ('/^(\d\d-\d\d-\d\d\d\d),\s*\d\d:\d\d/', $element->nodeValue, $match);
        $lsDate = $match[1];
        $laDate = explode('-', $lsDate);
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

