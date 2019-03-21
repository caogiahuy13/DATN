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
}

export default function(state = booking, action){
  switch (action.type) {
    case types.BOOKING_CHANGE_INFO:
      return {
        ...state,
        info: action.info,
      };
      break;
  }
  return state;
}
