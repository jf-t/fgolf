<?php


require_once '../controllers/app_controller.php';


class RosterController extends AppController {
    // Need to make RosterController accept divisions and conferences
    static function create($db, Roster $roster) {
        $sql = '
            insert into roster
                (name, author_id)
            values
                (:name, :author_id)
            returning *
        ';

        $cnct = $db->prepare($sql);
        $result = $cnct->execute([
            'name' => $roster->getName(),
            'author_id' => $roster->getAuthorId()
        ]);

        if ($result) {
            $data = $cnct->fetch();

            return $data;
        }
    }

    static function addPlayer($db, RosterPlayer $player) {
        $sql = '
            insert into roster_player
                (first_name, middle_initial, last_name, player_number,
                 roster_id, roster_team_id, height_feet, height_inches,
                 weight, position, college, country, secondary_position, image_url)
            values
                (:first_name, :middle_initial, :last_name, :player_number,
                 :roster_id, :roster_team_id, :height_feet, :height_inches,
                 :weight, :position, :college, :country, :secondary_position, :image_url)
            returning *
        ';

        $cnct = $db->prepare($sql);

        $secondary_position = $player->secondary_position ? $player->secondary_position : null;

        $result = $cnct->execute([
            'first_name' => $player->first_name,
            'middle_initial' => $player->middle_initial,
            'last_name' => $player->last_name,
            'player_number' => $player->player_number,
            'roster_id' => $player->roster_id,
            'roster_team_id' => $player->roster_team_id,
            'height_feet' => $player->height_feet,
            'height_inches' => $player->height_inches,
            'weight' => $player->weight,
            'position' => $player->position,
            'college' => $player->college,
            'country' => $player->country,
            'secondary_position' => $secondary_position,
            'image_url' => $player->image_url
        ]);

        if ($result) {
            $data = $cnct->fetch();

            return $data;
        } else {
            return array('message' => 'There was an error!!!!');
        }
    }

