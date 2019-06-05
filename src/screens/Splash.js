import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, Icon } from 'react-native-elements';

import localized from '../localization/index';

class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 200}}>
              <Image source = {require('../assets/images/logo_mobile.png')} style={{width: 60, height: 60}}/>
              <Text style={styles.title}>TRAVEL TOUR</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#434A54',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 26,
      paddingLeft: 12,
      paddingBottom: 10,
      alignSelf: 'center',
    }
})

export default Splash;
