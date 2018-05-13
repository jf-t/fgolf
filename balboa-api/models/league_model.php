<?php

class League {
    var $id;
    var $name;
    var $commish_id;
    var $roster_id;

    var $num_players;
    var $keeper_amount;

    var $divisions;
    var $conferences;

    function __construct($params) {
        $this->name = $params['name'];
        $this->commish_id = $params['commish_id'];
        $this->roster_id = $params['roster_id'];

        $this->num_players = isset($params['num_players']) ? $params['num_players'] : NULL;
        $this->keeper_amount = isset($params['keeper_amount']) ? $params['keeper_amount'] : NULL;


        $this->conferences = isset($params['conferences']) ? $params['conferences'] : NULL;
        $this->divisions = isset($params['divisions']) ? $params['divisions'] : NULL;


        $this->id = isset($params['id']) ? $params['id'] : NULL;

    }

    public function __get($value) {
        switch($value) {
            case 'id': return $this->id;
            case 'name': return $this->name;
            case 'commish_id': return $this->commish_id;
            case 'roster_id': return $this->roster_id;
            case 'conferences': return $this->conferences;
            case 'divisions': return $this->divisions;
        }
    }

    public function getNumTeams() {
        return LeagueController::getNumTeams($this->id);
    }
}


 ?>
