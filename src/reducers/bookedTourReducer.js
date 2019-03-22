import * as types from '../actions/type';

let bookedTour = {
  info: {},
  passengers: [],
}

export default function(state = bookedTour, action){
  switch (action.type) {
    case types.BOOKED_TOUR_GET_INFO:
      return {
        ...state,
        info: action.info,
      };
      break;
    case types.BOOKED_TOUR_GET_PASSENGERS:
      return {
        ...state,
        passengers: action.passengers,
      }
  }
  return state;
}
