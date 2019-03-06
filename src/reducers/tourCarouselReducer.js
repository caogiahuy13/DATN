import * as types from '../actions/type';

let tourCarousel = {
  isVisible: false,
}

export default function(state=tourCarousel, action){
  switch (action.type) {
    case types.HANDLE_TOUR_CAROUSEL:
      return {
        ...state,
        isVisible: action.visible,
      };
      break;
  }
  return state;
}
