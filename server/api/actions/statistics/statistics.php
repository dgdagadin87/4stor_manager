<?php

$statisticsModel = new statisticsModel();

echo json_encode($statisticsModel->run());
exit;
