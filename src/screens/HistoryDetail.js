import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {  } from '../services/api';
import { COLOR_MAIN, COLOR_LIGHT_BLUE, COLOR_HARD_RED } from '../constants/index';
import { capitalize, priceFormat, dateFormat } from '../services/function';

import InfoText from '../components/InfoText';

class HistoryDetail extends Component {
  static navigationOptions = {
    title: 'Detail Booked Tour Information',
  };

  render() {
    const {info, passengers} = this.props.bookedTour;
    const {book_tour_contact_info} = this.props.bookedTour.info;

    let index = 0;
    let passengersList = passengers.map((val,key)=>{
      index += 1;
      return(
        <View key={key}>
            <PassengerInfo data={val}/>
            { index != passengers.length &&
              <Divider style={{height: 0.5}}/>
            }
        </View>
      )
    })


    return (
      <ScrollView style={styles.container}>
        <View style={styles.card}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 16}}>Code: </Text>
                <Text style={{fontSize: 16, color: 'orange', fontWeight: 'bold'}}>{'0000'+info.id}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 16}}>Status: </Text>
                <Text style={{fontSize: 16, color: COLOR_LIGHT_BLUE, fontWeight: 'bold'}}>{capitalize(info.status)}</Text>
            </View>
        </View>

        <InfoText text="Checkout information"/>

        <View style={styles.card}>
            <CheckoutInfo firstTxt="Adult price" secondTxt="2,000,000" thirdTxt="1"/>
            <CheckoutInfo firstTxt="Children price" secondTxt="1,000,000" thirdTxt="1"/>
            <DetailInfo firstTxt="Total price" secondTxt={priceFormat(info.total_pay)}/>
        </View>

        <InfoText text="Contact information"/>

        <View style={styles.card}>
            <DetailInfo firstTxt="Fullname" secondTxt={book_tour_contact_info.fullname}/>
            <DetailInfo firstTxt="Phone number" secondTxt={book_tour_contact_info.phone}/>
            <DetailInfo firstTxt="Email" secondTxt={book_tour_contact_info.email}/>
        </View>

        <InfoText text="Passenger information"/>

        <View style={styles.passengerCard}>
            {passengersList}
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

class CheckoutInfo extends Component {
  render(){
    const {firstTxt, secondTxt, thirdTxt} = this.props;
    return(
      <View style={{flexDirection: 'row'}}>
          <Text style={styles.firstTxt}>{firstTxt}</Text>
          <Text> </Text>
          <Text style={styles.secondTxt}>{secondTxt + ' x ' + thirdTxt}</Text>
      </View>
    )
  }
}

class PassengerInfo extends Component {
  render(){
    const {data} = this.props;

    return(
      <View style={{paddingVertical: 10}}>
          <Text style={{fontWeight: 'bold'}}>{data.fullname}</Text>
          { data.phone != null && <Text>{data.phone}</Text>}
          <Text>{dateFormat(data.birthdate)}</Text>
          <Text>{capitalize(data.sex)}</Text>
          <Text>{capitalize(data.type_passenger.name)}</Text>
          { data.passport != null && <Text>{data.passport}</Text>}
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

function mapStateToProps(state){
  return{
    bookedTour: state.bookedTour,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetail);
