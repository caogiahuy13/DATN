import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput, Touch, TouchableOpacity, ScrollView, Keyboard} from 'react-native';
import { Card, Icon, ListItem, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { ERR_BOOKING_CONTACT_INFO, ERR_BOOKING_PASSENGER_INFO, ERR_BOOKING_PASSENGER_MIN, ERR_PHONE_LENGTH, ERR_EMAIL_VALIDATE,
         COLOR_MAIN, COLOR_GRAY_BACKGROUND, COLOR_PLACEHOLDER } from '../constants/index';
import { bookingChangeInfo, bookingChangeTourTurn, bookingChangeNumber } from '../actions/index';
import { } from '../services/api';

import BookingStage from '../components/BookingStage';
import NumberPicker from '../components/NumberPicker';
import BookingPassenger from '../components/BookingPassenger';
import InfoText from '../components/InfoText';
import BookingTourCard from '../components/BookingTourCard';

class BookingInfo extends Component {
  static navigationOptions = {
    title: 'Passenger Information',
  };

  constructor(props){
    super(props);
    this.state = {
      tourTurn: {

      },

      contactInfo: {
        fullname: '',
        phone: '',
        email: '',
        address: '',
      },

      number: {
        adult: 1,
        children: 0,
      },

      adultInfo: [],
      childrenInfo: [],

      err: '',
      isError: false,
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
        this.changeChildrenNumber();
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
        this.changeChildrenNumber();
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
        this.changeAdultNumber();
      }
    );
  }
  decreaseAdult(){
    let changeValue = this.state.number.adult - 1;
    if (changeValue < 1){
      changeValue = 1
    }
    this.setState(
      {
        number: {
          ...this.state.number,
          adult: changeValue,
        }
      },
      () => {
        this.changeAdultNumber();
      }
    );
  }

  changeAdultNumber(){
    let number = this.state.number.adult;
    let {adultInfo} = this.state;
    let newAdultInfo = [];

    if (adultInfo.length >= number){
      for (let i=0; i<number; i++){
        newAdultInfo.push(adultInfo[i]);
      }
    } else {
      for (let i=0; i<adultInfo.length; i++){
        newAdultInfo.push(adultInfo[i]);
      }
      let newNum = number - adultInfo.length;
      for (let i=0; i<newNum; i++){
        newAdultInfo.push({
          fullname: '',
          birthdate: '',
          type: 'Adult',
          sex: '',
          phone: '',
          passport: '',
        });
      }
    }

    this.setState({adultInfo: newAdultInfo});
  }
  changeChildrenNumber(){
    let number = this.state.number.children;
    let {childrenInfo} = this.state;
    let newChildrenInfo = [];

    if (childrenInfo.length >= number){
      for (let i=0; i<number; i++){
        newChildrenInfo.push(childrenInfo[i]);
      }
    } else {
      for (let i=0; i<childrenInfo.length; i++){
        newChildrenInfo.push(childrenInfo[i]);
      }
      let newNum = number - childrenInfo.length;
      for (let i=0; i<newNum; i++){
        newChildrenInfo.push({
          fullname: '',
          birthdate: '',
          type: 'Children',
          sex: '',
          phone: '',
          passport: '',
        });
      }
    }

    this.setState({childrenInfo: newChildrenInfo});
  }

  update = (passenger, index) => {
    let {adultInfo, childrenInfo} = this.state;

    if (passenger.type == 'Adult'){
      adultInfo[index-1] = passenger;
      this.setState({adultInfo: adultInfo});
    } else if (passenger.type == 'Children'){
      childrenInfo[index-this.state.number.adult-1] = passenger;
      this.setState({childrenInfo: childrenInfo});
    }
  }

  setError(err, isError){
    this.setState({err: err, isError: isError});
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validate(){
    const {contactInfo, adultInfo, childrenInfo, number} = this.state;

    if (contactInfo.fullname == '' || contactInfo.phone == '' || contactInfo.email == '' || contactInfo.address == ''){
      this.setError(ERR_BOOKING_CONTACT_INFO, true);
      return false;
    }

    if (!this.validateEmail(contactInfo.email)){
      this.setError(ERR_EMAIL_VALIDATE, true);
      return false;
    }

    if (contactInfo.phone.length != 10){
      this.setError(ERR_PHONE_LENGTH, true);
      return false;
    }

    if (number.adult == 0 && number.children == 0){
      this.setError(ERR_BOOKING_PASSENGER_MIN, true);
      return false;
    }

    for (let i=0; i<adultInfo.length; i++){
      if (adultInfo[i].fullname == '' || adultInfo[i].birthdate == '' || adultInfo[i].sex == ''){
        this.setError(ERR_BOOKING_PASSENGER_INFO, true);
        return false;
      }
      if (adultInfo[i].phone != ''){
        if (adultInfo[i].phone.length != 10){
          this.setError(ERR_PHONE_LENGTH, true);
          return false;
        }
      }
    }
    for (let i=0; i<childrenInfo.length; i++){
      if (childrenInfo[i].fullname == '' || childrenInfo[i].birthdate == '' || childrenInfo[i].sex == ''){
        this.setError(ERR_BOOKING_PASSENGER_INFO, true);
        return false;
      }
      if (childrenInfo[i].phone != ''){
        if (childrenInfo[i].phone.length != 10){
          this.setError(ERR_PHONE_LENGTH, true);
          return false;
        }
      }
    }

    this.setError('', false);
    return true;
  }

  getInfo(){
    const {tourTurn, contactInfo, adultInfo, childrenInfo, number} = this.state;

    let passengers = [];
    for(let i=0; i<adultInfo.length; i++){
      passengers.push(adultInfo[i]);
    }
    for(let i=0; i<childrenInfo.length; i++){
      passengers.push(childrenInfo[i]);
    }

    let info = {
      idTour_Turn: tourTurn.id,
      payment: '',
      fullname: contactInfo.fullname,
      phone: contactInfo.phone,
      email: contactInfo.email,
      address: contactInfo.address,
      passengers: passengers,
      total_pay: tourTurn.price_passengers[0].price * number.adult + tourTurn.price_passengers[1].price * number.children,
    }

    return info;
  }

  onNextPress(){
    let validate = this.validate();
    if (validate){
      if (this.state.isError == false){
        this.props.bookingChangeInfo(this.getInfo());
        this.props.bookingChangeNumber(this.state.number);
        this.props.navigation.navigate("BookingPayment");
      }
    }

    // this.props.bookingChangeNumber(this.state.number);
    // this.props.navigation.navigate("BookingPayment");
  }

  componentWillMount(){
    this.setState({tourTurn: this.props.booking.tourTurn});
    this.changeAdultNumber(); // tao ra passenger adult dau tien
  }

  render(){
    let index = 0;
    let adultCard = this.state.adultInfo.map((val,key)=>{
      index += 1;
      return (<BookingPassenger key={key} val={val} index={index} update={this.update}/>);
    })
    let childrenCard = this.state.childrenInfo.map((val,key)=>{
      index += 1;
      return (<BookingPassenger key={key} val={val} index={index} update={this.update}/>);
    })

    return(
      <ScrollView style={styles.container}>

          <BookingStage stage={1}/>

          <Space/>

          <BookingTourCard data={this.state.tourTurn} number={this.state.number}/>

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
                  placeholderTextColor={COLOR_PLACEHOLDER}
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {...this.state.contactInfo, fullname: value}})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Phone number *"
                  placeholderTextColor={COLOR_PLACEHOLDER}
                  keyboardType='phone-pad'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {...this.state.contactInfo, phone: value}})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Email *"
                  placeholderTextColor={COLOR_PLACEHOLDER}
                  keyboardType='email-address'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {...this.state.contactInfo, email: value}})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Address *"
                  placeholderTextColor={COLOR_PLACEHOLDER}
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {...this.state.contactInfo, address: value}})}
              />
          </View>

          {adultCard}
          {childrenCard}

          { this.state.isError && <Text style={styles.errorText}>{this.state.err}</Text> }

          <Space/>

          <Button
            title="NEXT"
            type="solid"
            buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
            containerStyle={{paddingHorizontal: 16, borderRadius: 0}}
            titleStyle={{fontSize: 16}}
            onPress={()=>{this.onNextPress()}}
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
        paddingVertical: 10,
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
      fontSize: 16,
      flex: 1,
      alignSelf: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: 10,
        padding: 10,
    },
})

function mapStateToProps(state){
  return{
    booking: state.booking,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    bookingChangeInfo: bookingChangeInfo,
    bookingChangeTourTurn: bookingChangeTourTurn,
    bookingChangeNumber: bookingChangeNumber,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingInfo);
