# API
## Plan:
I need to think about this architecture more. the logic for API work is getting messy already and I am not nearly done. I need to create a more repeatable method of implementing API endpoints with middleware.

I am thinking of using a complete middlware solution, where a route is just a set of middleware functions that will set request data so that the next middleware just needs the correct input and then the body of the route will just display the received data.

If any middleware has errors, the response of 500 will be immediately returned with the error, so that i will know which function the error is coming from.

I also need a method of scraping the statdata website more efficiently. i feel like they will block me at some point for obviously scraping the pages in succession.

Another idea is to split logic more into object based... Component would contain controller functions and model logic as well. this way all of the logic would be tied together more.

These component public functions would be called as middleware on the route, which would just respond with a simple callback of returning response. components will be used more as what they represent in compared to exactly what the function is doing.

If i can plan out all of the functions that I need, i can create a more stable API

Here is a list of every possible middleware function grouped together. They all exist inside the controllers:

### User Middleware:
- create user - UserController.createUser
- get user by session - UserController.checkSession
- get user by id - UserController.getUser
- log in user - UserController.login
- sign out user - INCOMPLETE
- update user by field - INCOMPLETE
- delete user - INCOMPLETE

### League Middleware
- create league - LeagueController.createLeague
- get league by id - LeagueController.getLeague
- get leagues by user (basic league info) - LeagueController.getUserLeagues
- update league - LeagueController.updateLeague
- sign user up for league - LeagueController.enrollUserInLeague
- get league current standings - LeagueController.getStandings
- get league money list - INCOMPLETE

### Tournament Middleware
- create tournament - TournamentController.createTournament
- get tournament by id - TournamentController.getTournament
- scrape live tournament -
- update leaderboard -
- create season - TournamentController.initiateSeason
- create player tournament -
- update player tournament -
- get player tournament (by pga_id and tid) -


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
    Middleware:
        user.create

### POST `/auth`
    Body:
        username, (string) -- should implement email sign in as well
        password (string)
    Response
        user.responseBody
    Middleware:
        user.login

### GET `/user/:id`
    Response:
        user.responseBody
    Middleware:
        user.getById


## League_routes
### POST `/league`
    Body:
        name, (string)
        private, (boolean)
        password (string)
    Response:
        league.responseBody
    Middleware:
        user.isLoggedIn
        league.create

### GET `/leagues`
    Response:
        array[league.responseBody]
    Explanation:
        Gets leagues of specific signed in user to be displayed on home screen
    Middleware:
        user.isLoggedIn
        league.getUserLeagues

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
            - tournament name
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
    Middleware:
        user.isLoggedIn
        league.getById
        tournament.currentEvent
        tournament.scrape
        league.getStandings
        league.moneyList
        tournament.updateLeaderboard
### POST `/league/:id/signup`
    Body:
        accountId (int)
    Response:
        league_account
    Middleware:
        user.isLoggedIn
        league.getById
        league.enroll
### POST `/league/:id/initialize/:year`
    Response:
        array[league_tournament]
    Explanation:
        Gets every tournament in DB with year param and create league_tournament for each
    Middleware:
        user.isLoggedIn
        league.getById
        tournament.getSeason
        league.createSeason

### POST `/league/:id/select_players`
    Body:
        playerIds, (array[int])
        tournamentId (int)
    Response:
        Message saying successful
    Middleware:
        user.isLoggedIn
        league.getById
        tournament.currentEvent
        player.getByIds
        league.selectPlayers



### GET `/league/:id/players`
    Query:
        tid (string of length 3)
    Response:
        array[player]
    Note:
        I am not sure what this function does

### GET `/league/:id/standings`
    Query:
        tid (string of length 3)
    Response:
        array[league_account with results]
    Middleware:
        user.isLoggedIn
        league.getById
        league.getStandings

## Tournament_routes
### POST '/tournament'
    Note:
        Frontend will not need this endpoint
    Body:
        tid, (string of length 3)
        name, (string)
        startingDate, (ISO)
        endingDate (ISO)
    Response:
        tournament
    Middleware:
        tournament.create
### GET `/tournament/:id`
    Response:
        tournament
        will need more information
    Middleware:
        user.isLoggedIn
        tournament.getById
### POST `/tournament/:id/initiate`
    Response:
        array[player_tournament without scores]
    Explanation:
        This scrapes statdata.pgatour.com to get player names, checks if they exist in DB, if not create new player
    Middleware:
        tournamanent.getById
        tournament.scrape
        tournament.initiatePlayers
        tournament.updateLeaderboard

### PUT `/tournament/:id/leaderboard`
    Note:
        this is going to be the most used endpoint in production because it will be called whenever a user needs to see the leaderboard

        should never be called before all of the players are initiated
    Response:
        message saying successful
    Explanation:
        This scrapes statdata again and gets scores this time. I think these two need to be on the same endpoint, it is dumb to scrape same shit twice
    Middleware:
        user.isLoggedIn
        tournament.scrape
        tournament.updateLeaderboard


### POST `/tournament/:season/create`
    *NOTE*:
        should never be used unless necessary!!!!!



# API Components:
User:
    model:
        id,
        username,
        email,
        pw_hash,
        session_token
    middleware functions:
        create
        login
        getById
        isLoggedIn
        delete
League:
    model:
        id,
        name,
        commish_id,
        private,
        pw_hash

        standings
    middleware functions:
        create
        getUserLeagues
        getById
        enroll
        createSeason
        selectPlayers

Tournament:
    model:
        tid,
        name,
        season,
        starting_date,
        ending_date
    middleware functions:
        create
        getById
        currentEvent
        scrape
        getSeason
        initiatePlayers
        updateLeaderboard
Player
    model:
        pga_id,
        name

        tournament_score
    middleware_functions:
        create
        getByIds
        getById
