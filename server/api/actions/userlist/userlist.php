<?php

$userlistModel = new userlistModel();

echo json_encode($userlistModel->run());
exit;
