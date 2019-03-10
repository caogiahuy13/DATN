import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {Input, Text, Button} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { changePassword } from '../actions/index.js';

class ChangePassword extends Component {
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
          <Input inputStyle={styles.input} label="Old Password"/>
          <View style={{marginVertical: 10}}></View>
          <Input inputStyle={styles.input} label="New Password"/>
          <View style={{marginVertical: 5}}></View>
          <Input inputStyle={styles.input} label="Confirm New Password"/>
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
    input: {
      color: 'gray',
    },
    text: {
      fontSize: 20,
      marginHorizontal: 12,
      fontWeight: 'bold',
    }
})

function mapStateToProps(state){
  return{
    access: state.access,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changePassword: changePassword,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
