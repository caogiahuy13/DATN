import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ChangePassword extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}> This is CHANGE PASSWORD Tab </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
      fontSize: 20,
    }
})
