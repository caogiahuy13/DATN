import React, { Component } from 'react'
import {
  StyleSheet, Text, View, Alert,
  TouchableWithoutFeedback,
  TextInput, TouchableOpacity,
  KeyboardAvoidingView, AsyncStorage,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import { handleAccess, changeProfile } from '../actions/index.js';
import { register, loginWithFacebook } from '../services/api';
import { ERR_FULLNAME, ERR_PASSWORD, ERR_PHONE,
        ERR_EMAIL, ERR_CONFIRM_PASSWORD, ERR_PHONE_LENGTH, ERR_EMAIL_VALIDATE,
} from '../constants/index';
import { validateEmail, validatePhone } from '../services/function';

class Register extends Component {
    constructor(props){
      super(props);
      this.state = {
        fullname: '',
        password: '',
        confirmPassword: '',
        phone: '',
        email: '',
        err: '',
        isError: false,
      }
    }

    // Hàm gọi khi nhấn đăng ký
    _onPressRegister(){
      let validate = this.checkUser();
      if (validate){
        this.callRegisterAPI().then(()=>{
          if (this.state.isError == false){
            Alert.alert(
              'Congratulations',
              'You registered an account successfully! Please check your email to verify the account!',
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

    // Gọi Register API
    async callRegisterAPI(){
      let status;
      return register(this.state.fullname, this.state.password, this.state.phone, this.state.email)
            .then((response) => {
              status = response.status;
              return response.json();
             })
             .then((responseJson) => {
               if (status == 400){
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

    // Thay đổi error hiển thị
    setError(err, isError){
      this.setState({err: err, isError: isError});
    }

    // Kiểm tra thông tin người dùng
    checkUser(){
      if (this.state.fullname == ''){
        this.setError(ERR_FULLNAME, true);
        return false;
      }
      if (this.state.password == ''){
        this.setError(ERR_PASSWORD, true);
        return false;
      }
      if (this.state.phone == ''){
        this.setError(ERR_PHONE, true);
        return false;
      }
      if (!validatePhone(this.state.phone)){
        this.setError(ERR_PHONE_LENGTH, true);
        return false;
      }
      if (this.state.email == ''){
        this.setError(ERR_EMAIL, true);
        return false;
      }
      if (!validateEmail(this.state.email)){
        this.setError(ERR_EMAIL_VALIDATE, true);
        return false;
      }
      if (this.state.password !== this.state.confirmPassword){
        this.setError(ERR_CONFIRM_PASSWORD, true);
        return false;
      }
      this.setError('', false);
      return true;
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
                   this.props.navigation.navigate("Map");
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
                        <Text style={styles.title}>REGISTER</Text>
                        <View style={styles.line}/>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.inputText}>Fullname *</Text>
                        <TextInput style={styles.input}
                            placeholderTextColor='rgba(255,255,255,0.8)'
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText={(value)=> this.setState({fullname: value})}
                        />
                        <Text style={styles.inputText}>Password *</Text>
                        <TextInput style={styles.input}
                            placeholderTextColor='rgba(255,255,255,0.8)'
                            returnKeyType='next'
                            secureTextEntry
                            autoCorrect={false}
                            onChangeText={(value)=> this.setState({password: value})}
                        />
                        <Text style={styles.inputText}>Confirm Password *</Text>
                        <TextInput style={styles.input}
                            placeholderTextColor='rgba(255,255,255,0.8)'
                            returnKeyType='next'
                            secureTextEntry
                            autoCorrect={false}
                            onChangeText={(value)=> this.setState({confirmPassword: value})}
                        />
                        <Text style={styles.inputText}>Phone number *</Text>
                        <TextInput style={styles.input}
                            placeholderTextColor='rgba(255,255,255,0.8)'
                            keyboardType='phone-pad'
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText={(value)=> this.setState({phone: value})}
                        />
                        <Text style={styles.inputText}>Email *</Text>
                        <TextInput style={styles.input}
                            placeholderTextColor='rgba(255,255,255,0.8)'
                            keyboardType='email-address'
                            returnKeyType='go'
                            autoCorrect={false}
                            onChangeText={(value)=> this.setState({email: value})}
                        />
                        { this.state.isError && <Text style={styles.errorText}>{this.state.err}</Text> }
                        <TouchableOpacity style={styles.buttonRegister} onPress={() => this._onPressRegister()}>
                             <Text style={styles.buttonText}>REGISTER</Text>
                        </TouchableOpacity>
                        <Text style={styles.ORText}>OR</Text>
                        <TouchableOpacity style={styles.buttonFacebook} onPress={() => {this.handleFacebookLogin()}}>
                            <Text style={styles.buttonText}>
                                <FontAwesome name="facebook" size={25} />
                                <Text>{"   "}</Text>
                                LOGIN WITH FACEBOOK
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.register}>
                            <Text style={{fontSize: 18}}>You have an account? </Text>
                            <Text style={{fontSize: 18, color: '#5375D8'}} onPress={()=>{navigation.navigate('Login');}}>Login here </Text>
                        </View>
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
        height: '12%',
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
    ORText:{
        fontSize: 17,
        marginTop: 15,
        textAlign: 'center',
    },
    buttonRegister: {
        backgroundColor: '#1BBC9B',
        paddingVertical: 10,
        marginTop: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
