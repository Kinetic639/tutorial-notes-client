import { combineReducers } from 'redux';

import lessons from './lessons';
import auth from './auth';

export const reducers = combineReducers({ lessons, auth });
