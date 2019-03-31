import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';

import { COLOR_GREEN } from '../constants/index';

class Sale extends Component{
  render(){
    return(
      <View style={styles.sale}>
        <Text style={{color: 'white'}}>SALE!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sale: {
    backgroundColor: COLOR_GREEN,
    paddingVertical: 4,
    paddingHorizontal: 6
  }
})

export default Sale;
