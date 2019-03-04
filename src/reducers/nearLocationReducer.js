import * as types from '../actions/type';

let nearLocation = {
  data: [],
  count: 0,
};

export default function(state=nearLocation, action){
  switch (action.type) {
    case types.GET_NEAR_LOCATION:
      return {
        ...state,
        data: action.data,
        count: action.count,
      };
      break;
  }
  return nearLocation;
}
