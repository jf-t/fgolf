import { userConstants } from '../actions/user_actions';
import merge from 'lodash/merge';

const LeagueReducer = (state = [], action) => {
    switch(action.type) {
        case 'RECEIVE_LEAGUES':
            return state.concat(action.leagues);
        case 'RECEIVE_LEAGUE':
            // TODO: in future
            //  1. find league by ID in state
            //  2. replace league with action.league
            return state.concat(action.league);
        default:
            return state;
    };
};

export default LeagueReducer;
