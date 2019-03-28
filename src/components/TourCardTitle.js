import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Card, Icon, Button, Rating } from 'react-native-elements';

import { COLOR_LIGHT_BLACK, COLOR_GREEN, COLOR_MAIN} from '../constants/index';
import TourRating from './TourRating';

class TourCardTitle extends Component{
  render(){
    return(
      <View style={{flex: 1, padding: 10}}>
          <Text style={styles.title}>
              {this.props.title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TourRating rating={3} size={14}/>
              <Icon name='eye' type='entypo' color='gray' size={14} containerStyle={{marginLeft: 8}}/>
              <Text style={{marginLeft: 4}}>{this.props.view} views</Text>
          </View>
          { this.props.isSale &&
            <View style={styles.saleContainer}>
              <Button buttonStyle={styles.sale} title='SALE!' titleStyle={{fontSize: 14}}/>
            </View>
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  saleContainer: {
    width: 60,
    flex: 1,
    marginTop: 8,
    justifyContent: 'flex-end'
  },
  sale: {
    backgroundColor: COLOR_GREEN,
    borderRadius: 0,
    padding: 0,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    color: COLOR_LIGHT_BLACK
  }
})

export default TourCardTitle;
