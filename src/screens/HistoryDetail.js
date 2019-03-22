import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider, Button } from 'react-native-elements';

import {  } from '../services/api';
import { COLOR_MAIN, COLOR_LIGHT_BLUE, COLOR_HARD_RED } from '../constants/index';

import InfoText from '../components/InfoText';

class HistoryDetail extends Component {
  static navigationOptions = {
    title: 'Detail booked tour information',
  };

  constructor(props){
    super(props);
    this.state = {
      tours: {},
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.card}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 16}}>Code: </Text>
                <Text style={{fontSize: 16, color: 'orange', fontWeight: 'bold'}}>0009522</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 16}}>Status: </Text>
                <Text style={{fontSize: 16, color: COLOR_LIGHT_BLUE, fontWeight: 'bold'}}>New</Text>
            </View>
        </View>

        <InfoText text="Checkout information"/>

        <View style={styles.card}>
            <DetailInfo firstTxt="Adult price" secondTxt="2,000,000 x 1"/>
            <DetailInfo firstTxt="Children price" secondTxt="1,000,000 x 1"/>
            <DetailInfo firstTxt="Total price" secondTxt="3,000,000"/>
        </View>

        <InfoText text="Contact information"/>

        <View style={styles.card}>
            <DetailInfo firstTxt="Fullname" secondTxt="Cao Gia Huy"/>
            <DetailInfo firstTxt="Phone number" secondTxt="0123456777"/>
            <DetailInfo firstTxt="Email" secondTxt="cghuy@gmail.com"/>
        </View>

        <InfoText text="Passenger information"/>

        <View style={styles.passengerCard}>
            <PassengerInfo/>
            <Divider style={{height: 0.5}}/>
            <PassengerInfo/>
        </View>

        <Button
          title="CANCEL TOUR"
          type="solid"
          buttonStyle={{backgroundColor: COLOR_HARD_RED, borderRadius: 0}}
          containerStyle={{paddingHorizontal: 16, paddingVertical: 20, borderRadius: 0}}
          titleStyle={{fontSize: 16}}
          onPress={()=>{}}
        />

      </ScrollView>
    );
  }
}

class DetailInfo extends Component {
  render(){
    const {firstTxt, secondTxt} = this.props;
    return(
      <View style={{flexDirection: 'row'}}>
          <Text style={styles.firstTxt}>{firstTxt}</Text>
          <Text> </Text>
          <Text style={styles.secondTxt}>{secondTxt}</Text>
      </View>
    )
  }
}

class PassengerInfo extends Component {
  render(){
    return(
      <View style={{paddingVertical: 10}}>
          <Text style={{fontWeight: 'bold'}}>Cao Gia Huy</Text>
          <Text>0123456777</Text>
          <Text>01/01/1997</Text>
          <Text>Male</Text>
          <Text>227 Nguyen Van Cu</Text>
          <Text>123456789</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F5F4',
    },
    card: {
      backgroundColor: 'white',
      padding: 14,
      elevation: 1,
    },
    passengerCard: {
      backgroundColor: 'white',
      elevation: 1,
      paddingHorizontal: 14,
      paddingVertical: 4,
    },
    firstTxt: {
      flex: 0.4,
    },
    secondTxt: {
      flex: 0.6,
      fontWeight: 'bold',
    }
})

export default HistoryDetail;
