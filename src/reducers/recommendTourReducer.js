import * as types from '../actions/type';

let recommendTour = {
  locations: [],
};

export default function(state=recommendTour, action){
  switch (action.type) {
    case types.RECOMMEND_TOUR_ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, action.location],
      };
      break;
    case types.RECOMMEND_TOUR_NEW_LOCATIONS:
      return {
        ...state,
        locations: action.locations,
      }
      break;
  }
  return state;
}
