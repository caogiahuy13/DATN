import * as types from '../actions/type';

let access = {
  isLoged: false,
  profile: {},
}

export default function(state = access, action){
  switch (action.type) {
    case types.HANDLE_ACCESS:
      return {
        ...state,
        isLoged: action.log,
      };
      break;
    case types.CHANGE_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
      break;
  }
  return state;
}
