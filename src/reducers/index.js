import {combineReducers} from 'redux';
import regionReducer from './regionReducer';
import nearLocationReducer from './nearLocationReducer';
import modalLocationReducer from './modalLocationReducer';

const allReducers= combineReducers({
  region: regionReducer,
  nearLocation: nearLocationReducer,
  modalLocation: modalLocationReducer,
});
export default allReducers;
