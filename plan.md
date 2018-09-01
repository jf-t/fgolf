# Basic Architecture - React Redux

Implementing react redux architecture using what i think will work as
best project structure for me

### index.jsx
    - webpack entry point adds document event listener to configure store, initialize <Root> on document.getElementById('root')

# components
## root
    - renders router component
    - need to include auth guard for every page besides login,signup
## login
    - `component.jsx`
        * form with username, password input
        * props: onLogin (takes this.state)
        * state: username, password
        * this.update(prop) updates username, password on input change
        * this.login() passes this.state to onLogin from onSubmit
    - `container.js`
        * state: user [object]
        * dispatch: login(credentials)
    - 'actions.js'
        * login: type 'LOGIN', user
## signup
    - `component.jsx`
        * form with username, email, 2 passwords
        * props: onSignup (takes this.state)
        * state: username, email, password1, password2
        * this.update(props) updates something in this.state
        * this.signup() passes this.state to onSignup from onSubmit
    - `container.js`
        * state: user [object]
        * dispatch: signup(credentials)
    -   `actions.js`
        * signup: type 'SIGNUP', user
## league-list
    - 'component.jsx'
        * display list of leagues in ul
        * on click events to /league/:id
        * props: leagues (array of league objects)
    - 'container.js'
        * dispatch: getLeagues() (inside componentOnMount - for now, i am not sure if this is the best method long term but since i can't find any good counterarguments, i am going to accept this as using the naive solution)
    - 'actions.js'
        * getLeagues: type: 'GET_LEAGUES' (this action does not need any params because API uses sessionToken to get current user and gets leagues according to that)
## league
    - 'component.jsx'
        * display <Standings> and <Managers> (for now)
        * props: league (league object with manager standings, live leaderboard, upcoming events(?))
    - 'container.js'
        * state: league [object] (this for now is just basic info)
        * dispatch: getLeague(leagueId)
    - 'actions.js'
        * getLeague: type 'GET_LEAGUE', leagueId
### standings
    - 'component.jsx'
        * display table of current leaderboard
        * in future, could call <Table> component to share with standings component
        * props: leaderboard (array of usernames, scores, and players to see which manager selected which players)
    - 'container.js'
        * state: leaderboard [array[object]]
        * dispatch getPlayers(accountTournamentResults) (get the results of this account's current tournament score)
    - 'actions.js'
        * getLeaderboard: type: 'GET_LEADERBOARD', leagueId (this might be just received through getLeague)
### managers
    - 'component.jsx'
        * displays table of managers
        * in future, could call <Table> component to share with standings component
        * props: managers (list of managers and just their emails for now)
    - 'container.js'
        * state: managers [array[object]]
        * dispatch: getManagers(leagueId) (gets manager username and email and earnings(?))
    - 'actions.js'
        * getManagers: type: 'GET_MANAGERS', leagueId (this might be just received through getLeague)


## These remaining components will be thought more about later:        
### settings
    - inputs to manage the league settings
## tournament-list
    - displays schedule of PGA tour, including which manager in the league won
## tournament
    - displays tournament leaderboard with icons for which manager picked who, and manager standings on right side
