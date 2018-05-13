<?php

require_once '../controllers/app_controller.php';


class UserController extends AppController {
    static function create($db, User $user) {
        $sql = 'insert into account
                    (username, pw_hash, email)
                values
                    (:username, :pw_hash, :email)
                returning *';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'username' => $user->getUsername(),
            'pw_hash' => $user->getPwHash(),
            'email' => $user->getEmail()
        ]);

        if ($result) {
            $data = $cnct->fetch();

            return $data;
        } else {
            return 'INVALID USER';
        }
    }

    static function signIn($db, $params) {
        $username = $params['username'];
        $pw_hash = $params['pw_hash'];

        $sql = 'select *
                from account
                where username = :username';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'username' => $username
        ]);

        if ($result) {
            $db_user = $cnct->fetch();
            $db_user_pw = $db_user['pw_hash'];

            if ($pw_hash == $db_user_pw) {
                $user = new User($db_user);
                $user->session_token = UserController::resetSessionToken($db, $user->getId());

                $data = $user->authBody();
                return $data;
            } else {
                return array('message' => 'Something went wrong');
            }
        }
    }

    static function signOut($db, $user_id) {
        $sql = '
            update
                account
            set
                session_token = NULL
            where
                id = :id
            returning
                *
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'id' => $user_id
        ]);

        if ($result) {
            $data = $cnct->fetch();

            return $data;
        } else {
            return array('message' => 'Something went wrong when signing out');
        }
    }

    static function resetSessionToken($db, $id) {
        $sql = 'update account
                set session_token = :session_token
                where id = :id';

        $cnct = $db->prepare($sql);

        $session_token = uniqid();

        $result = $cnct->execute([
            'id' => $id,
            'session_token' => $session_token
        ]);

        return $session_token;
    }


    static function getUserLeagues($db, $id) {
        $sql = '
            select
                *
            from
                league
            where
                commish_id = :id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'id' => $id
        ]);

        if ($result) {
            $leagues = [];
            while($data = $cnct->fetch()) {
                $leagues[] = $data;
            }

            return $leagues;
        }
    }

}
 ?>
