import * as types from '../actions/type';

let filterLocation = {
  filterTypes: [
    true,true,true,true,true,
    true,true,true,true,true,
    true,true,true,true,true,
    true,true,true,true,true,
    true,true,true
  ],
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
