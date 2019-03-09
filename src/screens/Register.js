import React, { Component } from 'react'
import {
  StyleSheet, Text, View,
  TouchableWithoutFeedback,
  TextInput, TouchableOpacity,
  KeyboardAvoidingView, AsyncStorage,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { handleAccess, changeProfile } from '../actions/index.js';

const ERR_FULLNAME = "Fullname is required";
const ERR_PASSWORD = "Password is required";
const ERR_PHONE = "Phone number is required";
const ERR_EMAIL = "Email is required";
const ERR_CONFIRM_PASSWORD = "Password and Confirm password must be match!";
const ERR_PHONE_LENGTH = "Phone number must be 10 digits!";

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
    _onPressRegister(){
      let validate = this.checkUser();
      if (validate){
        this.callRegisterAPI();
        if (this.state.isError == false){
          this.props.navigation.navigate("Map");
        }
      }
    }

    callRegisterAPI(){
      let status;
      fetch('http://10.0.3.2:5000/user/register', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    fullname: this.state.fullname,
                    password: this.state.password,
                    phone: this.state.phone,
                    email: this.state.email,
                  }),
                }).then((response) => {
                    status = response.status;
                    return response.json();
                  })
                  .then((responseJson) => {
                    if (status == 400){
                      this.setError(responseJson.msg,true);
                    } else if (status == 200){
                      AsyncStorage.setItem('userToken',responseJson.token);
                      this.props.changeProfile(responseJson.profile);
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
    }

    setError(err, isError){
      this.setState({err: err, isError: isError});
    }

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
      if (this.state.phone.length != 10){
        this.setError(ERR_PHONE_LENGTH, true);
        return false;
      }
      if (this.state.email == ''){
        this.setError(ERR_EMAIL, true);
        return false;
      }
      if (this.state.password !== this.state.confirmPassword){
        this.setError(ERR_CONFIRM_PASSWORD, true);
        return false;
      }
      this.setError('', false);
      return true;
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
                        { this.state.isError && <Text style={styles.errorText}>*{this.state.err}</Text> }
                        <TouchableOpacity style={styles.buttonRegister} onPress={() => this._onPressRegister()}>
                             <Text style={styles.buttonText}>REGISTER</Text>
                        </TouchableOpacity>
                        <Text style={styles.ORText}>OR</Text>
                        <TouchableOpacity style={styles.buttonFacebook} onPress={() => navigation.navigate('TabNavigator')}>
                            <Text style={styles.buttonText}>
                                <FontAwesome name="facebook" size={25} />
                                <Text>{"   "}</Text>
                                LOGIN WITH FACEBOOK
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.register}>
                            <Text style={{fontSize: 18}}>You have an account? </Text>
                            <Text style={{fontSize: 18, color: '#5375D8'}}>Login here </Text>
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
        color: '#292929',
    },
    errorText: {
        color: '#C50000',
        fontSize: 14,
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
        color: '#000',
    },
    ORText:{
        fontSize: 17,
        marginTop: 20,
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
        marginTop: 20,
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
