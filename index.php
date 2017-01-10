<?php

require ('server/cfg/config.php');
require ('server/inc/db.inc.php');
require ('server/controllers/controller.php');
require ('server/inc/helper.inc.php');
require ('server/inc/session.inc.php');
require ('server/inc/tpl.inc.php');
require ('server/base/abstract/abstract.model.php');
require ('server/base/singleton/connection.singleton.php');

Helper::SetConfigs();
Helper::SetHeaders();

Session::Start();

if (Helper::Main_GetMode() === 'gui') {
    Controller::actionGUI();
}
else if (Helper::Main_GetMode() === 'json') {
    Controller::actionJSON();
}
else if (Helper::Main_GetMode() === 'login') {
    Controller::actionLogin();
}