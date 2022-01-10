<?php

    class Encryption{ 
        private $unecrypted_filename;
        private $file_name;
        private $myPassword;
        private $userPassword;

        public function __construct($unecrypted_filename, $tmp_name, $file_name, $myPassword, $userPassword) {
            $this->unecrypted_filename = $unecrypted_filename; 
            $this->file_name = $file_name;
            $this->myPassword = $myPassword;
            $this->userPassword = $userPassword;
        }

        /*******
         * set the format of the destinaton file, in our case 6×9 inch
         * calculate the number of pages from the original document
         * copy all pages from the old unprotected pdf in the new one
         * protect the new pdf file, and allow no printing, copy etc and leave only reading allowed
         */
        public function encrypt(){
            $pdf = new setasign\FpdiProtection\FpdiProtection(); 

            try {
                $pageCount = $pdf->setSourceFile($this->unecrypted_filename);

                for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
                    $tpl = $pdf->importPage($pageNo);
                    $pdf->AddPage();
                    $pdf->useTemplate($tpl, ['adjustPageSize' => true]);
                }
            
            
                $pdf->setProtection(
                    setasign\FpdiProtection\FpdiProtection::PERM_PRINT | setasign\FpdiProtection\FpdiProtection::PERM_COPY,
                    $this->userPassword,
                    $this->myPassword
                );

                $output = $pdf->Output($this->unecrypted_filename, 'F'); 
                $output_file_name = $this->file_name; 

                //Close and output PDF document to the browser 
                if(true){ 
                    $success = "Done Document Encryption";

                    return $output_file_name; 
                }
                else{
                    $error = 'trouble encrypting the document';
                    return $error;
                }
            }
            catch (\Throwable $error) {
                echo "An error occurred when trying to encrypt your file";
            }
        }
    }


