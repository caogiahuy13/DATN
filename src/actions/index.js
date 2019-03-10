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

export function changeSelectedLocation(location){
  return {
    type: types.CHANGE_SELECTED_LOCATION,
    location,
  }
}

export function handleTourCarousel(visible){
  return {
    type: types.HANDLE_TOUR_CAROUSEL,
    visible,
  }
}

export function changeCurrentRoute(data){
  return {
    type: types.CHANGE_CURRENT_ROUTE,
    data,
  }
}

export function handleCurrentRoute(visible){
  return {
    type: types.HANDLE_CURRENT_ROUTE,
    visible,
  }
}

export function handleAccess(log){
  return {
    type: types.HANDLE_ACCESS,
    log,
  }
}

export function changeProfile(profile){
  return {
    type: types.CHANGE_PROFILE,
    profile,
  }
}

export function changeGender(gender){
  return {
    type: types.CHANGE_GENDER,
    gender,
  }
}

export function changeBirthday(birthday){
  return {
    type: types.CHANGE_BIRTHDAY,
    birthday,
  }
}
