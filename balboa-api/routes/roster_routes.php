<?php


use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


$app->post('/roster', function (Request $request, Response $response) {
    $data = $request->getParsedBody();

    $params = [
        'name' => $data['name'],
        'author_id' => $data['author_id'],
    ];

    $roster = new Roster($params);
    $message = RosterController::create($this->db, $roster);


    $new_response = $response->withJSON($message);
    return $new_response;
});


$app->get('/roster/{roster_id}', function (Request $request, Response $response, $args) {
    $message = RosterController::getRoster($this->db, $args['roster_id']);


    $new_response = $response->withJSON($message);
    return $new_response;
});


$app->get('/roster/{roster_id}/teams', function (Request $request, Response $response, $args) {
    $message = RosterController::getRosterTeams($this->db, $args['roster_id']);


    $new_response = $response->withJSON($message);
    return $new_response;
});

$app->get('/roster/{roster_id}/teams/{team_id}', function (Request $request, Response $response, $args) {
    if (RosterController::isTeamInRoster($this->db, $args['roster_id'], $args['team_id'])) {
        $message = RosterController::getRosterTeam($this->db, $args['team_id']);
    } else {
        $message = array('message' => 'There is no team with that ID in that roster');
    }

    $new_response = $response->withJSON($message);
    return $new_response;
});


$app->get('/roster/{roster_id}/players', function (Request $request, Response $response, $args) {
    $message = RosterController::getRosterPlayers($this->db, $args['roster_id']);

    $new_response = $response->withJSON($message);

    return $new_response;
});

$app->get('/roster/{roster_id}/players/{player_id}', function (Request $request, Response $response, $args) {
    if (RosterController::isPlayerInRoster($this->db, $args['roster_id'], $args['player_id'])) {
        $message = RosterController::getRosterPlayer($this->db, $args['player_id']);
    } else {
        $message = array('message' => 'There is no player with that ID in that roster');
    }

    $new_response = $response->withJSON($message);

    return $new_response;
});



$app->get('/rosters', function (Request $request, Response $response) {
    $author_id = $request->getQueryParam('user_id');

    $message = RosterController::getRostersByAuthor($this->db, $author_id);

    $new_response = $response->withJSON($message);

    return $new_response;


    return $response;
});



$app->post('/roster/{roster_id}/team', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $params = [
        'city' => $data['city'],
        'name' => $data['name'],
        'roster_id' => $args['roster_id'],
        'conf' => $data['conf'],
        'div' => $data['div']
    ];

    $team = new RosterTeam($params);
    $message = RosterController::createTeam($this->db, $team);


    $new_response = $response->withJSON($message);
    return $new_response;
});





$app->post('/roster/{roster_id}/player', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();


    $params = [
        'first_name' => $data['first_name'],
        'middle_initial' => isset($data['middle_initial']) ? $data['middle_initial'] : '',
        'last_name' => $data['last_name'],
        'player_number' => $data['player_number'],
        'roster_id' => $args['roster_id'],
        'roster_team_id' => isset($data['roster_team_id']) ? $data['roster_team_id'] : '',
        'height_feet' => isset($data['height_feet']) ? $data['height_feet'] : 0,
        'height_inches' => isset($data['height_inches']) ? $data['height_inches'] : 0,
        'weight' => isset($data['weight']) ? $data['weight'] : 0,
        'position' => isset($data['position']) ? $data['position'] : 0,
        'secondary_position' => isset($data['secondary_position']) ? $data['secondary_position'] : '',
        'country' => isset($data['country']) ? $data['country'] : '',
        'college' => isset($data['college']) ? $data['college'] : '',
        'image_url' => isset($data['image_url']) ? $data['image_url'] : ''
    ];


    $player = new RosterPlayer($params);

    $message = RosterController::addPlayer($this->db, $player);


    $new_response = $response->withJSON($message);
    return $new_response;
});



$app->put('/roster/{roster_id}/player/{player_id}', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $params = [
        'overall' => isset($data['overall']) ? $data['overall'] : NULL,
        'three_point' => isset($data['threePoint']) ? $data['threePoint'] : NULL,
        'midrange' => isset($data['midrange']) ? $data['midrange'] : NULL,
        'inside' => isset($data['inside']) ? $data['inside'] : NULL,
        'speed' => isset($data['speed']) ? $data['speed'] : NULL,
        'offensive_rebounding' => isset($data['offensiveRebounding']) ? $data['offensiveRebounding'] : NULL,
        'passing' => isset($data['passing']) ? $data['passing'] : NULL,
        'handling' => isset($data['handling']) ? $data['handling'] : NULL,

        'perimeter_defense' => isset($data['perimeterDefense']) ? $data['perimeterDefense'] : NULL,
        'paint_defense' => isset($data['paintDefense']) ? $data['paintDefense'] : NULL,
        'steal' => isset($data['steal']) ? $data['steal'] : NULL,
        'block' => isset($data['block']) ? $data['block'] : NULL,
        'rebounding' => isset($data['rebounding']) ? $data['rebounding'] : NULL,

        'free_throw' => isset($data['freeThrow']) ? $data['freeThrow'] : NULL,
        'stamina' => isset($data['stamina']) ? $data['stamina'] : NULL,
        'agility' => isset($data['agility']) ? $data['agility'] : NULL,
        'potential' => isset($data['potential']) ? $data['potential'] : NULL
    ];

    $player_params = RosterController::getRosterPlayer($this->db, $args['player_id']);

    $player = new RosterPlayer($player_params);



    if (isset($player_params['message'])) {
        $message = $player['message'];
    } else {
        $player = new RosterPlayer($player_params);

        $player->addAttributes($params);
        $message = RosterController::updatePlayerAttributes($this->db, $player);
    }


    $new_response = $response->withJSON($message);
    return $new_response;
});



$app->get('/roster/{roster_id}/author', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $message = RosterController::getRosterAuthor($this->db, $args['roster_id']);


    $new_response = $response->withJSON($message);
    return $new_response;
});

 ?>
