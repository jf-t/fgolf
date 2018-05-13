<?php


require_once '../controllers/app_controller.php';


class SeedController extends AppController {
    public static function seed($db) {
        // seed account
        $signin_params = [
            'username' => 'jtilly',
            'pw_hash' => 'ABRCL9ijBr2LY'
        ];

        // Try to sign on to check if user exists
        $user_params = UserController::signIn($db, $signin_params);


        if ($user_params['message']) // failed


            // Create New User:

            $user_params = [
                'username' => 'jtilly',
                'pw_hash' => 'ABRCL9ijBr2LY',
                'email' => 'jackftilly@gmail.com'
            ];

            $user = new User($user_params);
            $user_message = UserController::create($db, $user);


            if (!$user_message['id']) {
                // error !!!!
                return array('error' => 'User Create Didnt Work');
            } else { /* good to go */ }
        } else {
            // Logged in
            $user = new User($user_params);
        }






        // seed roster

        $roster_params = [
            'name' => 'NBA Roster',
            'author_id' => $user->id
        ];

        $roster = new Roster($roster_params);

        $roster_message = RosterController::create($db, $roster);

        if (!$roster_message['id']) {
            // error !!!!
            return array('error' => 'Roster Create Didnt Work');
        } else { /* good to go */ }

        // seed roster_team by looping
        // this is where it gets tough
        $teams = [
            [
                'city' => 'Atlanta',
                'name' => 'Hawks',
                'conf' => 1,
                'div' => 3,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersATL.json',
            ],
            [
                'city' => 'Boston',
                'name' => 'Celtics',
                'conf' => 1,
                'div' => 1,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersBOS.json',
            ],
            [
                'city' => 'Brooklyn',
                'name' => 'Nets',
                'conf' => 1,
                'div' => 1,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersBRK.json',
            ],
            [
                'city' => 'Charlotte',
                'name' => 'Hornets',
                'conf' => 1,
                'div' => 3,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersCHO.json',
            ],
            [
                'city' => 'Chicago',
                'name' => 'Bulls',
                'conf' => 1,
                'div' => 2,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersCHI.json',
            ],
            [
                'city' => 'Cleveland',
                'name' => 'Cavaliers',
                'conf' => 1,
                'div' => 2,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersCLE.json',
            ],
            [
                'city' => 'Dallas',
                'name' => 'Mavericks',
                'conf' => 2,
                'div' => 6,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersDAL.json',
            ],
            [
                'city' => 'Denver',
                'name' => 'Nuggets',
                'conf' => 2,
                'div' => 4,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersDEN.json',
            ],
            [
                'city' => 'Detroit',
                'name' => 'Pistons',
                'conf' => 1,
                'div' => 2,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersDET.json',
            ],
            [
                'city' => 'Golden State',
                'name' => 'Warriors',
                'conf' => 2,
                'div' => 5,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersGSW.json',
            ],
            [
                'city' => 'Houston',
                'name' => 'Rockets',
                'conf' => 2,
                'div' => 6,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersHOU.json',
            ],
            [
                'city' => 'Indiana',
                'name' => 'Pacers',
                'conf' => 1,
                'div' => 2,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersIND.json',
            ],
            [
                'city' => 'Los Angeles',
                'name' => 'Clippers',
                'conf' => 2,
                'div' => 5,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersLAC.json',
            ],
            [
                'city' => 'Los Angeles',
                'name' => 'Lakers',
                'conf' => 2,
                'div' => 5,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersLAL.json',
            ],
            [
                'city' => 'Memphis',
                'name' => 'Grizzlies',
                'conf' => 2,
                'div' => 6,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersMEM.json',
            ],
            [
                'city' => 'Miami',
                'name' => 'Heat',
                'conf' => 1,
                'div' => 3,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersMIA.json',
            ],
            [
                'city' => 'Milwaukee',
                'name' => 'Bucks',
                'conf' => 1,
                'div' => 2,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersMIL.json',
            ],
            [
                'city' => 'Minnesota',
                'name' => 'Timberwolves',
                'conf' => 2,
                'div' => 4,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersMIN.json',
            ],
            [
                'city' => 'New Orleans',
                'name' => 'Pelicans',
                'conf' => 2,
                'div' => 6,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersNOP.json',
            ],
            [
                'city' => 'New York',
                'name' => 'Knicks',
                'conf' => 1,
                'div' => 1,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersNYK.json',
            ],
            [
                'city' => 'Oklahoma City',
                'name' => 'Thunder',
                'conf' => 2,
                'div' => 4,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersOKC.json',
            ],
            [
                'city' => 'Orlando',
                'name' => 'Magic',
                'conf' => 1,
                'div' => 3,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersORL.json',
            ],
            [
                'city' => 'Philadelphia',
                'name' => '76ers',
                'conf' => 1,
                'div' => 1,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersPHI.json',
            ],
            [
                'city' => 'Phoenix',
                'name' => 'Suns',
                'conf' => 2,
                'div' => 5,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersPHO.json',
            ],
            [
                'city' => 'Portland',
                'name' => 'Trail Blazers',
                'conf' => 2,
                'div' => 4,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersPOR.json',
            ],
            [
                'city' => 'Sacramento',
                'name' => 'Kings',
                'conf' => 2,
                'div' => 5,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersSAC.json',
            ],
            [
                'city' => 'San Antonio',
                'name' => 'Spurs',
                'conf' => 2,
                'div' => 6,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersSAS.json',
            ],
            [
                'city' => 'Toronto',
                'name' => 'Raptors',
                'conf' => 1,
                'div' => 1,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersTOR.json',
            ],
            [
                'city' => 'Utah',
                'name' => 'Jazz',
                'conf' => 2,
                'div' => 4,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersUTA.json',
            ],
            [
                'city' => 'Washington',
                'name' => 'Wizards',
                'conf' => 1,
                'div' => 3,
                'roster_id' => $roster_message['id'],
                'players_file' => 'playersWAS.json',
            ]
        ];

        foreach ($teams as $team_params) {

            $team = new RosterTeam($team_params);

            $team_message = RosterController::createTeam($db, $team);

            if (!$team_message['id']) {
                return array('error' => "Team Create didnt work!");
            } else { /* good to go */ }


            // seed roster_player by looping

            $file_name = '../../../frontend/' . $team_params['players_file'];

            $file = file_get_contents($file_name);
            $players_json = json_decode($file, true);

            echo $players_json;
        }





        // seed league
        // seed league_account_join

        // seed team by looping
        // seed draft
        // seed player by looping


        // seed season

        // schedule game algorithm and seed season games
    }
}

?>
