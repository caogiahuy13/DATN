import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput, Touch, TouchableOpacity, ScrollView, Keyboard} from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';

import { COLOR_MAIN, COLOR_GRAY_BACKGROUND } from '../constants/index';

import BookingStage from '../components/BookingStage';
import NumberPicker from '../components/NumberPicker';
import BookingPassenger from '../components/BookingPassenger';
import InfoText from '../components/InfoText';

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
        children: 0,
      },
      passengers: [],

      isDateTimePickerVisible: false,
      isGenderModalVisible: false,
    }
  }

  increaseChildren(){
    let changeValue = this.state.number.children + 1;
    this.setState(
      {
        number: {
          ...this.state.number,
          children: changeValue,
        }
      },
      () => {
        this.changePassengerNumber();
      }
    );
  }
  decreaseChildren(){
    let changeValue = this.state.number.children - 1;
    if (changeValue < 0){
      changeValue = 0
    }
    this.setState(
      {
        number: {
          ...this.state.number,
          children: changeValue,
        }
      },
      () => {
        this.changePassengerNumber();
      }
    );
  }
  increaseAdult(){
    let changeValue = this.state.number.adult + 1;
    this.setState(
      {
        number: {
          ...this.state.number,
          adult: changeValue,
        }
      },
      () => {
        this.changePassengerNumber();
      }
    );
  }
  decreaseAdult(){
    let changeValue = this.state.number.adult - 1;
    if (changeValue < 0){
      changeValue = 0
    }
    this.setState(
      {
        number: {
          ...this.state.number,
          adult: changeValue,
        }
      },
      () => {
        this.changePassengerNumber();
      }
    );
  }
  changePassengerNumber(){
    let number = this.state.number.children + this.state.number.adult;
    console.log(number);

    let passengers = [];
    for (let i=0; i<number; i++){
      passengers.push({
        fullname: '',
        birthday: '',
        age: 0,
        gender: '',
        phone: '',
        identity: '',
      });
    }

    this.setState({passengers: passengers});
  }

  render(){
    let passengersCard = this.state.passengers.map((val,key)=>{
      return (
        <BookingPassenger key={key} val={val}/>
      )
    });
    
    return(
      <ScrollView style={styles.container}>

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

          {passengersCard}

      </ScrollView>
    )
  }
}

const Space = () => (
  <View style={styles.space}></View>
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
    listItemContainer: {
      height: 55,
      borderWidth: 0.5,
      borderColor: '#ECECEC',
    },
    modalGender: {
      backgroundColor: 'white',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
    },
})

export default BookingInfo;
