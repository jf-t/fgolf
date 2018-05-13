<?php


class RosterTeam {
    var $id;
    var $city;
    var $name;
    var $conf;
    var $div;
    var $roster_id;


    function __construct($params) {
        $this->city = $params['city'];
        $this->name = $params['name'];
        $this->conf = $params['conf'];
        $this->div = $params['div'];
        $this->roster_id = $params['roster_id'];

        if (isset($params['id'])) {
            $this->id = $params['id'];
        }
    }

    public function __get($var) {
        switch($var) {
            case 'city': return $this->city;
            case 'name': return $this->name;
            case 'conf': return $this->conf;
            case 'div': return $this->div;
            case 'roster_id': return $this->roster_id;
        }
    }
}

 ?>
