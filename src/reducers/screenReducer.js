import * as types from '../actions/type';

let screenManage = {
  previous: '',
}

export default function(state = screenManage, action){
  switch (action.type) {
    case types.SCREEN_SET_PREVIOUS:
      return {
        ...state,
        previous: action.screen,
      };
      break;
  }
  return state;
}
