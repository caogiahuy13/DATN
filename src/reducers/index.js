import {combineReducers} from 'redux';
import regionReducer from './regionReducer';
import nearLocationReducer from './nearLocationReducer';
import modalLocationReducer from './modalLocationReducer';
import tourCarouselReducer from './tourCarouselReducer';

const allReducers= combineReducers({
  region: regionReducer,
  nearLocation: nearLocationReducer,
  modalLocation: modalLocationReducer,
  tourCarousel: tourCarouselReducer,
});
export default allReducers;
