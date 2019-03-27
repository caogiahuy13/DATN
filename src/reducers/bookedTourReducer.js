import * as types from '../actions/type';

let bookedTour = {
  info: {},
  passengers: [],
  tourInfo: {},
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
      break;
    case types.BOOKED_TOUR_GET_TOUR_INFO:
      return {
        ...state,
        tourInfo: action.tourInfo,
      }
      break;
  }
  return state;
}
