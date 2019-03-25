import * as types from '../actions/type';

let currentTourTurn = {

}

export default function(state = currentTourTurn, action){
  switch (action.type) {
    case types.CURRENT_TOUR_TURN_CHANGE:
      return {
        ...action.tourTurn
      };
      break;

  }
  return state;
}
