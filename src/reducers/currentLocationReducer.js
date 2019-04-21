import * as types from '../actions/type';

let currentLocation = {
  lat: 10.762864,
  lng: 106.682229,
}

export default function(state=currentLocation, action){
  switch (action.type) {
    case types.CURRENT_LOCATION_CHANGE:
      return {
        ...state,
        lat: action.lat,
        lng: action.lng,
      };
      break;
  }
  return state;
}
