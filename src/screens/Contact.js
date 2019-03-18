import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {Input, Text, Button} from 'react-native-elements';

class Contact extends Component {
  static navigationOptions = {
    title: 'About Us',
  };

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
    },
})

export default Contact;
