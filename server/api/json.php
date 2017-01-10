<?php

$lsAction = isset($_GET['action']) && in_array($_GET['action'], Helper::Main_GetActions()) ? $_GET['action'] : 'index';

require 'actions/' . $lsAction . '/' . $lsAction . '.model.php';
require 'actions/' . $lsAction . '/' . $lsAction . '.php';