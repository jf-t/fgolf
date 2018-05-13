<?php

abstract class AppController {
    protected $db;

    public function __construct($db) {
        $this->db = $db;
    }
}

 ?>
