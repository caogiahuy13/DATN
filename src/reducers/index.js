import {combineReducers} from 'redux';
import regionReducer from './regionReducer';
import nearLocationReducer from './nearLocationReducer';
import modalLocationReducer from './modalLocationReducer';
import tourCarouselReducer from './tourCarouselReducer';
import currentRouteReducer from './currentRouteReducer';
import accessReducer from './accessReducer';
import filterLocationReducer from './filterLocationReducer';

const allReducers= combineReducers({
  region: regionReducer,
  nearLocation: nearLocationReducer,
  modalLocation: modalLocationReducer,
  tourCarousel: tourCarouselReducer,
  currentRoute: currentRouteReducer,
  access: accessReducer,
  filterLocation: filterLocationReducer,
});
export default allReducers;
