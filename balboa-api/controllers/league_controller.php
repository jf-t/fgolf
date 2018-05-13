<?php

require_once '../controllers/app_controller.php';


class LeagueController extends AppController {
    static function create($db, League $league) {
        $sql = '
            insert into league
                (name, commish_id, roster_id)
            values
                (:name, :commish_id, :roster_id)
            returning id
        ';


        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'name' => $league->getName(),
            'commish_id' => $league->getCommishId(),
            'roster_id' => $league->getRosterId()
        ]);

        if ($result) {
            $data = $cnct->fetch();

            return $data['id'];
        }
    }



    static function enrollUser($db, $params) {
        $sql = '
            insert into league_account_join
                (account_id, league_id)
            values
                (:account_id, :league_id)
            returning
                *
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'account_id' => $params['account_id'],
            'league_id' => $params['league_id']
        ]);

        if ($result) {
            $data = $cnct->fetch();

            return $data;
        } else {
            return array('message' => 'I think It DIDNT work!');
        }
    }

    static function getLeagueAccountId($db, $account_id, $league_id) {
        $sql = '
            select
                id
            from
                league_account_join
            where
                league_id = :league_id AND account_id = :account_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'league_id' => $league_id,
            'account_id' => $account_id
        ]);

        if ($result) {
            $id = $cnct->fetch();


            return $id['id'];
        } else {
            return array('message' => 'GET league_account_join_id didnt work');
        }
    }



    static function createTeam($db, $name, $league_account_join_id) {
        $sql = '
            insert into team
                (name, league_account_join_id)
            values
                (:name, :league_account_join_id)
            returning *
        ';



        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'name' => $name,
            'league_account_join_id' => $league_account_join_id
        ]);

        if ($result) {
            $data = $cnct->fetch();

            return $data;
        } else {
            return array('message' => 'POST /league/id/team Didnt work');
        }

    }



    static function getLeague($db, $id) {
        $sql = '
            select
                *
            from
                league
            where
                league.id = :id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'id' => $id
        ]);

        if ($result) {
            $data = $cnct->fetch();

            return $data;
        } else {
            return array('message' => 'GET /league Didnt work');
        }
    }





    static function getLeagueInfo($db, $params) {

    }



    static function getLeagueUsers($db, $params) {
        $sql = '
            select
                account.*
            from
                account
            inner join
                league_account_join
            on
                account.id = league_account_join.account_id
            inner join
                league
            on
                league.id = league_account_join.league_id
            where
                league.id = :league_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'league_id' => $params['league_id']
        ]);

        if ($result) {
            $users = [];
            while ($data = $cnct->fetch()) {
                $users[] = $data;
            }

            return $users;
        } else {
            return array('message' => 'Didnt work');
        }

    }



    static function search($db, $params) {

    }


    static function fillLeagueRoster($db, $players, $league_id) {
        foreach ($players as $player) {
            $sql = '
                insert into player
                    (league_id, roster_player_id)
                values
                    (:league_id, :roster_player_id)
                returning *
            ';

            $cnct = $db->prepare($sql);

            $result = $cnct->execute([
                'league_id' => $league_id,
                'roster_player_id' => $player['id']
            ]);
        }

        unset($player);
    }

    static function getTeams($db, $league_id) {
        $sql = '
            select
                team.*
            from
                team
            join
                league_account_join
            on
                league_account_join.id = team.league_account_join_id
            where
                league_account_join.league_id = :league_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'league_id' => $league_id,
        ]);

        if ($result) {
            $teams = [];
            while($data = $cnct->fetch()) {
                $teams[] = $data;
            }

            return $teams;
        } else {
            return array('message' => 'Didnt work');
        }
    }

    static function getTeam($db, $team_id) {
        $sql = '
            select
                *
            from
                team
            where
                id = :team_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'team_id' => $team_id,
        ]);

        if ($result) {
            $team = $cnct->fetch();

            $team['players'] = self::getTeamPlayers($db, $team['id']);

            return $team;
        } else {
            return array('message' => 'Didnt work');
        }
    }


    static function getTeamPlayers($db, $team_id) {
        $sql = '
            select
                player.*, roster_player.*
            from
                player
            join
                roster_player
            on
                roster_player.id = player.roster_player_id
            where
                player.team_id = :team_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'team_id' => $team_id,
        ]);

        if ($result) {
            $team = [];
            while($data = $cnct->fetch()) {
                $team[] = $data;
            }

            return $team;
        } else {
            return array('message' => 'Didnt work');
        }
    }

    static function getPlayers($db, $league_id) {
        $sql = '
            select
                player.*, roster_player.*
            from
                player
            join
                roster_player
            on
                roster_player.id = player.roster_player_id
            where
                player.league_id = :league_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'league_id' => $league_id,
        ]);

        if ($result) {
            $team = [];
            while($data = $cnct->fetch()) {
                $team[] = $data;
            }

            return $team;
        } else {
            return array('message' => 'Didnt work');
        }
    }


    static function createSeason($db, $params) {
        $sql = '
            insert into season
                (num_games, active, league_id)
            values
                (:num_games, :active, :league_id)
            returning *
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'num_games' => (isset($params['num_games']) ? $params['num_games'] : NULL),
            'active' => (isset($params['active']) ? $params['active'] : NULL),
            'league_id' => $params['league_id']
        ]);

        if ($result) {
            $season = $cnct->fetch();

            return $season;
        }
    }

    static function getUserTeam($db, $league_id, $account_id) {
        $sql = '
            select
                team.*
            from
                team
            join
                league_account_join
            on
                team.league_account_join_id = league_account_join.id
            where
                league_account_join.league_id = :league_id AND
                league_account_join.account_id = :account_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'league_id' => $league_id,
            'account_id' => $account_id
        ]);

        if ($result) {
            $team = $cnct->fetch();
            $team['players'] = self::getTeamPlayers($db, $team['id']);

            return $team;
        }
    }
}
 ?>
