import * as types from '../actions/type';

let tourDetail = {
  id: 1,
  routes: [],
  location: {},
  showLocation: false,
}

export default function(state=tourDetail, action){
  switch (action.type) {
    case types.TOUR_DETAIL_CHANGE_ID:
      return {
        ...state,
        id: action.id,
      };
      break;
    case types.TOUR_DETAIL_CHANGE_ROUTES:
      return {
        ...state,
        routes: action.routes,
      }
      break;
    case types.TOUR_DETAIL_CHANGE_LOCATION:
      return {
        ...state,
        location: action.location,
      }
      break;
    case types.TOUR_DETAIL_SHOW_LOCATION:
      return {
        ...state,
        showLocation: action.visible,
      }
  }
  return state;
}
