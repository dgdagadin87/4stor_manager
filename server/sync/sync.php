<?php

require (__DIR__ . '/../cfg/config.php');
require (__DIR__ . '/../inc/db.inc.php');
require (__DIR__ . '/../inc/helper.inc.php');

require (__DIR__ . '/sync.class.php');
require (__DIR__ . '/sync.model.php');

set_time_limit(0);

$sync = new serverSync(array(
    'model'   => new serverSyncModel(),
    'href'    => $argv[1]
));
$sync->synchronize();