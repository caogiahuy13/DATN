import * as types from '../actions/type';

let currentRoute = {
  data: [],
}

export default function(state=currentRoute, action){
  switch (action.type) {
    case types.CHANGE_CURRENT_ROUTE:
      return {
        ...state,
        data: action.data,
      };
      break;
  }
  return state;
}
