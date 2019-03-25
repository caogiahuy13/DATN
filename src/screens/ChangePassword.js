import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {Input, Text, Button} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { } from '../actions/index.js';
import { updatePassword } from '../services/api';
import { ERR_ALL_FIELD, ERR_CONFIRM_PASSWORD, SUCCESS_CHANGE_PASSWORD, COLOR_MAIN } from '../constants/index';
import localized from '../localization/index';

class ChangePassword extends Component {
  static navigationOptions = {
    title: localized.changePassword,
  };

  constructor(props){
    super(props);
    this.state = {
      old_password: '',
      new_password: '',
      confirm_password: '',
      err: '',
      isError: true,
    }
  }

  // Cập nhật lỗi
  setError(err, isError){
    this.setState({err: err, isError: isError});
  }

  // Kiểm tra thông tin người dùng
  checkUser(){
    if (this.state.old_password == ''){
      this.setError(localized.ERR_ALL_FIELD, true);
      return false;
    }
    if (this.state.new_password == ''){
      this.setError(localized.ERR_ALL_FIELD, true);
      return false;
    }
    if (this.state.confirm_password == ''){
      this.setError(localized.ERR_ALL_FIELD, true);
      return false;
    }
    if (this.state.new_password !== this.state.confirm_password){
      this.setError(localized.ERR_CONFIRM_PASSWORD, true);
      return false;
    }
    this.setError('', false);
    return true;
  }

  // Gọi API cập nhật mật khẩu
  async callUpdatePasswordAPI(){
    let status;
    return updatePassword(this.state.old_password, this.state.new_password)
          .then((response) => {
            status = response.status;
            return response.json();
           })
           .then((responseJson) => {
             if (status != 200){
               this.setError(responseJson.msg,true);
             } else if (status == 200){
               this.setError('',false);
             }
           })
          .catch((error) => {
            console.error(error);
          });
  }

  // Hàm gọi khi nhán nút thay đổi mật khẩu
  _onButtonPress(){
    let validate = this.checkUser();
    if (validate){
      this.callUpdatePasswordAPI().then(()=>{
        if (this.state.isError == false){
          Alert.alert(localized.SUCCESS_CHANGE_PASSWORD);
          this.props.navigation.goBack();
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={{marginVertical: 10}}></View>
          <Input
            inputStyle={styles.input}
            label={localized.oldPassword}
            secureTextEntry
            autoCorrect={false}
            onChangeText={(value)=> this.setState({old_password: value})}
          />

          <View style={{marginVertical: 10}}></View>
          <Input
            inputStyle={styles.input}
            label={localized.newPassword}
            secureTextEntry
            autoCorrect={false}
            onChangeText={(value)=> this.setState({new_password: value})}
          />

          <View style={{marginVertical: 5}}></View>
          <Input
            inputStyle={styles.input}
            label={localized.confirmPassword}
            secureTextEntry
            autoCorrect={false}
            onChangeText={(value)=> this.setState({confirm_password: value})}
          />

          <View style={{marginVertical: 10}}></View>
          { this.state.isError && <Text style={styles.errorText}>{this.state.err}</Text> }

          <Button
            title={localized.changePassword.toUpperCase()}
            onPress={()=>{this._onButtonPress()}}
            type="solid"
            buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
            containerStyle={{paddingHorizontal: 6}}
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
    errorText: {
      fontSize: 16,
      color: 'red',
      marginBottom: 10,
      marginTop: 5,
      marginHorizontal: 10,
    }
})

function mapStateToProps(state){
  return{
    access: state.access,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
