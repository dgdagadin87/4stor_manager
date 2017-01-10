<?php

require ('server/cfg/config.php');
require ('server/inc/db.inc.php');
require ('server/inc/helper.inc.php');
require ('server/abstract/abstract.model.php');

set_time_limit(0);

$mode = Helper::Main_GetMode();

header('Content-Type: text/html; charset=utf-8');

if ($mode === 'gui') {
   
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ru">
    <head>
        <title>4stor - Страшные истории</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta content="ie=edge" http-equiv="x-ua-compatible">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script data-main="resources/js/start.js" src="resources/js/library/require/require.js"></script>
        <link rel="stylesheet" href="resources/css/jquery-ui.css"/>
        <link rel="stylesheet" href="resources/css/chartist.min.css"/>
        <link href="resources/css/style.css" rel="stylesheet"/>
    </head>
    <body id="main-body">
        <div class="spinner-title">Загрузка</div>
        <div class="spinner-loader large"></div>
        <div class="spinner-message">Подождите, идет загрузка общих компонентов...</div>
    </body>
</html>
<?php

}
else if ($mode === 'json') {
    require('server/actions/json.php');
}

?>