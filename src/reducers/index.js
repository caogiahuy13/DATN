import {combineReducers} from 'redux';
import countReducer from './countReducer.js';
import regionReducer from './regionReducer';

const allReducers= combineReducers({
  count: countReducer,
  region: regionReducer,
});
export default allReducers;
