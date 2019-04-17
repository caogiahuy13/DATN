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

export function handleCurrentRouteZoom(hasZoomed){
  return {
    type: types.HANDLE_CURRENT_ROUTE_ZOOM,
    hasZoomed,
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

export function filterType(filterTypes){
  return {
    type: types.FILTER_TYPE,
    filterTypes,
  }
}

// Tour Detail
export function tourDetailChangeId(id){
  return {
    type: types.TOUR_DETAIL_CHANGE_ID,
    id,
  }
}

export function tourDetailChangeRoutes(routes){
  return {
    type: types.TOUR_DETAIL_CHANGE_ROUTES,
    routes,
  }
}

export function tourDetailChangeLocation(location){
  return {
    type: types.TOUR_DETAIL_CHANGE_LOCATION,
    location,
  }
}

export function tourDetailShowLocation(visible){
  return {
    type: types.TOUR_DETAIL_SHOW_LOCATION,
    visible,
  }
}

export function tourDetailShowMarker(visible){
  return {
    type: types.TOUR_DETAIL_SHOW_MARKER,
    visible,
  }
}

export function tourDetailCurrentRoute(curRoute){
  return {
    type: types.TOUR_DETAIL_CURRENT_ROUTE,
    curRoute,
  }
}


// Booking tour
export function bookingChangeInfo(info){
  return {
    type: types.BOOKING_CHANGE_INFO,
    info,
  }
}

export function bookingChangeTourTurn(tourTurn){
  return {
    type: types.BOOKING_CHANGE_TOURTURN,
    tourTurn,
  }
}

export function bookingChangeNumber(number){
  return {
    type: types.BOOKING_CHANGE_NUMBER,
    number,
  }
}

export function bookingIsBooking(isBooking){
  return {
    type: types.BOOKING_IS_BOOKING,
    isBooking,
  }
}

// Screen for login
export function screenSetPrevious(screen){
  return {
    type: types.SCREEN_SET_PREVIOUS,
    screen,
  }
}

// Booked tour
export function bookedTourGetInfo(info){
  return {
    type: types.BOOKED_TOUR_GET_INFO,
    info,
  }
}

export function bookedTourGetPassengers(passengers){
  return {
    type: types.BOOKED_TOUR_GET_PASSENGERS,
    passengers,
  }
}

export function bookedTourGetTourInfo(tourInfo){
  return {
    type: types.BOOKED_TOUR_GET_TOUR_INFO,
    tourInfo,
  }
}

// Search filter
export function searchFilterChange(filter){
  return {
    type: types.SEARCH_FILTER_CHANGE,
    filter,
  }
}

// Current select tour turn
export function currentTourTurnChange(tourTurn){
  return {
    type: types.CURRENT_TOUR_TURN_CHANGE,
    tourTurn,
  }
}

// Search Info
export function searchNameChange(name){
  return {
    type: types.SEARCH_NAME_CHANGE,
    name,
  }
}
