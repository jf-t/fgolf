import { applyMiddleware } from 'redux';

import UserMiddleware from './user_middleware';
import LeagueMiddleware from './league_middleware';


const MasterMiddleware = applyMiddleware(UserMiddleware, LeagueMiddleware);

export default MasterMiddleware;
