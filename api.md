# API
## Plan:
I need to think about this architecture more. the logic for API work is getting messy already and I am not nearly done. I need to create a more repeatable method of implementing API endpoints with middleware.

I am thinking of using a complete middlware solution, where a route is just a set of middleware functions that will set request data so that the next middleware just needs the correct input and then the body of the route will just display the received data.

If any middleware has errors, the response of 500 will be immediately returned with the error, so that i will know which function the error is coming from.

I also need a method of scraping the statdata website more efficiently. i feel like they will block me at some point for obviously scraping the pages in succession.

Here is a list of every possible middleware function grouped together. They all exist inside the controllers:

### User Middleware:
- create user
- get user by session
- get user by id
- log in user
- sign out user
- update user by field
- delete user

### League Middleware
- create league - LeagueController.createLeague
- get league by id - LeagueController.getLeague
- get leagues by user (basic league info) - LeagueController.getUserLeagues
- update league - LeagueController.updateLeague
- get league current standings -
- get league money list

### Tournament Middleware
- create tournament
- get tournament by id
- scrape live tournament
- update leaderboard
- create player tournament
- update player tournament
- get player tournament (by pga_id and tid)


### Pl@yer Middleware
- create player
- get player by id
- update player


# Current Api Endpoints:
## User_routes
### POST `/user`
    Body:
        username, (string)
        password, (string)
        email (string)
    Response:
        user.responseBody

### POST `/auth`
    Body:
        username, (string) -- should implement email sign in as well
        password (string)
    Response
        user.responseBody

### GET `/user/:id`
    Response:
        user.responseBody


## League_routes
### POST `/league`
    Body:
        name, (string)
        private, (boolean)
        password (string)
    Response:
        league.responseBody

### GET `/leagues`
    Response:
        array[league.responseBody]
    Explanation:
        Gets leagues of specific signed in user to be displayed on home screen

### NEED UPDATE - GET `/league/:id`
    Response:
        - id
        - league name
        - standings: []
            - user id
            - username
            - total
            - players []:
                - player id
                - player name
                - score
                - through (number of holes)
        - this week:
            - tourmament id
            - tournament name
        - next week
            - tournament id
            tournament name
        - money list []
            - user id
            - username
            - winnings
        - leaderboard []
            - player id
            - player name
            - total
            - through
            - r1
            - r2
            - r3
            - r4
### POST `/league/:id/signup`
    Body:
        accountId (int)
    Response:
        league_account
### POST `/league/:id/initialize/:year`
    Response:
        array[league_tournament]
    Explanation:
        Gets every tournament in DB with year param and create league_tournament for each
### POST `/league/:id/select_players`
    Body:
        playerIds, (array[int])
        tournamentId (int)
    Response:
        Message saying successful
### GET `/league/:id/players`
    Query:
        tid (string of length 3)
    Response:
        array[player]
    Explanation:

### GET `/league/:id/leaderboard`
    Query:
        tid (string of length 3)
    Response:
        array[league_account with results]

## Tournament_routes
### POST '/tournament'
    Body:
        tid, (string of length 3)
        name, (string)
        startingDate, (ISO)
        endingDate (ISO)
    Response:
        tournament
### GET `/tournament/:id`
    Response:
        tournament
### POST `/tournament/:id/initiate`
    Response:
        array[player_tournament without scores]
    Explanation:
        This scrapes statdata.pgatour.com to get player names, checks if they exist in DB, if not create new player
### POST `/tournament/:id/update`
    Response:
        message saying successful
    Explanation:
        This scrapes statdata again and gets scores this time. I think these two need to be on the same endpoint, it is dumb to scrape same shit twice
### GET `/tournament/:id/leaderboard`
    Response:
        array[player_tournament]
    Explanation:
        this is live tournament leaderboard from most recently scraped statdata

### POST `/tournament/:season/create`
    Response:
        nothing really (yet)
    Explanation:
        scrapes statdata to get every tournament in the season, and puts the basic info into our DB
