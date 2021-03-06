import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, AsyncStorage, Alert } from 'react-native';
import { Card, Icon, Button, Divider } from 'react-native-elements';
import Moment from 'moment';
import { StackActions, NavigationActions } from 'react-navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { COLOR_MAIN, COLOR_GRAY_BACKGROUND, COLOR_LIGHT_BLACK, COLOR_LIGHT_BLUE } from '../constants/index';
import { bookingChangeInfo, bookingIsBooking, screenSetPrevious } from '../actions/index';
import { bookNewTour } from '../services/api';
import { getGenderShow, getAgeShow } from '../services/function';
import localized from '../localization/index';

import BookingStage from '../components/BookingStage';
import InfoText from '../components/InfoText';
import BookingTourCard from '../components/BookingTourCard';

class BookingConfirmation extends Component {
  static navigationOptions = {
    title: localized.confirmBooking,
  };

  constructor(props){
    super(props);
    this.state = {

    }
  }

  async callBookNewTour(){
    const {info} = this.props.booking;
    let status;

    return bookNewTour(info)
          .then((response) => {
              status = response.status;
              return response.json();
            })
           .then((responseJson) => {
              if (status != 200){
                Alert.alert(responseJson.msg);
              } else {
                Alert.alert(
                  localized.congratulation,
                  localized.successBooking,
                  [
                    {
                      text: localized.ok,
                      onPress: () => {
                        this.props.navigation.dispatch(StackActions.popToTop());
                        // this.props.navigation.navigate("Tours")
                      }
                    },
                  ],
                  {cancelable: false},
                );
              }
           })
           .catch((error) => console.error(error));
  }

  onButtonPress(){
    const {navigation} = this.props;

    AsyncStorage.getItem('userToken')
                .then((data)=>{
                  if (data == null){
                    this.props.screenSetPrevious('BookingConfirmation');
                    navigation.navigate("Login");
                  } else if (data != null){
                    this.callBookNewTour()
                        .then(()=>{
                          // Alert.alert(
                          //   'Congratulations',
                          //   'Successful booking tour!',
                          //   [
                          //     {text: 'OK', onPress: () => navigation.navigate("Tours")},
                          //   ],
                          //   {cancelable: false},
                          // );
                          // navigation.navigate("Tours");
                        });
                  }
                })
  }

  render(){
    const {info, tourTurn, number} = this.props.booking;
    console.log(this.props.booking);

    let index = 0;
    let passengers = info.passengers.map((val,key)=>{
      index += 1;
      return(
        <View key={key}>
            <PassengerInfo data={val}/>
            { (index != info.passengers.length) &&
              <Divider style={{height: 0.5}}/>
            }
        </View>
      );
    })

    return(
      <View style={{flex: 1, backgroundColor: '#F4F5F4'}}>
          <ScrollView style={styles.container}>
              <BookingStage stage={3}/>

              <Space/>

              <BookingTourCard data={tourTurn} number={number}/>

              <InfoText text={localized.detail_booked_tour.method}/>

              <View style={styles.card}>
                  <Text>{localized.detail_booked_tour[info.payment]}</Text>
              </View>

              <InfoText text={localized.contactInfo+":"}/>

              <View style={styles.card}>
                  <ContactInfo firstTxt={localized.fullname+":"} secondTxt={info.fullname}/>
                  <ContactInfo firstTxt={localized.phone+":"} secondTxt={info.phone}/>
                  <ContactInfo firstTxt={localized.email+":"} secondTxt={info.email}/>
                  <ContactInfo firstTxt={localized.address+":"} secondTxt={info.address}/>
              </View>

              <InfoText text={localized.passengerInfo+":"}/>

              <View style={styles.card}>
                  {passengers}
              </View>

              <Space/>

          </ScrollView>

          <Button
            title={localized.bookTour.toUpperCase()}
            type="solid"
            buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
            containerStyle={{padding: 0, borderRadius: 0}}
            titleStyle={{fontSize: 16}}
            onPress={()=>{this.onButtonPress()}}
          />
      </View>
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
    const {fullname, phone, birthdate, sex, passport, type} = this.props.data;

    return(
      <View style={{paddingVertical: 10}}>
          <ContactInfo firstTxt={localized.fullname+":"} secondTxt={fullname}/>
          <ContactInfo firstTxt={localized.birthdate+":"} secondTxt={Moment(birthdate).format('DD/MM/YYYY')}/>
          <ContactInfo firstTxt={localized.gender+":"} secondTxt={getGenderShow(sex)}/>
          <ContactInfo firstTxt={localized.ageType+":"} secondTxt={getAgeShow(type)}/>
          { phone != '' && <ContactInfo firstTxt={localized.phone+":"} secondTxt={phone}/> }
          { passport != '' && <ContactInfo firstTxt={localized.passport+":"} secondTxt={passport}/> }
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

function mapStateToProps(state){
  return{
    booking: state.booking,
    screenManage: state.screenManage,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    bookingIsBooking: bookingIsBooking,
    screenSetPrevious: screenSetPrevious,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingConfirmation);
