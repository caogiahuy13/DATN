import * as types from '../actions/type';

let region = {
  latitude:  10.762864,
  longitude: 106.682229,
};

export default function(state=region, action){
  switch (action.type) {
    case types.CHANGE_CURRENT_LOCATION:
      return {
        latitude: action.lat,
        longitude: action.lng,
      }
      break;
  }
  return state;
}
