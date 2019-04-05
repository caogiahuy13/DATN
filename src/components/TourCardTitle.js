import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Card, Icon, Button, Rating } from 'react-native-elements';

import { COLOR_LIGHT_BLACK, COLOR_GREEN, COLOR_MAIN} from '../constants/index';
import localized from '../localization/index';

import TourRating from './TourRating';

class TourCardTitle extends Component{
  render(){
    const {title, rating, view, isSale} = this.props;

    return(
      <View style={{flex: 1, padding: 10}}>
          <Text style={styles.title}>
              {title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              { typeof(rating) != 'undefined' && <TourRating rating={rating} size={14}/>}
              { typeof(view) != 'undefined' &&
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name='eye' type='entypo' color='gray' size={14} containerStyle={{marginLeft: 8}}/>
                  <Text style={{marginLeft: 6}}>{view} {localized.view}</Text>
                  </View>
              }
          </View>
          { isSale &&
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
