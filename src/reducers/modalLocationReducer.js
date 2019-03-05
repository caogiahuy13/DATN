import * as types from '../actions/type';

let modalLocation = {
  isVisible: false,
  location: {},
}

export default function(state=modalLocation, action){
  switch (action.type) {
    case types.HANDLE_MODAL_LOCATION:
      return {
        ...state,
        isVisible: action.visible,
      };
      break;
    case types.CHANGE_SELECTED_LOCATION:
      return {
        ...state,
        location: action.location,
      };
      break;
  }
  return state;
}
