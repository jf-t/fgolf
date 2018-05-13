<?php


use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/league/{league_id}', function (Request $request, Response $response, $args) {
    $message = LeagueController::getLeague($this->db, $args['league_id']);

    $new_response = $response->withJSON($message);

    return $new_response;
});


$app->get('/league/{league_id}/users', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $params = [
        'league_id' => $args['league_id']
    ];

    $message = LeagueController::getLeagueUsers($this->db, $params);

    $enroll_params = [
        'account_id' => $message['id'],
        'league_id' => $args['league_id']
    ];

    LeagueController::enrollUser($this->db, $enroll_params);
    $new_response = $response->withJSON($message);

    return $new_response;
});

$app->get('/league/{league_id}/teams', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $message = LeagueController::getTeams($this->db, $args['league_id']);

    $new_response = $response->withJSON($message);

    $new_response = app_headers($new_response);

    return $new_response;
});

$app->get('/league/{league_id}/user_team/{user_id}', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $message = LeagueController::getUserTeam($this->db, $args['league_id'], $args['user_id']);

    $new_response = $response->withJSON($message);

    return $new_response;
});

$app->get('/league/{league_id}/team/{team_id}', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $message = LeagueController::getTeam($this->db, $args['team_id']);

    $new_response = $response->withJSON($message);

    return $new_response;
});

$app->get('/league/{league_id}/team/{team_id}/players', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $message = LeagueController::getTeamPlayers($this->db, $args['team_id']);

    $new_response = $response->withJSON($message);

    return $new_response;
});

$app->get('/league/{league_id}/players', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $message = LeagueController::getPlayers($this->db, $args['league_id']);

    $new_response = $response->withJSON($message);

    return $new_response;
});






$app->post('/league', function (Request $request, Response $response) {
    $data = $request->getParsedBody();

    $params = [
        'name' => $data['name'],
        'commish_id' => $data['commish_id'],
        'roster_id' => $data['roster_id']
    ];

    $league = new League($params);
    $id = LeagueController::create($this->db, $league);

    $players = RosterController::getRosterPlayers($this->db, $params['roster_id']);
    $message = LeagueController::fillLeagueRoster($this->db, $players, $id);
    $new_response = $response->withJSON($message);

    return $new_response;
});


// When enroll is done it must go to create team mode.
$app->post('/league/{league_id}/enroll', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $params = [
        'account_id' => $data['account_id'],
        'league_id' => (int)$args['league_id']
    ];

    $message = LeagueController::enrollUser($this->db, $params);


    $new_response = $response->withJSON($message);

    return $new_response;
});


$app->post('/league/{league_id}/team', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $params = [
        'name' => $data['name'],
        'account_id' => $data['account_id'],
        'league_id' => (int)$args['league_id'],
    ];
    $league_account_join_id = LeagueController::getLeagueAccountId($this->db, $params['account_id'], $params['league_id']);

    $team = new Team($params);
    $message = LeagueController::createTeam($this->db, $team->getName(), $league_account_join_id);

    $new_response = $response->withJSON($message);

    return $new_response;
});


$app->post('/league/{league_id}/season', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $params = [
        'num_games' => (isset($data['num_games']) ? $data['num_games'] : NULL),
        'active' => (isset($datt['active']) ? $datt['active'] : NULL),
        'league_id' => $args['league_id']
    ];

    $message = LeagueController::createSeason($this->db, $params);

    $new_response = $response->withJSON($message);

    return $new_response;
});




 ?>
