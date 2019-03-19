import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native';

import { COLOR_GRAY_BACKGROUND } from '../constants/index';

class InfoText extends Component {
  render(){
    return(
      <View style={styles.containerInfoText}>
        <Text style={styles.infoText}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerInfoText: {
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: COLOR_GRAY_BACKGROUND,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 20,
    color: 'gray',
    fontWeight: '500',
  },
})

export default InfoText;
