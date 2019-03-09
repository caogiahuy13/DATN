import * as types from '../actions/type';

let access = {
  isLoged: false,
}

export default function(state=access, action){
  switch (action.type) {
    case types.HANDLE_ACCESS:
      return {
        ...state,
        isLoged: action.log,
      };
      break;
  }
  return state;
}
