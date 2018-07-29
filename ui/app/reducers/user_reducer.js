import { userConstants } from '../actions/user_actions';
import merge from 'lodash/merge';

const UserReducer = (state = {}, action) => {
  switch(action.type) {
    case 'RECEIVE_USER':
      return merge({}, action.user);
    default:
      return state;
  };
};

export default UserReducer;
