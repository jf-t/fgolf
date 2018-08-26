import { getLeagues, receiveLeagues } from '../actions/league_actions';
import { apiGetLeagues} from '../util/league_utils';
import { currentUser } from '../util/session';

const LeagueMiddleware = ({getState, dispatch}) => next => action => {
    const success = (user) => {
        dispatch(receiveLeagues(user));
    };

    const errors = (error) => {
        dispatch(receiveLeagues([{'msg': 'error'}]));
    }

    switch (action.type) {
        case 'GET_LEAGUES':
            apiGetLeagues(currentUser(), success, errors);
            return next(action);
        default:
            return next(action);
    }
}
export default LeagueMiddleware;
