import { userConstants } from '../actions/user_actions';
import merge from 'lodash/merge';

const LeagueReducer = (state = {}, action) => {
  switch(action.type) {
    case 'RECEIVE_LEAGUES':
      return merge({}, action.leagues);
    default:
      return state;
  };
};

export default LeagueReducer;
