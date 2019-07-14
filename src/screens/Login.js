import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, TouchableOpacity,
    KeyboardAvoidingView, Button,
    CheckBox, AsyncStorage,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { handleAccess, changeProfile, screenManage } from '../actions/index.js';
import { login, loginWithFacebook } from '../services/api';
import { ERR_USERNAME, ERR_PASSWORD } from '../constants/index';
import localized from '../localization/index';

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

    // Thay đổi state của error
    setError(err, isError){
      this.setState({err: err, isError: isError});
    }

    // Gọi login API
    async callLoginAPI(){
      let status;
      return login(this.state.username,this.state.password)
            .then((response) => {
                status = response.status;
                return response.json();
              })
            .then((responseJson) => {
              if (status != 200){
                this.setError(responseJson.msg,true);
              } else if (status == 200){
                AsyncStorage.setItem('userToken',responseJson.token);
                this.setError('',false);
                this.props.changeProfile(responseJson.profile);
              }
            })
            .catch((error) => {
              console.error(error);
            });
    }

    // Kiểm tra thông tin người dùng
    checkUser(){
      if (this.state.username == ''){
        this.setError(localized.ERR_USERNAME, true);
        return false;
      }
      if (this.state.password == ''){
        this.setError(localized.ERR_PASSWORD, true);
        return false;
      }
      this.setError('', false);
      return true;
    }

    // Hàm gọi thi nhấn nút đăng nhập
    _onPressLogin(){
      let validate = this.checkUser();
      if (validate){
        this.callLoginAPI().then(()=>{
          if (this.state.isError == false){
            // let previousScreen = this.props.navigation.getParam('previousScreen', 'Map');
            // this.props.navigation.navigate(previousScreen);

            const {previous} = this.props.screenManage;
            if (previous != ''){
              this.props.navigation.navigate(this.props.screenManage.previous)
            } else {
              this.props.navigation.navigate("Map");
            }
          }
        })
      }
    }

    _responseInfoCallback = function(error: ?Object, result: ?Object) {
       if (error) {
         // console.log(Object.keys(error));// print all enumerable
         console.log(error.errorMessage); // print error message
         // error.toString() will not work correctly in this case
         // so let use JSON.stringify()
         let json = JSON.stringify(error); // error object => json
         console.log(json); // print JSON
       } else {
         // console.log('Success fetching data: ' + result.toString());
         // console.log(Object.keys(result));
         let json = JSON.stringify(result); // result => JSON

         loginWithFacebook(result)
               .then((response) => {
                   status = response.status;
                   return response.json();
                 })
               .then((responseJson) => {
                 if (status != 200){
                   this.setError(responseJson.msg,true);
                 } else if (status == 200){
                   AsyncStorage.setItem('userToken',responseJson.token);
                   this.setError('',false);
                   this.props.changeProfile(responseJson.profile);
                 }
               })
               .then(()=>{
                 if (this.state.isError == false){
                   let previousScreen = this.props.navigation.getParam('previousScreen', 'Map');
                   this.props.navigation.navigate(previousScreen);
                 }
               })
               .catch((error) => {
                 console.error(error);
               });
       }
     }

    callLoginFacebookAPI(){
       AccessToken.getCurrentAccessToken().then(
         (data) => {
           let token = data.accessToken;
           const infoRequest = new GraphRequest(
             '/me',
             {
               parameters: {
                 fields: {
                   string: 'id,email,name,picture' // what you want to get
                 },
                 access_token: {
                   string: token.toString() // put your accessToken here
                 }
               }
             },
             this._responseInfoCallback.bind(this), // make sure you define _responseInfoCallback in same class
           );
           new GraphRequestManager().addRequest(infoRequest).start();
         }
       )
     }

    handleFacebookLogin () {
       LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
         function (result) {
           if (result.isCancelled) {
             console.log('Login cancelled');
             return false;
           } else {
             console.log('Login success with permissions: ' + result.grantedPermissions.toString());
             return true;
           }
         },
         function (error) {
           console.log('Login fail with error: ' + error)
         }
       ).then((result)=>{
         if (result){
           this.callLoginFacebookAPI();
         }
       })
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                 <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <View style={styles.imageBackground}>
                        <Text style={styles.title}>{localized.login.toUpperCase()}</Text>
                        <View style={styles.line}/>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.inputText}>{localized.emailOrPhone} *</Text>
                        <TextInput style={styles.input}
                            placeholder=""
                            placeholderTextColor='rgba(255,255,255,0.8)'
                            keyboardType='email-address'
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText={(value)=> this.setState({username: value})}
                            // onSubmitEditing={()=> this.refs.txtPassword.focus()}
                        />
                        <Text style={styles.inputText}>{localized.password} *</Text>
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
                            <Text style={styles.lostPassword} onPress={()=>navigation.navigate("ForgetPassword")}>{localized.lostPassword}?</Text>
                        </View>
                        { this.state.isError && <Text style={styles.errorText}>{this.state.err}</Text> }
                        <TouchableOpacity style={styles.buttonLogin} onPress={() => {this._onPressLogin()}}>
                             <Text style={styles.buttonText}>{localized.login.toUpperCase()}</Text>
                        </TouchableOpacity>
                        <Text style={styles.ORText}>{localized.or.toUpperCase()}</Text>
                        <TouchableOpacity style={styles.buttonFacebook} onPress={() => {this.handleFacebookLogin()}}>
                            <Text style={styles.buttonText}>
                                <FontAwesome name="facebook" size={25} />
                                <Text>{"   "}</Text>
                                {localized.loginFB.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.register}>
                            <Text style={styles.registerText1}>{localized.notHaveAccount}? </Text>
                            <Text style={styles.registerText2} onPress={()=>{navigation.navigate('Register')}}>{localized.register}</Text>
                        </View>
                        <View>
                            <Text style={styles.return} onPress={()=>{navigation.navigate('Map')}}>{localized.returnToMap}</Text>
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
        flex: 1,
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
        paddingBottom: 20,
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
        color: '#5375D8',
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
    return: {
        fontSize: 18,
        color: '#5375D8',
    }
})

function mapStateToProps(state){
  return{
    access: state.access,
    screenManage: state.screenManage,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    handleAccess: handleAccess,
    changeProfile: changeProfile,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
