<?php

require (__DIR__ . '/../cfg/config.php');
require (__DIR__ . '/../inc/db.inc.php');
require (__DIR__ . '/../inc/helper.inc.php');

set_time_limit(0);

$lsAction = isset($_GET['action']) && in_array($_GET['action'], Helper::Main_GetActions()) ? $_GET['action'] : 'mainpage';