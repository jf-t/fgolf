<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// This should allow CORS for my own testing
$app->add(function(Request $request, Response $response, $next) {
    $route = $request->getAttribute("route");

    $methods = [];

    if (!empty($route)) {
        $pattern = $route->getPattern();

        foreach ($this->router->getRoutes() as $route) {
            if ($pattern === $route->getPattern()) {
                $methods = array_merge_recursive($methods, $route->getMethods());
            }
        }
        //Methods holds all of the HTTP Verbs that a particular route handles.
    } else {
        $methods[] = $request->getHeaderLine('Access-Control-Request-Method');
    }

    $response = $next($request, $response);


    $response = $response->withHeader("Access-Control-Allow-Methods", implode(",", $methods));
    $response = $response->withHeader("Access-Control-Allow-Headers", 'Content-Type');

    return $response;
});



// Seed data route

$app->post('/seed', function (Request $request, Response $response, $args) {

    $message = SeedController::seed($this->db);

    $new_response = $response->withJSON($message);

    return $new_response;
});


?>
