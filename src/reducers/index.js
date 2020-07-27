import LoginReducers from './login';
import pathReducer from './path';
import WidthReducers from './size';
import MobileHeaderActive from './mobileHeader';

import {combineReducers} from "redux";

const allReducers = combineReducers({
  login: LoginReducers,
  path: pathReducer,
  width: WidthReducers,
  mobileHeader: MobileHeaderActive,
})

export default allReducers;
