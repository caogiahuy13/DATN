import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Profile extends Component {
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: ({ tintColor }) => (<Icon name="ios-settings" size={22}/>),
  };
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}> This is Profile Tab </Text>
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
