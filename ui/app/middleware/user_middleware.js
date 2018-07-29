import { login, signup, receiveUser } from '../actions/user_actions';
import { apiLogin, apiSignup} from '../util/user_utils';


const UserMiddleware = ({getState, dispatch}) => next => action => {
    const success = (user) => {
        localStorage.setItem('user', user);
        dispatch(receiveUser(user));
    };

    const errors = (error) => {
        dispatch(receiveUser({'msg': 'error'}));
    }

    switch(action.type) {
        case 'LOGIN':
            apiLogin(action.user, success, errors);
            return next(action);
        case 'SIGNUP':
            apiSignup(action.user, success, errors);
            return next(action);
        default:
            return next(action);
    }
}
export default UserMiddleware;
