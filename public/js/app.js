
const EncryptSubmitBtn = document.getElementById('encrypt-file-submit-btn');
const fileInput = document.getElementById('pdf');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');
const FileSelectStatus = document.getElementById('file-select-status');
const FileEncryptionSuccessErrorStatus = document.getElementById('success-error-status');
const DownloadEncryptedFileBtn = document.getElementById('download-encrypted-file');

class EncryptFile { 
    fileErrorCheck() {
        if (password.value == '' || confirm_password.value == '' || password.value !== confirm_password.value){ 
            toastr.options.newestOnTop = true;
            toastr.options.timeOut = 0;
            toastr.options.extendedTimeOut = 0; 
            toastr.options.progressBar = true;
            toastr.options.rtl = false;
            toastr.options.closeButton = true;
            toastr.options.closeMethod = 'fadeOut';
            toastr.options.closeDuration = 300;
            toastr.options.closeEasing = 'swing';
            toastr.options.preventDuplicates = true;
            toastr.warning('Kindly Fill in all the fields. Passwords and File Fields cannot be null, Ensure that the password rhymes correctly!');
        }
        else {
            return false;
        }

    }
    
    Encrypt() { 
        fileInput.addEventListener('change', () => {
            DownloadEncryptedFileBtn.classList.add('download-encrypted-file-hidden');
            if (FileEncryptionSuccessErrorStatus.hasChildNodes()) {
                FileEncryptionSuccessErrorStatus.removeChild(FileEncryptionSuccessErrorStatus.childNodes[0]);
            }  
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

            let credentials = {
                encrypt_password: password.value,
                confirmPassword: confirm_password.value
            }
            let pdf_file = fileInput.files[0];

            let formData = new FormData();
            let action = "./app/http/models/PDF_Model.php";
            formData.append("pdf_file", pdf_file);
            formData.append("passwords", JSON.stringify(credentials));

            if (this.fileErrorCheck() == false) {
                event.target.innerHTML = `<i class="fa fa-spinner fa-spin" style="font-size:24px"></i> Encryption In Progress!`; 

                setTimeout(() => {
                    this.process_to_server(action, formData); 
                }, 5000); 
            }
        });
    }

    process_to_server(action, urlParams) { 
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                
                if (this.responseText.includes("An error occurred when trying to encrypt your file")) { 
                    FileEncryptionSuccessErrorStatus.innerHTML = `The system refused to encrypt the file. Kindly ensure your file is correct!` 
                    EncryptSubmitBtn.innerHTML = `<i class="fa fa-lock" aria-hidden="true"></i> Encrypt Your File`;
                }
                else if (this.responseText.includes(".pdf")) { 
                    localStorage.setItem('encryptedfilepath', this.responseText);  
                    DownloadEncryptedFileBtn.classList.remove('download-encrypted-file-hidden');
                    DownloadEncryptedFileBtn.href = `./public/files/${this.responseText}`;  
                    FileEncryptionSuccessErrorStatus.innerHTML = `The File got encrypted Successfully. To download click the download button below this page.`;
                    EncryptSubmitBtn.innerHTML = `<i class="fa fa-lock" aria-hidden="true"></i> Encrypt Your File`;
                }
                else if (this.responseText.includes("trouble encrypting the document")) { 
                    FileEncryptionSuccessErrorStatus.innerHTML = `The system refused to encrypt the file. Kindly ensure your file is correct!`; 
                    EncryptSubmitBtn.innerHTML = `<i class="fa fa-lock" aria-hidden="true"></i> Encrypt Your File`;
                }
                else if (this.responseText.includes("Thankyou for using pdf encryptor. file ready for download")) { 
                    FileEncryptionSuccessErrorStatus.innerHTML = `Thankyou for using pdf-encryptor. File is ready for download!`;
                    EncryptSubmitBtn.innerHTML = `<i class="fa fa-lock" aria-hidden="true"></i> Encrypt Your File`;
                }
                else if (this.responseText.includes("The file seems to have been corrupted during the encryption process")) { 
                    FileEncryptionSuccessErrorStatus.innerHTML = `The file got an error during server processing. Kindly try again!`;
                    EncryptSubmitBtn.innerHTML = `<i class="fa fa-lock" aria-hidden="true"></i> Encrypt Your File`;
                }
                else{
                    FileEncryptionSuccessErrorStatus.innerHTML = "Oops! Error, Kindly Try Again..."; 
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
});

