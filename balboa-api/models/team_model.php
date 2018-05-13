<?php


class Team {
    var $id;
    var $name;
    var $account_id;
    var $league_id;
    var $wins;
    var $losses;
    var $rings;
    var $ppg;
    var $oppg;
    var $power_rank;

    function __construct($params) {

        // add checks to make sure everythings good

        $this->name = $params['name'];
        $this->account_id = $params['account_id'];
        $this->league_id = $params['league_id'];

        if (isset($params['wins'])) {
            $this->wins = $params['wins'];
        } else { $this->wins = 0; }
        if (isset($params['losses'])) {
            $this->losses = $params['losses'];
        } else { $this->losses = 0; }
        if (isset($params['rings'])) {
            $this->rings = $params['rings'];
        } else { $this->rings = 0; }
        if (isset($params['ppg'])) {
            $this->ppg = $params['oppg'];
        } else { $this->ppg = 0; }
        if (isset($params['oppg'])) {
            $this->oppg = $params['oppg'];
        } else { $this->oppg = 0; }
        if (isset($params['power_rank'])) {
            $this->power_rank = $params['power_rank'];
        } else { $this->power_rank = 0; }

    }

    public function getName() {
        return $this->name;
    }

    public function getAccountId() {
        return $this->account_id;
    }

    public function getLeagueId() {
        return $this->league_id;
    }

    public function getWins() {
        return $this->wins;
    }

    public function getLosses() {
        return $this->losses;
    }

    public function getRings() {
        return $this->rings;
    }

    public function getPPG() {
        return $this->ppg;
    }

    public function getOPPG() {
        return $this->oppg;
    }

    public function getPowerRank() {
        return $this->power_rank;
    }

}

 ?>
