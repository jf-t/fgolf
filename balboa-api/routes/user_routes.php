<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

function app_headers($response) {
    $new_response = $response;


    $new_response = $new_response->withHeader('Access-Control-Allow-Headers', 'Content-Type');

    return $new_response;
}


$app->post('/user', function (Request $request, Response $response) {
    $data = $request->getParsedBody();

    $params = [
        'username' => $data['username'],
        'pw_hash' => crypt($data['password'], 'ABC123456789DEFGHI'),
        'email' => $data['email']
    ];

    $user = new User($params);

    $first_message = UserController::create($this->db, $user);

    $loginParams = [
        'username' => $first_message['username'],
        'pw_hash' => $first_message['pw_hash']
    ];

    $message = UserController::signIn($this->db, $loginParams);

    $new_response = $response->withJSON($message);

    return $new_response;
});


$app->post('/auth', function (Request $request, Response $response) {
    $data = $request->getParsedBody();

    $params = [
        'username' => $data['username'],
        'pw_hash' => crypt($data['password'], 'ABC123456789DEFGHI')
    ];

    $message = UserController::signIn($this->db, $params);

    // if (gettype($message) === 'array') {
    //     $invalid_creds = array('error' => 'Invalid Username/Password');
    //
    //     $new_response = $response->withJSON($invalid_creds)->withStatus(400);
    // } else {
    // }
    $new_response = $response->withJSON($message);

    return $new_response;

});


$app->get('/user/{user_id}/leagues', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $message = UserController::getUserLeagues($this->db, $args['user_id']);

    $new_response = $response->withJSON($message);

    return $new_response;
});


$app->delete('/user/{user_id}/logout', function (Request $request, Response $response, $args){
    $data = $request->getParsedBody();

    $message = UserController::signOut($this->db, $args['user_id']);

    $new_response = $response->withJSON($message);

    return $new_response;
});


?>
