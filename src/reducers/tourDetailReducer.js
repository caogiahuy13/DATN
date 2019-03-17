import * as types from '../actions/type';

let tourDetail = {
  id: 1,
  routes: [],
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
  }
  return state;
}
