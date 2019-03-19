import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Card, Icon } from 'react-native-elements';

import { COLOR_MAIN, COLOR_GRAY_BACKGROUND } from '../constants/index';

const deviceWidth = Dimensions.get("window").width;

class BookingStage extends Component {
  render(){
    const {stage} = this.props;
    return(
      <View>
          <View style={styles.container}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                  <Icon raised reverse name='user' type='font-awesome' color={stage>=1 ? COLOR_MAIN : 'gray'} size={20} containerStyle={styles.icon}/>
                  <Icon raised reverse name='payment' type='material' color={stage>=2 ? COLOR_MAIN : 'gray'} size={20} containerStyle={styles.icon}/>
                  <Icon raised reverse name='check' type='font-awesome' color={stage>=3 ? COLOR_MAIN : 'gray'} size={20} containerStyle={styles.icon}/>
              </View>
              <View style={styles.line}>
                  <View style={stage>1 ? styles.passed : styles.notPass}></View>
                  <View style={stage>2 ? styles.passed : styles.notPass}></View>
              </View>

          </View>

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
  icon: {
    flex: 1,
    alignItems: 'center',
  },
  line: {
    width: deviceWidth,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 60,
  },
  notPass: {
    backgroundColor: 'gray',
    flex: 1,
    height: 8
  },
  passed: {
    backgroundColor: COLOR_MAIN,
    flex: 1,
    height: 8
  }
})

export default BookingStage;
