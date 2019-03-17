import * as types from '../actions/type';

let tourDetail = {
  id: 1,
}

export default function(state=tourDetail, action){
  switch (action.type) {
    case types.TOURL_DETAIL_CHANGE_ID:
      return {
        ...state,
        id: action.id,
      };
      break;
  }
  return state;
}
