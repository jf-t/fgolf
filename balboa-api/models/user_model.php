<?php

class User {
    var $id;
    var $username;
    var $pw_hash;
    var $session_token;

    var $email_address;

    function __construct($params) {
        $this->username = $params['username'];
        $this->pw_hash = $params['pw_hash'];

        $this->email_address = $params['email'];

        // Can be set after created
        if (array_key_exists('id', $params)) {
            $this->id = $params['id'];
        }
    }

    function getId() {
        return $this->id;
    }

    function getUsername() {
        return $this->username;
    }

    function getPwHash() {
        return $this->pw_hash;
    }

    function getSessionToken() {
        return $this->session_token;
    }

    function getEmail() {
        return $this->email_address;
    }

    function authBody() {
        return array(
            'id' => $this->id,
            'username' => $this->username,
            'session_token' => $this->session_token,
            'email' => $this->email_address
        );
    }
}

 ?>
