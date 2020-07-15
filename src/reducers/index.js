import LoginReducers from './login';
import pathReducer from './path';

import {combineReducers} from "redux";

const allReducers = combineReducers({
  login: LoginReducers,
  path: pathReducer,
})

export default allReducers;
