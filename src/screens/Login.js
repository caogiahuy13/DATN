import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, TouchableOpacity,
    KeyboardAvoidingView, Button,
    CheckBox,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            check: false
        }
    }

    checkBoxTest(){
        this.setState({
            check:!this.state.check
        })
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
                        <Text style={styles.inputText}>Phone number *</Text>
                        <TextInput style={styles.input}
                            placeholder=""
                            placeholderTextColor='rgba(255,255,255,0.8)'
                            keyboardType='email-address'
                            returnKeyType='next'
                            autoCorrect={false}
                            onSubmitEditing={()=> this.refs.txtPassword.focus()}
                        />
                        <Text style={styles.inputText}>Password *</Text>
                        <TextInput style={styles.input}
                            placeholder=""
                            placeholderTextColor='rgba(255,255,255,0.8)'
                            returnKeyType='go'
                            secureTextEntry
                            autoCorrect={false}
                            ref={"txtPassword"}
                        />
                        <View style={styles.notePassword}>
                            <View style={styles.checkBox}>
                                <CheckBox
                                    value={this.state.check}
                                    onChange={() => this.checkBoxTest()}
                                />
                                <Text style={styles.rememberMe}>Remember me</Text>
                            </View>
                            <Text style={styles.lostPassword}>Password?</Text>
                        </View>
                        <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('TabNavigator')}>
                             <Text style={styles.buttonText}>LOGIN</Text>
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
        height: '60%',
        width: '100%',
    },
    inputText:
    {
        fontSize: 18,
        marginTop: 10,
        marginHorizontal: 20,
        color: '#292929',
    },
    input: {
        fontSize: 18,
        height: 40,
        marginTop: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        color: '#000',
    },
    notePassword:{
        marginTop: 10,
        marginLeft: 13,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkBox: {
        flexDirection: 'row',
    },
    rememberMe: {
        marginTop: 4,
        fontSize: 18,
    },
    lostPassword: {
        marginTop: 4,
        fontSize: 18,
        right: 0,
    },
    ORText:{
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
    },
    buttonLogin: {
        backgroundColor: '#1BBC9B',
        paddingVertical: 10,
        marginTop: 10,
        marginHorizontal: 20,
    },
    buttonFacebook: {
        backgroundColor: '#3B5998',
        paddingVertical: 10,
        marginTop: 20,
        marginHorizontal: 20,
    },
    buttonText: {
        textAlign: 'center',
        color :'#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    register: {
        marginTop: 12,
        marginHorizontal: 20,
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
