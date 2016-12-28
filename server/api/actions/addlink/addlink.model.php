<?php

class addLinkModel extends abstractModel {

    public function run () {
        $this->connect();
        return $this->addLink();
    }
    
    public function addLink () {
        $laReturn = array(
            'success' => true,
            'message' => '',
            'data'    => array()
        );
        $result = $this->addSyncLink();
        if ($result !== true) {
            $laReturn['success'] = false;
            $laReturn['message'] = $result;
            return $laReturn;
        }
        return $laReturn;
    }
    
    public function addSyncLink () {
        var_dump($_POST);
    }
    
}