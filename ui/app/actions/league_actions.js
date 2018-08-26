export const getLeagues = () => ({
    type: 'GET_LEAGUES'
});

export const receiveLeagues = leagues => ({
    type: 'RECEIVE_LEAGUES',
    leagues
});
