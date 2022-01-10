<?php

require '../../../vendor/autoload.php';
require '../controllers/EncryptionController.php';


$filename = $_FILES['pdf_file']['name'];
$file_tmp_name = $_FILES['pdf_file']['tmp_name'];
$passwords = json_decode($_POST['passwords'], true); 

$encrypt_password = $passwords['confirmPassword'];
$confirmPassword = $passwords['confirmPassword'];

$newFileName = md5(uniqid('', true));

$newFileName = substr($newFileName, -5) . ".pdf";

$unecrypted_filename = '../../../public/files/'.$newFileName;
move_uploaded_file($file_tmp_name, $unecrypted_filename);

$actual_file_name = $newFileName;


$encryption = new Encryption($unecrypted_filename, $file_tmp_name, $actual_file_name, $encrypt_password, $confirmPassword);

$encrypt = $encryption->encrypt();

echo $encrypt;
