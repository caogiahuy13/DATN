import * as types from '../actions/type';

let modalLocation = {
  isVisible: false,
}

export default function(state=modalLocation, action){
  switch (action.type) {
    case types.HANDLE_MODAL_LOCATION:
      return {
        ...state,
        isVisible: action.visible,
      };
      break;
  }
  return state;
}
