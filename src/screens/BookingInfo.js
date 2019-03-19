import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Card, Icon } from 'react-native-elements';

import { COLOR_MAIN } from '../constants/index';

const deviceWidth = Dimensions.get("window").width;

import BookingStage from '../components/BookingStage';

class BookingInfo extends Component {
  render(){
    return(
      <View>
          <BookingStage stage={1}/>

      </View>
    )
  }
}

export default BookingInfo;
