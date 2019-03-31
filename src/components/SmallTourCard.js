import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { } from 'react-native-elements';

import { priceFormat } from '../services/function';
import { COLOR_HARD_RED } from '../constants/index'
class SmallTourCard extends Component{
  render(){
    const {data} = this.props;

    if (typeof(data) == 'undefined'){
      return(<View></View>)
    }

    return(
      <TouchableOpacity style={styles.container}>
        <Image style={{flex: 0.7, height: undefined, width: undefined}} source={{uri: data.tour.featured_img}}/>
        <Text style={styles.name}>{data.tour.name}</Text>
        <Text style={styles.price}>{priceFormat(data.end_price)}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    width: 200,
    height: 260,
  },
  name: {
    padding: 4,
    fontSize: 16,
    flex: 0.2,
  },
  price: {
    padding: 4,
    color: COLOR_HARD_RED,
    fontWeight: 'bold',
    fontSize: 18,
    flex: 0.1
  }
})

export default SmallTourCard;
