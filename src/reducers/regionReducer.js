import * as types from '../actions/type';

let region = {
  latitude:  10.762864,
  longitude: 106.682229,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function(state=region, action){
  switch (action.type) {
    case types.CHANGE_CURRENT_REGION:
      return {
        ... state,
        latitude: action.lat,
        longitude: action.lng,
        latitudeDelta: action.latDelta,
        longitudeDelta: action.lngDelta,
      };
      break;
    case types.CHANGE_CURRENT_LOCATION:
      return {
        ...state,
        latitude: action.lat,
        longitude: action.lng,
      };
  }
  return state;
}
