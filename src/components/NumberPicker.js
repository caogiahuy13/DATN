import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLOR_GRAY_BACKGROUND } from '../constants/index';

class NumberPicker extends Component {
  render(){
    const {value, allowPress} = this.props;

    return(
      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.props.decrease} style={styles.button} disabled={ allowPress ? !allowPress : false}>
              <Text style={styles.text}>-</Text>
          </TouchableOpacity>
          <View style={{paddingVertical: 4, paddingHorizontal: 10}}>
              <Text style={styles.text}>{this.props.value}</Text>
          </View>
          <TouchableOpacity onPress={this.props.increase} style={styles.button} disabled={ allowPress ? !allowPress : false}>
              <Text style={styles.text}>+</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: COLOR_GRAY_BACKGROUND,
  },
  button: {
    backgroundColor: COLOR_GRAY_BACKGROUND,
    paddingVertical: 4,
    width: 40,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  }
})

export default NumberPicker;
