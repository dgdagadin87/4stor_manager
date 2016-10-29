<?php

require (__DIR__ . '/../cfg/config.php');
require (__DIR__ . '/../inc/db.inc.php');
require (__DIR__ . '/../inc/helper.inc.php');

set_time_limit(0);

header('Content-Type: text/html; charset=utf-8');

$lsAction = isset($_GET['action']) && in_array($_GET['action'], Helper::Main_GetActions()) ? $_GET['action'] : 'index';

require 'actions/' . $lsAction . '/' . $lsAction . '.model.php';
require 'actions/' . $lsAction . '/' . $lsAction . '.php';