import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput, Touch, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';

import { COLOR_MAIN, COLOR_GRAY_BACKGROUND } from '../constants/index';

const deviceWidth = Dimensions.get("window").width;

import BookingStage from '../components/BookingStage';
import NumberPicker from '../components/NumberPicker';

class BookingInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      contactInfo: {
        fullname: '',
        phone: '',
        email: '',
        address: '',
      },
      number: {
        adult: 0,
        children: 1,
      },
    }
  }

  increaseChildren(){
    let changeValue = this.state.number.children + 1;
    this.setState({
      number: {
        ...this.state.number,
        children: changeValue,
      }
    });
  }
  decreaseChildren(){
    let changeValue = this.state.number.children - 1;
    if (changeValue < 0){
      changeValue = 0
    }
    this.setState({
      number: {
        ...this.state.number,
        children: changeValue,
      }
    });
  }
  increaseAdult(){
    let changeValue = this.state.number.adult + 1;
    this.setState({
      number: {
        ...this.state.number,
        adult: changeValue,
      }
    });
  }
  decreaseAdult(){
    let changeValue = this.state.number.adult - 1;
    if (changeValue < 0){
      changeValue = 0
    }
    this.setState({
      number: {
        ...this.state.number,
        adult: changeValue,
      }
    });
  }

  render(){
    return(
      <View style={styles.container}>
          <BookingStage stage={1}/>

          <Space/>
          
          <View style={styles.card}>
              <View style={styles.numberPicker}>
                  <Text style={styles.numberPickerText}>Adult *</Text>
                  <NumberPicker value={this.state.number.adult} increase={()=>this.increaseAdult()} decrease={()=>this.decreaseAdult()}/>
              </View>
              <View style={styles.numberPicker}>
                  <Text style={styles.numberPickerText}>Children</Text>
                  <NumberPicker value={this.state.number.children} increase={()=>this.increaseChildren()} decrease={()=>this.decreaseChildren()}/>
              </View>
          </View>

          <InfoText text="Contact Information"/>

          <View style={styles.card}>
              <TextInput
                  style={styles.input}
                  placeholder="Fullname *"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {fullname: value}})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Phone number *"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  keyboardType='phone-pad'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {phone: value}})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Email *"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  keyboardType='email-address'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {email: value}})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Address *"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {address: value}})}
              />

          </View>

      </View>
    )
  }
}

const Space = () => (
  <View style={styles.space}></View>
)
const InfoText = ({ text }) => (
  <View style={styles.containerInfoText}>
    <Text style={styles.infoText}>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_GRAY_BACKGROUND,
    },
    input: {
        fontSize: 16,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderColor: 'rgba(0,0,0,0.05)',
        color: 'gray',
        marginBottom: 10,
    },
    space: {
      paddingTop: 20,
      paddingBottom: 12,
      backgroundColor: COLOR_GRAY_BACKGROUND,
    },
    card: {
      backgroundColor: 'white',
      padding: 10,
      elevation: 1,
    },
    numberPicker: {
      flexDirection: 'row',
      paddingHorizontal: 4,
      padding: 4,
    },
    numberPickerText: {
      fontSize: 18,
      flex: 1,
      alignSelf: 'center',
    },
    containerInfoText: {
      paddingTop: 20,
      paddingBottom: 12,
      backgroundColor: COLOR_GRAY_BACKGROUND,
    },
    infoText: {
      fontSize: 16,
      marginLeft: 20,
      color: 'gray',
      fontWeight: '500',
    },
})

export default BookingInfo;
