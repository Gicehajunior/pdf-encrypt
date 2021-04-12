<?php

require '../../../vendor/autoload.php';
require '../controllers/EncryptionController.php';


$filename = $_FILES['pdf_file']['name'];
$file_tmp_name = $_FILES['pdf_file']['tmp_name'];
$passwords = json_decode($_POST['passwords'], true); 

$encrypt_password = $passwords['confirmPassword'];
$confirmPassword = $passwords['confirmPassword'];

$newFileName = uniqid('', true).".pdf"; 

$fileDestination = '../../../public/files/'.$newFileName;
move_uploaded_file($file_tmp_name, $fileDestination);


$encryption = new Encryption($fileDestination, $file_tmp_name, $filename, $encrypt_password, $confirmPassword);

$encrypt = $encryption->encrypt();

echo $encrypt;
