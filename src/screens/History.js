import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class History extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.textTitle}> HISTORY </Text>
        </View>
        <Text style={styles.titleNotice}> Click to see details. </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      //justifyContent: 'center',
      backgroundColor: '#CFCFCF',
    },
    title: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      backgroundColor: '#fff',
      width: '100%',
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',

    },
    textTitle: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#324A5E',
    },
    titleNotice: {
      marginTop: 66,
      color: '#fff',
      fontSize: 20,
    }
})
