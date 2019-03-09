import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, TouchableOpacity,
    KeyboardAvoidingView, Button,
    CheckBox, AsyncStorage,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { handleAccess, changeProfile } from '../actions/index.js';

const ERR_USERNAME = "Email or Phone number must be in right format";
const ERR_PASSWORD = "Password is required";

class Login extends Component {
    constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '',
        err: '',
        isError: false,
      }
    }

    setError(err, isError){
      this.setState({err: err, isError: isError});
    }

    async callLoginAPI(){
      let status;
      await fetch('http://10.0.3.2:5000/user/login', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                  }),
                }).then((response) => {
                    status = response.status;
                    return response.json();
                  })
                  .then((responseJson) => {
                    if (status != 200){
                      this.setError(responseJson.msg,true);
                    } else if (status == 200){
                      AsyncStorage.setItem('userToken',responseJson.token);
                      AsyncStorage.setItem('profile',JSON.stringify(responseJson.profile));
                      this.setError('',false);
                      this.props.changeProfile(responseJson.profile);
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
    }

    checkUser(){
      if (this.state.username == ''){
        this.setError(ERR_USERNAME, true);
        return false;
      }
      if (this.state.password == ''){
        this.setError(ERR_PASSWORD, true);
        return false;
      }
      this.setError('', false);
      return true;
    }

    _onPressLogin(){
      let validate = this.checkUser();
      if (validate){
        this.callLoginAPI().then(()=>{
          if (this.state.isError == false){
            this.props.navigation.navigate("Map");
          }
        })
      }
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                 <KeyboardAvoidingView behavior='padding' style={styles.container}>

                    {/* <View style={styles.imageBackground}>
                        <Image style={styles.logo}
                            source={require('../assets/images/logo.png')}>
                        </Image>
                    </View> */}
                    <View style={styles.imageBackground}>
                        <Text style={styles.title}>LOGIN</Text>
                        <View style={styles.line}/>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.inputText}>Email or Phone number *</Text>
                        <TextInput style={styles.input}
                            placeholder=""
                            placeholderTextColor='rgba(255,255,255,0.8)'
                            keyboardType='email-address'
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText={(value)=> this.setState({username: value})}
                            // onSubmitEditing={()=> this.refs.txtPassword.focus()}
                        />
                        <Text style={styles.inputText}>Password *</Text>
                        <TextInput style={styles.input}
                            placeholder=""
                            placeholderTextColor='rgba(255,255,255,0.8)'
                            returnKeyType='go'
                            secureTextEntry
                            autoCorrect={false}
                            ref={"txtPassword"}
                            onChangeText={(value)=> this.setState({password: value})}
                        />
                        <View style={styles.notePassword}>
                            <Text style={styles.lostPassword}>Lost your password?</Text>
                        </View>
                        { this.state.isError && <Text style={styles.errorText}>{this.state.err}</Text> }
                        <TouchableOpacity style={styles.buttonLogin} onPress={() => {this._onPressLogin()}}>
                             <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                        <Text style={styles.ORText}>OR</Text>
                        <TouchableOpacity style={styles.buttonFacebook} onPress={() => {}}>
                            <Text style={styles.buttonText}>
                                <FontAwesome name="facebook" size={25} />
                                <Text>{"   "}</Text>
                                LOGIN WITH FACEBOOK
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.register}>
                            <Text style={styles.registerText1}>You don't have an account? </Text>
                            <Text style={styles.registerText2} onPress={()=>{navigation.navigate('Register')}}>Register here </Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        // tintColor: 'white',
    },
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
        marginTop: '10%',
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
    notePassword:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-end',
    },
    lostPassword: {
        fontSize: 18,
    },
    ORText:{
        fontSize: 17,
        marginTop: 15,
        textAlign: 'center',
    },
    buttonLogin: {
        backgroundColor: '#1BBC9B',
        paddingVertical: 10,
        marginTop: 10,
    },
    buttonFacebook: {
        backgroundColor: '#3B5998',
        paddingVertical: 10,
        marginTop: 15,
    },
    buttonText: {
        textAlign: 'center',
        color :'#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    register: {
        marginTop: 12,
        flexDirection: 'row',
    },
    registerText1: {
        fontSize: 18,
    },
    registerText2: {
        fontSize: 18,
        color: '#5375D8',
    },
})

function mapStateToProps(state){
  return{
    access: state.access,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    handleAccess: handleAccess,
    changeProfile: changeProfile,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
