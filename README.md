# Fantasy Golf App


# Api Endpoints:
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

### GET `/league/:id`
    Response:
        league.responseBody
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