    static function updatePlayerAttributes($db, RosterPlayer $player) {
        $sql = '
            update roster_player
            set
                first_name = :first_name,
                middle_initial = :middle_initial,
                last_name = :last_name,
                player_number = :player_number,
                roster_id = :roster_id,
                roster_team_id = :roster_team_id,
                height_feet = :height_feet,
                height_inches = :height_inches,
                weight = :weight,
                position = :position,
                college = :college,
                country = :country,
                secondary_position = :secondary_position,
                image_url = :image_url,

                overall = :overall,
                inside = :inside,
                midrange = :midrange,
                three_point = :three_point,
                handling = :handling,
                passing = :passing,
                speed = :speed,
                agility = :agility,
                free_throw = :free_throw,
                stamina = :stamina,
                rebounding = :rebounding,
                offensive_rebounding = :offensive_rebounding,
                perimeter_defense = :perimeter_defense,
                paint_defense = :paint_defense,
                block = :block,
                steal = :steal,
                potential = :potential

            where
                id = :player_id
            returning *
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'first_name' => $player->first_name,
            'middle_initial' => $player->middle_initial,
            'last_name' => $player->last_name,
            'player_number' => $player->player_number,
            'roster_id' => $player->roster_id,
            'roster_team_id' => $player->roster_team_id,
            'height_feet' => $player->height_feet,
            'height_inches' => $player->height_inches,
            'weight' => $player->weight,
            'position' => $player->position,
            'college' => $player->college,
            'country' => $player->country,
            'secondary_position' => $player->secondary_position,
            'image_url' => $player->image_url,
            'player_id' => $player->id,

            'overall' => $player->overall,
            'inside' => $player->inside,
            'midrange' => $player->midrange,
            'three_point' => $player->three_point,
            'handling' => $player->handling,
            'passing' => $player->passing,
            'speed' => $player->speed,
            'agility' => $player->agility,
            'free_throw' => $player->free_throw,
            'stamina' => $player->stamina,
            'rebounding' => $player->rebounding,
            'offensive_rebounding' => $player->offensive_rebounding,
            'perimeter_defense' => $player->perimeter_defense,
            'paint_defense' => $player->paint_defense,
            'block' => $player->block,
            'steal' => $player->steal,
            'potential' => $player->potential
        ]);

        if ($result) {
            $data = $cnct->fetch();

            return $data;
        } else {
            return array('message' => 'There was an error!!!!');
        }
    }

    static function getRoster($db, $id) {
        $sql = '
            select
                roster.*
            from
                roster
            where
                roster.id = :id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'id' => $id
        ]);

        if ($result) {
            $roster = $cnct->fetch();

            $roster['teams'] = self::getRosterTeams($db, $id);

            return $roster;
        } else {
            return array('message' => 'There was an error!!!');
        }
    }


    static function createTeam($db, RosterTeam $team) {
        $sql = '
            insert into roster_team
                (city, name, conf, div, roster_id)
            values
                (:city, :name, :conf, :div, :roster_id)
            returning *
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'city' => $team->city,
            'name' => $team->name,
            'conf' => $team->conf,
            'div' => $team->div,
            'roster_id' => $team->roster_id
        ]);

        if ($result) {
            $data = $cnct->fetch();

            return $data;
        } else {
            return array('message' => 'There was an error!!!');
        }
    }

    static function getRosterTeams($db, $roster_id) {
        $sql = '
            select
                *
            from
                roster_team
            where
                roster_team.roster_id = :roster_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'roster_id' => $roster_id
        ]);

        if ($result) {
            $roster_teams = [];
            while ($data = $cnct->fetch()) {
                $roster_teams[] = $data;
            }

            return $roster_teams;
        } else {
            return array('message' => 'There was an error!!!');
        }
    }

    static function getRosterAuthor($db, $id) {
        $sql = '
            select
                (username, email)
            from
                account
            join
                roster
            on
                roster.author_id = account.id
            where
                roster.id = :id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'id' => $id
        ]);

        if ($result) {
            $data = $cnct->fetch();

            return $data;
        } else {
            return array('message' => 'There was an error!!!');
        }
    }

    static function getRosterPlayers($db, $id) {
        $sql = '
            select
                *
            from
                roster_player
            where
                roster_id = :roster_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'roster_id' => $id
        ]);

        if ($result) {
            $players = [];
            while($data = $cnct->fetch()) {
                $players[] = $data;
            }

            return $players;
        } else {
            return array('message' => 'There was an error!!!');
        }
    }

    static function isPlayerInRoster($db, $roster_id, $player_id) {
        $sql = '
            select
                COUNT(*)
            from
                roster_player
            where
                roster_player.id = :player_id AND roster_player.roster_id = :roster_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'roster_id' => $roster_id,
            'player_id' => $player_id
        ]);

        if ($result) {
            $count = $cnct->fetch();

            if ($count > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }


    static function getRosterPlayer($db, $player_id) {
        $sql = '
            select
                *
            from
                roster_player
            where
                id = :player_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'player_id' => $player_id
        ]);

        if ($result) {
            $player = $cnct->fetch();

            return $player;
        } else {
            return array('message' => 'There was an error!!!');
        }
    }

    static function getRostersByAuthor($db, $author_id) {
        $sql = '
            select
                *
            from
                roster
            where
                roster.author_id = :author_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'author_id' => $author_id
        ]);

        if ($result) {
            $rosters = [];
            while($data=$cnct->fetch()) {
                $rosters[] = $data;
            }

            return $rosters;
        } else {
            return array('message' => 'There was an error!!!');
        }
    }

    static function isTeamInRoster($db, $roster_id, $team_id) {
        $sql = '
            select
                COUNT(*)
            from
                roster_team
            join
                roster
            on
                roster.id = roster_team.roster_id
            where
                roster_team.id = :team_id AND roster.id = :roster_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'roster_id' => $roster_id,
            'team_id' => $team_id
        ]);

        if ($result) {
            $teams = $cnct->fetch();

            return $teams;
        } else {
            return array('message' => 'There was an error!!!');
        }
    }

    static function getRosterTeam($db, $team_id) {
        $sql = '
            select
                *
            from
                roster_team
            where
                roster_team.id = :team_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'team_id' => $team_id
        ]);

        if ($result) {
            $roster_team = $cnct->fetch();

            $roster_team['players'] = self::getRosterTeamPlayers($db, $team_id);

            return $roster_team;
        } else {
            return array('message' => 'There was an error!!!');
        }
    }


    static function getRosterTeamPlayers($db, $team_id) {
        $sql = '
            select
                *
            from
                roster_player
            where
                roster_player.roster_team_id = :team_id
        ';

        $cnct = $db->prepare($sql);

        $result = $cnct->execute([
            'team_id' => $team_id
        ]);

        if ($result) {
            $players = [];
            while ($data = $cnct->fetch()) {
                $players[] = $data;
            }

            return $players;
        } else {
            return array('message' => 'There was an error!!!');
        }
    }

}

 ?>
