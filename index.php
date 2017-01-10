<?php

require ('server/cfg/config.php');
require ('server/inc/db.inc.php');
require ('server/controllers/controller.php');
require ('server/inc/helper.inc.php');
require ('server/inc/session.inc.php');
require ('server/inc/tpl.inc.php');
require ('server/abstract/abstract.model.php');

Helper::SetConfigs();
Helper::SetHeaders();

Session::Start();

if (Helper::Main_GetMode() === 'gui') {
    Controller::GUI();
}
else if (Helper::Main_GetMode() === 'json') {
    Controller::JSON();
}
else if (Helper::Main_GetMode() === 'login') {
    Controller::Login();
}