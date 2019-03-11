import * as types from '../actions/type';

let filterLocation = {
  filterTypes: [],
}

export default function(state = filterLocation, action){
  switch (action.type) {
    case types.FILTER_TYPE:
      return {
        filterTypes: action.filterTypes,
      };
      break;
  }
  return state;
}
