import * as types from '../actions/type';

let searchFilter = {

}

export default function(state = searchFilter, action){
  switch (action.type) {
    case types.SEARCH_FILTER_CHANGE:
      return {
        ...action.filter,
      };
      break;
  }
  return state;
}
