import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider, Rating, AirbnbRating, Avatar } from 'react-native-elements';

import { COLOR_MAIN, COLOR_LIGHT_BLACK } from '../constants/index';

class TourDetailReview extends Component {
  render(){
    const {review} = this.props;
    console.log(review);
    return(
      <View style={{paddingHorizontal: 4}}>
        <View style={{flexDirection: 'row', paddingTop: 6}}>
          { review.user != null &&
            <Avatar rounded source={{ uri: review.user.avatar }} containerStyle={{marginRight: 8}}/>
          }
          <Text style={styles.name}>
              {review.name}
          </Text>
          <Rating
            type='custom'
            ratingCount={5}
            imageSize={14}
            ratingColor = {COLOR_MAIN}
            readonly
            ratingBackgroundColor='#c8c7c8'
            startingValue={review.rate}
            style={{alignSelf: 'center'}}
          />
        </View>
        <View style={{paddingVertical: 8}}>
            <Text>{review.comment}</Text>
        </View>
        <Divider style={{height: 1, backgroundColor: '#F4F5F4'}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    alignSelf: 'center',
    flex: 1,
    color: COLOR_LIGHT_BLACK,
  }
})

export default TourDetailReview;
