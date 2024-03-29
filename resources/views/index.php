<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="theme-color" content="#fff">

    <!-- PWA rel links -->
    <link rel="manifest" href="./manifest.json">
    <link rel="apple-touch-icon" href="./public/logo/logo.png">

    <title>PDF Encrypt Online</title>
    <link rel="stylesheet" href="public/css/app.css">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>

    <!-- bootstrap icons -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/6a9db0427a.js" crossorigin="anonymous"></script>

    <!-- toast css -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
    <!--/ toast css -->
</head>

<body>
    <div class="main pb-5">
        <div class="container pt-5">
            <h2 class="text-center font-weight-bold pb-2 text-uppercase">encrypt pdf</h2>
            <div class="container">
                <div class="form-group pt-3">
                    <label for="" class="font-weight-bold pb-2">Select file to encrypt:</label>
                    <input type="file" name="" id="pdf" class="form-control pdf-file" placeholder="" aria-describedby="helpId">
                </div>
                <div class="form-group pt-3 pb-3" id="file-select-status"></div>
                <div class="form-group pt-3">
                    <label for="" class="font-weight-bold pb-2">Password:</label>
                    <input type="password" name="" id="password" class="form-control password" placeholder="Password" aria-describedby="helpId">
                </div>
                <div class="form-group pt-3">
                    <label for="" class="font-weight-bold pb-2">Confirm Password:</label>
                    <input type="password" name="" id="confirm_password" class="form-control confirm_password" placeholder="Confirm Password" aria-describedby="helpId">
                </div>
                <div class="form-group">
                    <p class="font-weight-bold success-error-status pt-3" id="success-error-status"></p>
                </div>
                <div class="form-group pt-3">
                    <button type="submit" class="btn btn-secondary encrypt w-50" id="encrypt-file-submit-btn"><i class="fa fa-lock" aria-hidden="true"></i> Encrypt Your File</button>
                </div>

                <div class="form-group pt-5">
                    <a type="button" id="download-encrypted-file" href="" download class="btn btn-sm btn-secondary btn-block download-encrypted-file download-encrypted-file-hidden w-100"><i class="fa fa-download" aria-hidden="true"></i> Download Encrypted File</a>
                </div>
            </div>
        </div>
    </div>

    <!-- local script -->
    <script src="public/js/app.js"></script>
    <!--/ local script  -->

    <!-- bootstrap scripts -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!--/ bootstrap scripts -->

    <!-- toast script -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <!--/ toast script -->

    <!-- local script -->
    <script src="./app.js"></script>
    <!--/ local script  -->
</body>

</html>