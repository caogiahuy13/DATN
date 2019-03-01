import {combineReducers} from 'redux';
import countReducer from './countReducer.js';
import regionReducer from './regionReducer';
import nearLocationReducer from './nearLocationReducer';

const allReducers= combineReducers({
  count: countReducer,
  region: regionReducer,
  nearLocation: nearLocationReducer,
});
export default allReducers;
