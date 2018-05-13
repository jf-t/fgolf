<?php

class RosterPlayer {
    var $id;
    var $first_name;
    var $middle_initial;
    var $last_name;
    var $player_number;
    var $roster_id;
    var $roster_team_id;
    var $height_feet;
    var $height_inches;
    var $weight;
    var $position;
    var $secondary_position;
    var $image_url;
    var $country;
    var $college;

    var $overall;
    var $inside;
    var $midrange;
    var $three_point;
    var $handling;
    var $passing;
    var $speed;
    var $agility;
    var $free_throw;
    var $stamina;
    var $rebounding;
    var $offensive_rebounding;
    var $perimeter_defense;
    var $paint_defense;
    var $block;
    var $steal;
    var $potential;


    function __construct($params) {
        $this->first_name = $params['first_name'];
        $this->middle_initial = isset($params['middle_initial']) ? $params['middle_initial'] : NULL;
        $this->last_name = $params['last_name'];

        $this->player_number = (int)isset($params['player_number']) ? $params['player_number'] : NULL;
        $this->roster_id = (int)isset($params['roster_id']) ? $params['roster_id'] : NULL;
        $this->roster_team_id = (int)isset($params['roster_team_id']) ? $params['roster_team_id'] : NULL;
        ;
        $this->height_feet = (int)isset($params['height_feet']) ? $params['height_feet'] : NULL;
        $this->height_inches = (int)isset($params['height_inches']) ? $params['height_inches'] : NULL;
        $this->weight = (int)isset($params['weight']) ? $params['weight'] : NULL;

        $this->position = (int)isset($params['position']) ? $params['position'] : NULL;
        $this->secondary_position = isset($parahms['secondary_position']) ? (int)$pajrams['secondary_position'] : NULL;

        $this->country = isset($params['country']) ? $params['country'] : NULL;
        $this->college = isset($params['college']) ? $params['college'] : NULL;

        $this->image_url = isset($params['image_url']) ? $params['image_url'] : NULL;


        $this->overall = isset($params['overall']) ? $params['overall'] : NULL;

        $this->inside = isset($params['inside']) ? $params['inside'] : NULL;
        $this->midrange = isset($params['midrange']) ? $params['midrange'] : NULL;
        $this->three_point = isset($params['three_point']) ? $params['three_point'] : NULL;
        $this->handling = isset($params['handling']) ? $params['handling'] : NULL;
        $this->passing = isset($params['passing']) ? $params['passing'] : NULL;
        $this->speed = isset($params['speed']) ? $params['speed'] : NULL;
        $this->agility = isset($params['agility']) ? $params['agility'] : NULL;
        $this->free_throw = isset($params['free_throw']) ? $params['free_throw'] : NULL;
        $this->stamina = isset($params['stamina']) ? $params['stamina'] : NULL;
        $this->rebounding = isset($params['rebounding']) ? $params['rebounding'] : NULL;
        $this->offensive_rebounding = isset($params['offensive_rebounding']) ? $params['offensive_rebounding'] : NULL;
        $this->perimeter_defense = isset($params['perimeter_defense']) ? $params['perimeter_defense'] : NULL;
        $this->paint_defense = isset($params['paint_defense']) ? $params['paint_defense'] : NULL;
        $this->block = isset($params['block']) ? $params['block'] : NULL;
        $this->steal = isset($params['steal']) ? $params['steal'] : NULL;
        $this->potential = isset($params['potential']) ? $params['potential'] : NULL;


        if (isset($params['id'])) {
            $this->id = (int)$params['id'];
        }
    }

    public function __get($value) {
        switch($value) {
            case 'first_name': return $this->first_name;
            case 'middle_initial': return $this->middle_initial;
            case 'last_name': return $this->last_name;
            case 'player_number': return $this->player_number;
            case 'roster_id': return $this->roster_id;
            case 'roster_team_id': return $this->roster_team_id;
            case 'height_feet': return $this->height_feet;
            case 'height_inches': return $this->height_inches;
            case 'country': return $this->country;
            case 'college': return $this->college;
            case 'weight': return $this->weight;
            case 'position': return $this->position;
            case 'secondary_position': return $this->secondary_position;
            case 'image_url': return $this->image_url;

            case 'inside': return $this->inside;
            case 'midrange': return $this->midrange;
            case 'three_point': return $this->three_point;
            case 'handling': return $this->handling;
            case 'passing': return $this->passing;
            case 'speed': return $this->speed;
            case 'agility': return $this->agility;
            case 'free_throw': return $this->free_throw;
            case 'stamina': return $this->stamina;
            case 'rebounding': return $this->rebounding;
            case 'offensive_rebounding': return $this->offensive_rebounding;
            case 'perimeter_defense': return $this->perimeter_defense;
            case 'paint_defense': return $this->paint_defense;
            case 'block': return $this->block;
            case 'steal': return $this->steal;
            case 'potential': return $this->potential;
        }
    }

    public function addAttributes($attributes) {
        $this->overall = (isset($attributes['overall']) ? $attributes['overall'] : $this->overall);
        $this->inside = (isset($attributes['inside']) ? $attributes['inside'] : $this->inside);
        $this->midrange = (isset($attributes['midrange']) ? $attributes['midrange'] : $this->midrange);
        $this->three_point = (isset($attributes['three_point']) ? $attributes['three_point'] : $this->threePoint);
        $this->handling = (isset($attributes['handling']) ? $attributes['handling'] : $this->handling);
        $this->passing = (isset($attributes['passing']) ? $attributes['passing'] : $this->passing);
        $this->speed = (isset($attributes['speed']) ? $attributes['speed'] : $this->speed);
        $this->agility = (isset($attributes['agility']) ? $attributes['agility'] : $this->agility);
        $this->free_throw = (isset($attributes['free_throw']) ? $attributes['free_throw'] : $this->free_throw);
        $this->stamina = (isset($attributes['stamina']) ? $attributes['stamina'] : $this->stamina);
        $this->rebounding = (isset($attributes['rebounding']) ? $attributes['rebounding'] : $this->rebounding);
        $this->offensive_rebounding = (isset($attributes['offensive_rebounding']) ? $attributes['offensive_rebounding'] : $this->offensiveRebounding);
        $this->perimeter_defense = (isset($attributes['perimeter_defense']) ? $attributes['perimeter_defense'] : $this->perimeterDefense);
        $this->paint_defense = (isset($attributes['paint_defense']) ? $attributes['paint_defense'] : $this->paintDefense);
        $this->block = (isset($attributes['block']) ? $attributes['block'] : $this->block);
        $this->steal = (isset($attributes['steal']) ? $attributes['steal'] : $this->steal);
        $this->potential = (isset($attributes['potential']) ? $attributes['potential'] : $this->potential);
    }
}

 ?>
