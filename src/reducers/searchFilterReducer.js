import * as types from '../actions/type';

let searchFilter = {
  date: '',
  maxPrice: 0,
  destination: '',
  rating: 0,
}

export default function(state = searchFilter, action){
  switch (action.type) {
    case types.SEARCH_FILTER_CHANGE:
      return {
        ...state,
        date: action.filter.date,
        maxPrice: action.filter.maxPrice,
        destination: action.filter.destination,
        rating: action.filter.rating,
      };
      break;
  }
  return state;
}
