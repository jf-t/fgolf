<?php

class Roster {
    var $id;
    var $name;
    var $author_id;

    function __construct($params) {
        // var_dump($params);
        $this->name = $params['name'];
        $this->author_id = $params['author_id'];


        if (isset($params['roster_id'])) {
            $this->id = $parmas['roster_id'];
        }
    }

    function getId() {
        return $this->id;
    }

    function getName() {
        return $this->name;
    }

    function getAuthorId() {
        return $this->author_id;
    }
}

 ?>
