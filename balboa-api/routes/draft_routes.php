<?php


use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


$app->post('/league/{league_id}/draft', function(Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $params = [
        'year' => $data['year'],
        'league_id' => $args['league_id']
    ];

    $message = DraftController::create($this->db, $params);

    $new_response = $response->withJSON($message);

    return $new_response;
});

$app->get('/draft/{draft_id}', function(Request $request, Response $response, $args) {
    $message = DraftController::get($this->db, $args['draft_id']);

    $new_response = $response->withJSON($message);

    return $new_response;
});

$app->get('/league/{league_id}/open_drafts', function(Request $request, Response $response, $args) {
    $message = DraftController::getOpenDrafts($this->db, $args['league_id']);

    $new_response = $response->withJSON($message);

    return $new_response;
});

$app->get('/league/{league_id}/drafts', function(Request $request, Response $response, $args) {
    $message = DraftController::getLeagueDrafts($this->db, $args['league_id']);

    $new_response = $response->withJSON($message);

    return $new_response;
});

$app->post('/draft/{draft_id}/select', function(Request $request, Response $response, $args) {
    $data = $request->getParsedBody();

    $params = [
        'draft_id' => $args['draft_id'],
        'player_id' => $data['player_id'],
        'team_id' => $data['team_id'],
        'round' => isset($data['round']) ? $data['round'] : NULL,
        'pos' => isset($data['pos']) ? $data['pos'] : NULL
    ];

    if ((!isset($params['pos'])) || (!isset($params['round']))) {
        $current_pick = DraftController::getCurrentPick($this->db, $params['draft_id']);

        $params['pos'] = $current_pick['pos'];
        $params['round'] = $current_pick['round'];
    }

    $message = DraftController::draftPlayer($this->db, $params);

    $new_response = $response->withJSON($message);

    return $new_response;
});

 ?>
