<?php

$categoriesModel = new categoriesModel();

echo json_encode($categoriesModel->run());
exit;
