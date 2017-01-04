<?php

class editLinkModel extends abstractModel {

    public function run () {
        $this->connect();
        return $this->editLink();
    }

    public function editLink () {
        $laReturn = array(
            'success' => true,
            'message' => '',
            'data'    => array()
        );
        $result = $this->editSyncLink();
        if ($result !== true) {
            $laReturn['success'] = false;
            $laReturn['message'] = $result;
            return $laReturn;
        }
        $laReturn['message'] = 'Ссылка для синхронизации успешно отредактирована';
        return $laReturn;
    }

    public function editSyncLink () {
        $model = isset($_POST['model']) && is_array($_POST['model']) ? $_POST['model'] : array();
        
        $linkId = isset($model['linkId']) && ctype_digit($model['linkId']) ? intval($model['linkId']) : null;
        $linkName = isset($model['linkName']) && trim($model['linkName']) <> '' ? trim($model['linkName']) : null;
        $linkHref = isset($model['linkHref']) && trim($model['linkHref']) <> '' ? trim($model['linkHref']) : null;
        $linkIsOn = isset($model['linkIsOn']) && Helper::Main_StringToBool($model['linkIsOn']) === true ? 'y' : 'n';
        $linkIsMulti = isset($model['linkIsMultipage']) && Helper::Main_StringToBool($model['linkIsMultipage']) === true ? 'y' : 'n';
        
        if (empty($linkId)) {
            return ('Идентификатор ссылки не определен. Нечего редактировать');
        }
        
        if (is_null($linkName)) {
            return ('Поле "Имя ссылки" не должно быть пустым');
        }
        
        if (is_null($linkHref)) {
            return ('Поле "Адрес ссылки" не должно быть пустым');
        }
        
        $linkName = DB_EscapeString('mysql', $this->connection, $linkName);
        $linkHref = DB_EscapeString('mysql', $this->connection, $linkHref);

        $SQL = 'UPDATE sync_links SET linkName = \'' . $linkName . '\', linkHref = \'' . $linkHref . '\', linkIsOn = \'' . $linkIsOn . '\', linkIsMultipage = \'' . $linkIsMulti . '\' WHERE linkId = ' . $linkId . '';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при редактировании ссылки для синхронизации';
        }

        return (true);
    }

}