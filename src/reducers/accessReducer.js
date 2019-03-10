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

    case types.CHANGE_GENDER:
      return {
        ...state,
        profile: {
          ...state.profile,
          sex: action.gender,
        }
      };
      break;

    case types.CHANGE_BIRTHDAY:
      return {
        ...state,
        profile: {
          ...state.profile,
          birthday: action.birthday,
        }
      };
      break;

    case types.CHANGE_PASSWORD:
      return {
        ...state,
        profile: {
          ...state.profile,
          password: action.password,
        }
      };
      break;
  }
  return state;
}
