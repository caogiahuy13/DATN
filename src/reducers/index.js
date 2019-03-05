import {combineReducers} from 'redux';
import regionReducer from './regionReducer';
import nearLocationReducer from './nearLocationReducer';

const allReducers= combineReducers({
  region: regionReducer,
  nearLocation: nearLocationReducer,
});
export default allReducers;
