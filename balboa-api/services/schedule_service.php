<?php

class ScheduleService {
    public static function createSeason($db, $league_id) {
        // Logic:
        // create algorithm for when n number of teams have to play each
        //  other for a total of x number of games

        $league = LeagueController::getLeague($db, $league_id);

        $num_games = $league->num_games;

        // this is gonna be tough
    }
}



?>
