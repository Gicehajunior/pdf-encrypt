
const EncryptSubmitBtn = document.getElementById('encrypt-file-submit-btn');
const fileInput = document.getElementById('pdf');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');
const FileSelectStatus = document.getElementById('file-select-status');
const FileEncryptionSuccessErrorStatus = document.getElementById('success-error-status');
const DownloadEncryptedFileBtn = document.getElementById('download-encrypted-file');

class EncryptFile { 
    fileErrorCheck() {

    }
    
    Encrypt() { 
        fileInput.addEventListener('change', () => {
            DownloadEncryptedFileBtn.classList.add('download-encrypted-file-hidden');
            if(fileInput.files.length > 0) {
                FileSelectStatus.innerHTML = `You selected file: ${fileInput.files[0].name}. The file is ready to encrypt`;
                this.InitializeFileEncrypt();
            }
            else {
                FileSelectStatus.innerHTML = `No file was selected. Kindly select a file`;
            }
        });
    }

    InitializeFileEncrypt() {
        EncryptSubmitBtn.addEventListener('click', event => {
            event.preventDefault();
            // gicehajunior76@gmail.com
            let credentials = {
                encrypt_password: password.value,
                confirmPassword: confirm_password.value
            }
            let pdf_file = fileInput.files[0];

            let formData = new FormData();
            let action = "./app/http/models/PDF_Model.php";
            formData.append("pdf_file", pdf_file);
            formData.append("passwords", JSON.stringify(credentials));

            this.process_to_server(action, formData); 
        });
    }

    async fetch_api(action, formData) {
        try {
            let send_data = await fetch(action, {
                method: "POST",
                body: formData,
                signal: ctrl.signal
            });

            console.log(`Successful Upload ${send_data.status}`);
        } catch (error) {
            console.log(`Some Error in the upload process!, ${error}`);
        }
    }

    downloadEncryptedFile() {
        DownloadEncryptedFileBtn.addEventListener('click', () => {
            let action = "./app/http/models/Download_File_Model.php";
            let filepath = localStorage.getItem("encryptedfilepath");
            // alert(filepath);

            // let urlParams = `file_path=${filepath}`;
            let formData = new FormData();
            formData.append("file_path", filepath);

            this.process_to_server(action, formData);
        });
    }

    process_to_server(action, urlParams) { 
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                
                if (this.responseText.includes("An error occurred when trying to encrypt your file")) { 
                    FileEncryptionSuccessErrorStatus.innerHTML = `The system refused to encrypt the file. Kindly ensure your file is correct!` 
                    
                }
                else if (this.responseText.includes(".pdf")) { 
                    localStorage.setItem('encryptedfilepath', this.responseText);
                    DownloadEncryptedFileBtn.classList.remove('download-encrypted-file-hidden');
                    FileEncryptionSuccessErrorStatus.innerHTML = `The File got encrypted Successfully. To download click the download button below this page.`;
                    
                }
                else if (this.responseText.includes("trouble encrypting the document")) { 
                    FileEncryptionSuccessErrorStatus.innerHTML = `The system refused to encrypt the file. Kindly ensure your file is correct!`; 
                }
                else if (this.responseText.includes("Thankyou for using pdf encryptor. file ready for download")) { 
                    FileEncryptionSuccessErrorStatus.innerHTML = `Thankyou for using pdf-encryptor. File is ready for download!`;
                }
                else if (this.responseText.includes("The file seems to have been corrupted during the encryption process")) { 
                    FileEncryptionSuccessErrorStatus.innerHTML = `The file got an error during server processing. Kindly try again!`;
                }
                else{
                    FileEncryptionSuccessErrorStatus.innerHTML = "Oops! Error, Kindly Try Again..."; 
                    // console.log(this.responseText); 
                }
            }
        };
        xhttp.open("POST", action, true);
        // xhttp.setRequestHeader("Content-type", "application/pdf");
        xhttp.send(urlParams);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const file = new EncryptFile();

    file.Encrypt();
    file.downloadEncryptedFile(); 
});

