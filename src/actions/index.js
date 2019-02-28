import * as types from './type.js';

export function increment(){
  return{
    type: types.INCREMENT,
  };
}
export function decrement(){
  return{
    type: types.DECREMENT
  };
}

export function changeCurrentLocation(lat, lng){
  return {
    type: types.CHANGE_CURRENT_LOCATION,
    lat,
    lng,
  }
}
