import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { } from 'react-native-elements';

import { priceFormat, shortenString } from '../services/function';
import { COLOR_HARD_RED, COLOR_GREEN } from '../constants/index';

import Sale from './Sale';

class SmallTourCard extends Component{
  onPress = () => {
    this.props.onPress(this.props.data.id);
  }

  render(){
    const {data} = this.props;

    if (typeof(data) == 'undefined'){
      return(<View></View>)
    }

    return(
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <View style={{flex: 0.7, justifyContent: 'flex-start'}}>
            <Image style={styles.image} source={{uri: data.tour.featured_img}}/>
            { data.discount > 0 &&
              <View style={{padding: 6, position: 'absolute'}}>
                  <Sale/>
              </View>
            }
        </View>
        <Text style={styles.name}>{shortenString(data.tour.name,40)}</Text>
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
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  }
})

export default SmallTourCard;
