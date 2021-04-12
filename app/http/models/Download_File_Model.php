<?php

require '../../../vendor/autoload.php';
require '../controllers/EncryptionController.php';

// var_dump($_POST);
$file = $_POST['file_path'];

// echo $file;
// exit();

$encryption = new Encryption('', '', $file, '', '');

$download_response = $encryption->DownloadEncryptedFile();

echo $download_response;