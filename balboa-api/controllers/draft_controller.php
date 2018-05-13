<?php

require_once '../controllers/app_controller.php';


class DraftController extends AppController {
    static function create($db, $params) {
        $sql = '
            insert into draft
                (year, league_id)
            values
                (:year, :league_id)
            returning
                *
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'year' => $params['year'],
            'league_id' => $params['league_id']
        ]);

        if ($result) {
            $data = $cnct->fetch();

            return $data;
        } else {
            return array('message' => 'POST /draft Didnt work');
        }
    }

    static function get($db, $id) {
        $sql = '
            select
                draft.*
            from
                draft
            where
                draft.id = :id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'id' => $id
        ]);

        if ($result) {
            $data = $cnct->fetch();

            $data['players'] = self::getDraftPlayers($db, $data['league_id']);
            $data['teams'] = self::getDraftTeams($db, $data['league_id']);
            $data['num_picked'] = self::getNumPicked($db, $id);

            return $data;
        } else {
            return array('message' => 'GET /draft Didnt work');
        }
    }

    static function getDraftPlayers($db, $id) {
        $sql = '
            select
                player.*, roster_player.*, roster_team.name, roster_team.city
            from
                player
            join
                roster_player
            on
                roster_player.id = player.roster_player_id
            join
                roster_team
            on
                roster_team.id = roster_player.roster_team_id
            where
                player.drafted = false AND player.league_id = :id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'id' => $id
        ]);

        if ($result) {
            $players = [];

            while ($data = $cnct->fetch()) {
                $players[] = $data;
            }

            return $players;
        }
    }

    static function getDraftTeams ($db, $league_id) {
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
                league_account_join.league_id = :id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'id' => $league_id
        ]);

        if ($result) {
            $teams = [];

            while ($data = $cnct->fetch()) {
                $teams[] = $data;
            }

            return $teams;
        }
    }

    static function getNumPicked ($db, $id) {
        $sql = '
            select
                COUNT(*)
            from
                player
            where
                drafted = true AND draft_id = :id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'id' => $id
        ]);

        if ($result) {
            return $cnct->fetch()['count'];
        }
    }

    static function getOpenDrafts ($db, $league_id) {
        $sql = '
            select
                draft.id
            from
                draft
            where
                draft.league_id = :id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'id' => $league_id
        ]);

        if ($result) {
            $drafts = [];
            while ($data = $cnct->fetch()) {
                $drafts[] = $data;
            }

            return $drafts;
        } else {
            return array('message' => 'There was an error!!');
        }
    }

    static function getLeagueDrafts($db, $league_id) {
        $sql = '
            select
                *
            from
                draft
            where draft.league_id = :league_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'league_id' => $league_id
        ]);

        if ($result) {
            $drafts = [];
            while ($data = $cnct->fetch()) {
                $drafts[] = $data;
            }

            return $drafts;
        } else {
            return array('message' => 'GET /draft Didnt work');
        }
    }


    static function draftPlayer($db, $params) {
        $sql = '
            update
                player
            set
                drafted = true,
                owned = true,
                draft_id = :draft_id,
                draft_round = :round,
                draft_pos = :pos,
                team_id = :team_id
            where
                id = :player_id
            returning *
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'draft_id' => $params['draft_id'],
            'round' => $params['round'],
            'pos' => $params['pos'],
            'team_id' => $params['team_id'],
            'player_id' => $params['player_id']
        ]);

        if ($result) {
            return $cnct->fetch();
        } else {
            return array('message' => 'Draft Player DIDNT Work!');
        }
    }

    static function getCurrentPick($db, $id) {
        $num_picked = self::getNumPicked($db, $id);

        $draft = self::get($db, $id);
        $league_id = $draft['league_id'];

        $league_teams = LeagueController::getTeams($db, $league_id);
        $num_teams = count($league_teams);

        $pos = ($num_picked % $num_teams) + 1;
        $round = floor($num_picked / $num_teams) + 1;

        return array('pos' => $pos, 'round' => $round);
    }
}

 ?>
