<?php

class serverSync {
    
    public $dom;
    public $xpath;
    public $href;
    
    public function __construct($paConf) {
        $this->dom = new DOMDocument();
        $this->href = 'http://4stor.ru/histori-for-life/page/2/';
    }
    
    public function syncronize() {
        $storiesArray = array();
        @$this->dom->loadHTML(file_get_contents($this->href));
        
        $this->xpath = new DOMXpath($this->dom);
        $elements = $this->xpath->query(".//*[@class='story_item']/header/h2/a");
        header('Content-Type: text/html; charset=utf-8');
        if (!is_null($elements)) {
            foreach ($elements as $element) {
                echo "<br/>[". $element->nodeName. "]";

                $nodes = $element->childNodes;
                foreach ($nodes as $node) {
                    echo $node->nodeValue. "<br/>";
                }
            }
        }
    }
    
}

$sync = new serverSync(array());
$sync->syncronize();