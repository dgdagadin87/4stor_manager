<?php

$linksModel = new synclinksModel();

echo json_encode($linksModel->run());
exit;
