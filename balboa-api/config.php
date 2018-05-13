<?php
function config () {
    $config['displayErrorDetails'] = true;
    $config['addContentLengthHeader'] = false;

    $config['db']['host']   = "localhost";
    $config['db']['user']   = "jackfintan";
    $config['db']['pass']   = "password";
    $config['db']['dbname'] = "balboa_dev";

    return $config;
}


function containerAdditions($container) {
    $container['logger'] = function($c) {
        $logger = new \Monolog\Logger('my_logger');
        $file_handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
        $logger->pushHandler($file_handler);
        return $logger;
    };

    $container['db'] = function ($c) {
        $db = $c['settings']['db'];
        $pdo = new PDO("pgsql:host=" . $db['host'] . ";dbname=" . $db['dbname'],
            $db['user'], $db['pass']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    };

    return $container;
}


 ?>
