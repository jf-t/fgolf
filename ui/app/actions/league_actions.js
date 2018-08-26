export const getLeagues = () => ({
    type: 'GET_LEAGUES'
});

export const receiveLeagues = leagues => ({
    type: 'RECEIVE_LEAGUES',
    leagues
});

export const getLeague = (id) => ({
    type: 'GET_LEAGUE',
    id
});


export const receiveLeague = league => ({
    type: 'RECEIVE_LEAGUE',
    league
});
