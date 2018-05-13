<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once '../controllers/all.php';
require_once '../models/all.php';


require '../../../vendor/autoload.php';

require('../config.php'); // gets config function
$app = new \Slim\App(["settings" => config()]);

$container = containerAdditions($app->getContainer());


// ROUTES
require('../routes/general.php');
require('../routes/user_routes.php');
require('../routes/league_routes.php');
require('../routes/roster_routes.php');
require('../routes/draft_routes.php');


$app->run();
