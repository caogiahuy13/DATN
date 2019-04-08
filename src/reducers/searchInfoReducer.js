import * as types from '../actions/type';

let searchInfo = {
  name: '',
}

export default function(state = searchInfo, action){
  switch (action.type) {
    case types.SEARCH_NAME_CHANGE:
      return {
        ...state,
        name: action.name,
      };
      break;
  }
  return state;
}
