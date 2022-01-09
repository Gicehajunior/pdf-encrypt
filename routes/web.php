<?php

    // Router instance
    $router = new AltoRouter();

    // homepage route
    $router->map( 'GET', '/', function() { 
        require './resources/views/index.php';
    });

    $router->map( 'GET', '/public/files', function() {
        header('Location:' . $_SERVER['HTTP_REFERER'] . '');
        exit();
    });

    $match = $router->match();
    if( $match && is_callable( $match['target'] ) ) {
        call_user_func_array( $match['target'], $match['params'] ); 
    } else {
        header('Location:' . $_SERVER['HTTP_REFERER'] . '');
        exit();
    }
