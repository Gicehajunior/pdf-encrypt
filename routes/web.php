<?php

    // Router instance
    $router = new AltoRouter();

    // homepage route
    $router->map( 'GET', '/', function() { 
        require './resources/views/index.php';
    });




    $match = $router->match();
    if( $match && is_callable( $match['target'] ) ) {
        call_user_func_array( $match['target'], $match['params'] ); 
    } else {
        header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
    }
