import * as types from '../actions/type';

let booking = {
  info: {
    idTour_Turn: '',
    payment: 0,
    fullname: '',
    phone: '',
    email: '',
    address: '',
    passengers: [],
    total_pay: 0,
  },
  tourTurn: {},
  number: {},
}

export default function(state = booking, action){
  switch (action.type) {
    case types.BOOKING_CHANGE_INFO:
      return {
        ...state,
        info: action.info,
      };
      break;
    case types.BOOKING_CHANGE_TOURTURN:
      return {
        ...state,
        tourTurn: action.tourTurn,
      };
      break;
    case types.BOOKING_CHANGE_NUMBER:
      return {
        ...state,
        number: action.number,
      }
      break;
  }
  return state;
}
