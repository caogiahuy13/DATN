let count= 0;

import * as types from '../actions/type';

export default function(state=count, action){
  switch (action.type) {
    case types.INCREMENT: count++;
      break;
    case types.DECREMENT: count--;
      break;
  }
  return count;
}
