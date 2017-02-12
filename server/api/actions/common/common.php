<?php

$commonModel = new commonModel();
sleep(20);
echo json_encode($commonModel->run());
exit;
