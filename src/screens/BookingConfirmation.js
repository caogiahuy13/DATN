import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { Card, Icon, Button, Divider } from 'react-native-elements';

import { COLOR_MAIN, COLOR_GRAY_BACKGROUND, COLOR_LIGHT_BLACK, COLOR_LIGHT_BLUE } from '../constants/index';

import BookingStage from '../components/BookingStage';
import InfoText from '../components/InfoText';
import BookingTourCard from '../components/BookingTourCard';

class BookingConfirmation extends Component {
  static navigationOptions = {
    title: 'Confirm Your Booking',
  };

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <ScrollView style={styles.container}>
          <BookingStage stage={3}/>

          <Space/>

          <BookingTourCard/>

          <InfoText text="Contact Information"/>

          <View style={styles.card}>
              <ContactInfo firstTxt="Fullname:" secondTxt="Cao Gia Huy"/>
              <ContactInfo firstTxt="Phone number:" secondTxt="0123456789"/>
              <ContactInfo firstTxt="Email:" secondTxt="cghuy@gmail.com"/>
              <ContactInfo firstTxt="Address:" secondTxt="227 Nguyen Van Cu"/>
          </View>

          <InfoText text="Passenger Information"/>

          <View style={styles.card}>
              <PassengerInfo
                  fullname="Cao Gia Huy"
                  phone="0123456789"
                  birthday="01/01/2019"
                  gender="Male"
                  age="Adult"
                  identity="0123456789"
              />
              <Divider style={{height: 0.5}}/>
              <PassengerInfo
                  fullname="Cao Gia Huy"
                  phone="0123456789"
                  birthday="01/01/2019"
                  gender="Male"
                  age="Adult"
                  identity="0123456789"
              />
          </View>

          <Space/>

          <Button
            title="NEXT"
            type="solid"
            buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
            containerStyle={{paddingHorizontal: 16, borderRadius: 0}}
            titleStyle={{fontSize: 16}}
            onPress={()=>{this.props.navigation.navigate("Tours")}}
          />

          <Space/>

      </ScrollView>
    )
  }
}

const Space = () => (
  <View style={styles.space}></View>
)

class ContactInfo extends Component {
  render(){
    const {firstTxt,secondTxt} = this.props;

    return(
      <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 0.4}}>{firstTxt} </Text>
          <Text style={{flex: 0.6, fontWeight: 'bold'}}>{secondTxt}</Text>
      </View>
    )
  }
}

class PassengerInfo extends Component {
  render(){
    const {fullname, age, birthday, gender, phone, identity} = this.props;

    return(
      <View style={{paddingVertical: 10}}>
          <Text style={{fontWeight: 'bold'}}>{fullname}</Text>
          <Text>{phone}</Text>
          <Text>{birthday}</Text>
          <Text>{gender}</Text>
          <Text>{age}</Text>
          <Text>{identity}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLOR_GRAY_BACKGROUND,
      paddingVertical: 10,
    },
    space: {
      paddingTop: 20,
      paddingBottom: 12,
      backgroundColor: COLOR_GRAY_BACKGROUND,
    },
    card: {
      backgroundColor: 'white',
      padding: 14,
      elevation: 1,
    },
});

export default BookingConfirmation;
