import { combineReducers } from 'redux';
import UserReducer from './user_reducer';
import LeagueReducer from './league_reducer';

const RootReducer = combineReducers({
  currentUser: UserReducer,
  leagues: LeagueReducer
});

export default RootReducer;
