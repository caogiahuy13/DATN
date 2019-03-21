import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput, Touch, TouchableOpacity, ScrollView, Keyboard} from 'react-native';
import { Card, Icon, ListItem, Button } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { COLOR_MAIN, COLOR_GRAY_BACKGROUND, COLOR_PLACEHOLDER } from '../constants/index';
import { bookingChangeInfo } from '../actions/index';
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

      adultInfo: [],
      childrenInfo: [],

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
          birthday: '',
          age: 'Adult',
          gender: '',
          phone: '',
          identity: '',
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
          birthday: '',
          age: 'Children',
          gender: '',
          phone: '',
          identity: '',
        });
      }
    }

    this.setState({childrenInfo: newChildrenInfo});
  }

  update = (passenger, index) => {
    let {adultInfo, childrenInfo} = this.state;

    if (passenger.age == 'Adult'){
      adultInfo[index-1] = passenger;
      this.setState({adultInfo: adultInfo});
    } else if (passenger.age == 'Children'){
      childrenInfo[index-this.state.number.adult-1] = passenger;
      this.setState({childrenInfo: childrenInfo});
    }
  }

  validate(){

  }

  onNextPress(){
    this.props.navigation.navigate("BookingPayment");
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

          {/*<BookingTourCard/>*/}

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
                  onChangeText={(value)=> this.setState({contactInfo: {fullname: value}})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Phone number *"
                  placeholderTextColor={COLOR_PLACEHOLDER}
                  keyboardType='phone-pad'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {phone: value}})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Email *"
                  placeholderTextColor={COLOR_PLACEHOLDER}
                  keyboardType='email-address'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {email: value}})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Address *"
                  placeholderTextColor={COLOR_PLACEHOLDER}
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {address: value}})}
              />
          </View>

          {adultCard}
          {childrenCard}

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
      fontSize: 18,
      flex: 1,
      alignSelf: 'center',
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
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingInfo);
