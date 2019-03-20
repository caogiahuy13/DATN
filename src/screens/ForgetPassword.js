import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image, Alert,
    TextInput, TouchableOpacity,
    KeyboardAvoidingView, Button,
    AsyncStorage,
} from 'react-native'

import { ERR_EMAIL } from '../constants/index';
import { forgetPassword } from '../services/api';

class ForgetPassword extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        err: '',
        isError: false,
      }
    }

    // Thay đổi state của error
    setError(err, isError){
      this.setState({err: err, isError: isError});
    }

    // Kiểm tra thông tin người dùng
    checkEmail(){
      if (this.state.email == ''){
        this.setError(ERR_EMAIL, true);
        return false;
      }
      this.setError('', false);
      return true;
    }

    async callForgetPassword(){
      let status;
      return forgetPassword(this.state.email)
            .then((response) => {
                status = response.status;
                return response.json();
              })
            .then((responseJson) => {
              if (status == 400){
                this.setError(responseJson.msg,true);
              } else if (status != 400){
                this.setError('',false);
              }
            })
            .catch((error) => {
              console.error(error);
            });
    }

    // Hàm gọi thi nhấn nút Send Request
    _onPressSendRequest(){
      let validate = this.checkEmail();
      if (validate){
        this.callForgetPassword().then(()=>{
          if (this.state.isError == false){
            Alert.alert(
              'Congratulations',
              'New password has been sent to your email!',
              [
                {text: 'OK', onPress: () => this.props.navigation.navigate("Login")},
              ],
              {cancelable: false},
            );
              // this.props.navigation.navigate("Login");
            }
        })
      }
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                  <View style={styles.imageBackground}>
                      <Text style={styles.title}>FORGET</Text>
                      <Text style={styles.title}>PASSWORD</Text>
                      <View style={styles.line}/>
                  </View>
                  <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.inputText}>Email *</Text>
                        <TextInput style={styles.input}
                            placeholder=""
                            placeholderTextColor='rgba(255,255,255,0.8)'
                            keyboardType='email-address'
                            autoCorrect={false}
                            onChangeText={(value)=> this.setState({email: value})}
                        />
                        { this.state.isError && <Text style={styles.errorText}>{this.state.err}</Text> }
                        <TouchableOpacity style={styles.buttonSend} onPress={() => {this._onPressSendRequest()}}>
                             <Text style={styles.buttonText}>SEND REQUEST</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageBackground: {
        backgroundColor: '#292929',
        height: '40%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 40,
        textAlign: 'center',
    },
    line:
    {
        marginTop: 5,
        width: 70,
        height: 3,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    infoContainer: {
        paddingTop: 10,
        marginHorizontal: 20,
    },
    inputText:
    {
        fontSize: 18,
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: 10,
    },
    input: {
        fontSize: 18,
        height: 40,
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        color: 'gray',
    },
    buttonSend: {
        backgroundColor: '#1BBC9B',
        paddingVertical: 10,
        marginTop: 20,
    },
    buttonText: {
        textAlign: 'center',
        color :'#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
})

export default ForgetPassword;
