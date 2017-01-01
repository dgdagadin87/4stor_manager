<?php

class delLinkModel extends abstractModel {

    public function run () {
        $this->connect();
        return $this->delLink();
    }

    public function delLink () {
        $laReturn = array(
            'success' => true,
            'message' => '',
            'data'    => array()
        );
        $result = $this->delSyncLink();
        if ($result !== true) {
            $laReturn['success'] = false;
            $laReturn['message'] = $result;
            return $laReturn;
        }
        $laReturn['message'] = 'Ссылка для синхронизации успешно удалена';
        return $laReturn;
    }

    public function delSyncLink () {
        $model = isset($_POST['model']) && is_array($_POST['model']) ? $_POST['model'] : array();
        
        $linkId = isset($model['linkId']) && ctype_digit($model['linkId']) ? intval($model['linkId']) : null;
        if (empty($linkId)) {
            return ('Идентификатор ссылки не определен. Нечего удалять');
        }

        $SQL = 'DELETE FROM sync_links WHERE linkId = ' . $linkId . '';
        $Query = DB_Query ('mysql', $SQL, $this->connection);
        if (!$Query) {
            return 'Ошибка при удалении ссылки для синхронизации';
        }

        return (true);
    }

}