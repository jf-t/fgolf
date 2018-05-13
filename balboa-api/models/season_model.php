<?php

class Season {
    var $id;
    var $league_id;
    var $num_games;
    var $active;

    function __construct($params) {
        $this->league_id = $params['league_id'];
        $this->num_games = $params['num_games'];

        $this->active = isset($params['active']) ? $params['active'] : NULL;

        $this->id = isset($params['id']) ? $params['id'] : NULL;
    }

    // The format of num_games should be:
    //      [total_games,  games_outside, games_in_conference, games_in_division]


}

?>
