import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider, Rating, AirbnbRating, Avatar } from 'react-native-elements';

import { COLOR_MAIN, COLOR_LIGHT_BLACK } from '../constants/index';

class TourDetailReview extends Component {
  render(){
    const {comment} = this.props;

    return(
      <View style={{paddingHorizontal: 4}}>
        <View style={{flexDirection: 'row', paddingTop: 6}}>
          <Avatar rounded source={{ uri: comment.user.avatar }} containerStyle={{marginRight: 8}}/>
          <Text style={styles.name}>
              {comment.user.fullname}
          </Text>
          <Rating
            type='custom'
            ratingCount={5}
            imageSize={14}
            ratingColor = {COLOR_MAIN}
            readonly
            ratingBackgroundColor='#c8c7c8'
            startingValue={2.5}
            style={{alignSelf: 'center'}}
          />
        </View>
        <View style={{paddingVertical: 8}}>
            <Text>{comment.content}</Text>
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
