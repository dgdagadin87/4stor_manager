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
        $laReturn['message'] = 'Ссылка для синхронизации успешно добавлена';
        return $laReturn;
    }
    
    public function addSyncLink () {
        $model = isset($_POST['model']) && is_array($_POST['model']) ? $_POST['model'] : array();
        
        $linkName = isset($model['linkName']) && trim($model['linkName']) <> '' ? trim($model['linkName']) : null;
        $linkHref = isset($model['linkHref']) && trim($model['linkHref']) <> '' ? trim($model['linkHref']) : null;
        $linkIsOn = isset($model['linkIsOn']) && Helper::Main_StringToBool($model['linkIsOn']) === true ? 'y' : 'n';
        $linkIsMulti = isset($model['linkIsMultipage']) && Helper::Main_StringToBool($model['linkIsMultipage']) === true ? 'y' : 'n';
        
        if (is_null($linkName)) {
            return ('Поле "Имя ссылки" не должно быть пустым');
        }
        
        if (is_null($linkHref)) {
            return ('Поле "Адрес ссылки" не должно быть пустым');
        }
        
        $linkName = DB_EscapeString('mysql', $this->connection, $linkName);
        $linkHref = DB_EscapeString('mysql', $this->connection, $linkHref);

        $SQL = 'INSERT INTO sync_links (linkName, LinkHref, linkIsOn, linkIsMultipage) VALUES (\'' . $linkName . '\', \'' . $linkName . '\', \'' . $linkIsOn . '\', \'' . $linkIsMulti . '\')';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при добавлении ссылки для синхронизации';
        }
        
        return (true);
    }
    
}