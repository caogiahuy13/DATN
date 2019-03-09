import React, { Component } from 'react'
import {
  StyleSheet, Text, View,
  TouchableWithoutFeedback,
  TextInput, TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      fullname: '',
      password: '',
      phone: '',
      email: '',
    }
  }
    _onPressRegister(){
      console.log(this.state.fullname);
      console.log(this.state.password);
      console.log(this.state.phone);
      console.log(this.state.email);
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
                            secureTextEntry
                            returnKeyType='next'
                            autoCorrect={false}
                            ref={"txtConfirmPassword"}
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
