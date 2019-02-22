import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Button
} from 'react-native'
import { createStackNavigator, createAppContainer} from "react-navigation";

export default class Login extends Component {

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                 <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo}
                            source={require('../images/logo.png')}>
                        </Image>
                    </View>
                    <View style={styles.infoContainer}>
                        <TextInput style={styles.input}
                             placeholder="Enter username/email"
                             placeholderTextColor='rgba(255,255,255,0.8)'
                             keyboardType='email-address'
                             returnKeyType='next'
                             autoCorrect={false}
                             onSubmitEditing={()=> this.refs.txtPassword.focus()}
                         />
                         <TextInput style={styles.input}
                             placeholder="Enter password"
                             placeholderTextColor='rgba(255,255,255,0.8)'
                             returnKeyType='go'
                             secureTextEntry
                             autoCorrect={false}
                             ref={"txtPassword"}
                         />
                         <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('TabNavigator')}>
                             <Text style={styles.buttonText}>SIGN IN</Text>
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
        backgroundColor: 'rgb(255, 255, 255)',
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 100,
        flex: 1
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        // tintColor: 'white',
    },
    title: {
        color: '#f7c744',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
        padding: 20,
        // backgroundColor: 'red'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: '#FFF',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 10
    },
    buttonText: {
        textAlign: 'center',
        color :'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 18
    }
})
