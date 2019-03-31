import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { } from 'react-native-elements';

import { priceFormat } from '../services/function';
import { COLOR_HARD_RED } from '../constants/index'
class SmallTourCard extends Component{
  render(){
    return(
      <TouchableOpacity style={styles.container}>
        <Image style={{flex: 1, height: undefined, width: undefined}} source={require('../assets/images/tour-card-img.jpg')}/>
        <Text style={styles.name}>Tour tham quan Sai Gon nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn</Text>
        <Text style={styles.price}>{priceFormat(200000)}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    width: 200,
    height: 260,
  },
  name: {
    padding: 4,
    fontSize: 16,
  },
  price: {
    padding: 4,
    color: COLOR_HARD_RED,
    fontWeight: 'bold',
    fontSize: 18,
  }
})

export default SmallTourCard;
