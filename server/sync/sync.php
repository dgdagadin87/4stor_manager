<?php

require ('../cfg/config.php');
require ('../inc/db.inc.php');

require ('sync.class.php');
require ('sync.model.php');

header('Content-Type: text/html; charset=utf-8');

$sync = new serverSync(array(
    'model'   => new serverSyncModel(),
    'href'    => 'http://4stor.ru/histori-for-life/page',
    'lastPage'=> 2384
));
$sync->synchronize();