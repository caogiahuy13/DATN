import * as types from '../actions/type';

let currentRoute = {
  data: [],
  isVisible: false,
  hasZoomed: false,
}

export default function(state=currentRoute, action){
  switch (action.type) {
    case types.CHANGE_CURRENT_ROUTE:
      return {
        ...state,
        data: action.data,
      };
      break;
    case types.HANDLE_CURRENT_ROUTE:
      return {
        ...state,
        isVisible: action.visible,
      };
      break;
    case types.HANDLE_CURRENT_ROUTE_ZOOM:
      return {
        ...state,
        hasZoomed: action.hasZoomed,
      }
      break;
  }
  return state;
}
