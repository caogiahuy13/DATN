import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput, Touch, TouchableOpacity, ScrollView, Keyboard} from 'react-native';
import { Card, Icon, ListItem, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';

import { COLOR_MAIN, COLOR_GRAY_BACKGROUND } from '../constants/index';

import BookingStage from '../components/BookingStage';
import NumberPicker from '../components/NumberPicker';
import BookingPassenger from '../components/BookingPassenger';
import InfoText from '../components/InfoText';
import BookingTourCard from '../components/BookingTourCard';

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

    let {passengers} = this.state;
    let newPassengers = [];

    if (passengers.length >= number){
      for (let i=0; i<number; i++){
        newPassengers.push(passengers[i]);
      }
    } else {
      for (let i=0; i<passengers.length; i++){
        newPassengers.push(passengers[i]);
      }
      let newNum = number - passengers.length;
      for (let i=0; i<newNum; i++){
        newPassengers.push({
          fullname: '',
          birthday: '',
          age: 0,
          gender: '',
          phone: '',
          identity: '',
        });
      }
    }

    this.setState({passengers: newPassengers});
  }

  update = (passenger, index) => {
    let passengers = this.state.passengers;
    passengers[index-1] = passenger;
    this.setState({passengers: passengers},()=>{console.log(this.state.passengers);});
  }

  render(){
    let index = 0;
    let passengersCard = this.state.passengers.map((val,key)=>{
      index += 1;
      return (<BookingPassenger key={key} val={val} index={index} update={this.update}/>);
    });

    return(
      <ScrollView style={styles.container}>

          <BookingStage stage={1}/>

          <Space/>

          <BookingTourCard/>

          <InfoText text="Number of passengers"/>

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

          <Space/>

          <Button
            title="NEXT"
            type="solid"
            buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
            containerStyle={{paddingHorizontal: 16, borderRadius: 0}}
            titleStyle={{fontSize: 16}}
          />

          <Space/>

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
})

export default BookingInfo;
