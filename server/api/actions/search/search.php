<?php

$searchModel = new searchModel();

echo json_encode($searchModel->run());
exit;