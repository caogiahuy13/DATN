import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {Input, Text, Button} from 'react-native-elements';

export default class ChangePassword extends Component {
  static navigationOptions = {
    title: 'Change Password',
    headerStyle: {
      backgroundColor: '#324a5e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    tabBarVisible: false,
  };


  render() {
    return (
      <View style={styles.container}>
          <View style={{marginVertical: 10}}></View>
          <Input placeholder='Insert old password' label="Old password"/>
          <View style={{marginVertical: 10}}></View>
          <Input placeholder='Please insert new password' label="New Password"/>
          <View style={{marginVertical: 5}}></View>
          <Input placeholder='Please verify new password' label="Verify New Password"/>
          <View style={{marginVertical: 10}}></View>
          <Button
            title="CHANGE PASSWORD"
            onPress={()=>{Alert.alert("ABC")}}
            type="solid"
            buttonStyle={{backgroundColor: '#324a5e'}}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      marginHorizontal: 12,
      fontWeight: 'bold',
    }
})
