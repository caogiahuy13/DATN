import * as types from './type.js';

export function changeCurrentLocation(lat, lng){
  return {
    type: types.CHANGE_CURRENT_LOCATION,
    lat,
    lng,
  }
}

export function changeCurrentRegion(lat, lng, latDelta, lngDelta){
  return {
    type: types.CHANGE_CURRENT_REGION,
    lat,
    lng,
    latDelta,
    lngDelta,
  }
}

export function getNearLocation(data, count){
  return {
    type: types.GET_NEAR_LOCATION,
    data,
    count,
  }
}

export function handleModalLocation(visible){
  return {
    type: types.HANDLE_MODAL_LOCATION,
    visible,
  }
}
