<?php

require (__DIR__ . '/../cfg/config.php');
require (__DIR__ . '/../inc/db.inc.php');

require (__DIR__ . '/sync.class.php');
require (__DIR__ . '/sync.model.php');

set_time_limit(0);

header('Content-Type: text/html; charset=utf-8');

$sync = new serverSync(array(
    'model'   => new serverSyncModel(),
    'href'    => 'http://4stor.ru/skazki/'
));
$sync->synchronize();