import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Card, Icon } from 'react-native-elements';

import { COLOR_LIGHT_BLACK, COLOR_GREEN } from '../constants/index';

class TourCardTitle extends Component{
  render(){
    return(
      <View style={{flex: 1, padding: 10}}>
          <Text style={styles.title}>
              {this.props.title}
          </Text>
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
