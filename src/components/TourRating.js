import React, { Component } from 'react';
import { View } from 'react-native';
import { Rating } from 'react-native-elements';

import { COLOR_MAIN } from '../constants/index';

class TourRating extends Component {
  render(){
    const {rating, size} = this.props;
    return(
      <View>
        <Rating
          type='custom'
          ratingCount={5}
          imageSize={size}
          ratingColor = {COLOR_MAIN}
          readonly
          ratingBackgroundColor='#c8c7c8'
          startingValue={rating}
        />
      </View>
    )
  }
}

export default TourRating;
