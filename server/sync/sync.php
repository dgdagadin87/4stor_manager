<?php

class serverSync {
    
    public $dom;
    public $xpath;
    public $href;
    
    public function __construct($paConf) {
        $this->dom = new DOMDocument();
        $this->href = 'http://4stor.ru/top/';
    }
    
    public function syncronize() {
        
        header('Content-Type: text/html; charset=utf-8');
        
        $laIds = $laNames = $laLinks = $laRates = $laDescs = $laCats = array();
        
        @$this->dom->loadHTML(file_get_contents($this->href));
        
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
    
    private function _getStorRate($element) {
        return ($element->nodeValue);
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
    
}

$sync = new serverSync(array());
$sync->syncronize();