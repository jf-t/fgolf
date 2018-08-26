import { getLeagues, receiveLeagues, receiveLeague } from '../actions/league_actions';
import { apiGetLeagues, apiGetLeague } from '../util/league_utils';
import { currentUser } from '../util/session';

const LeagueMiddleware = ({getState, dispatch}) => next => action => {
    const success = (leagues) => {
        dispatch(receiveLeagues(leagues));
    };

    const errors = (error) => {
        dispatch(receiveLeagues([{'msg': 'error'}]));
    }

    switch (action.type) {
        case 'GET_LEAGUES':
            apiGetLeagues(currentUser(),
                          (leagues) => dispatch(receiveLeagues(leagues)),
                          errors);
            return next(action);
        case 'GET_LEAGUE':
            apiGetLeague(currentUser(),
                         action.id,
                         (league) => dispatch(receiveLeague(league)),
                         errors);
        default:
            return next(action);
    }
}
export default LeagueMiddleware;
