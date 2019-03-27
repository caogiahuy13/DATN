import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { getTourTurnById } from '../services/api';
import { COLOR_MAIN, COLOR_LIGHT_BLUE, COLOR_HARD_RED } from '../constants/index';
import { capitalize, priceFormat, dateFormat, getGenderShow, getAgeShow, getDaysDiff, getTourCode } from '../services/function';
import localized from '../localization/index';

import InfoText from '../components/InfoText';

class HistoryDetail extends Component {
  static navigationOptions = {
    title: localized.detailBookedTour,
  };

  constructor(props){
    super(props);
    this.state = {
      tourInfo: null,
    }
  }
  async callGetTourTurnById(id){
    return getTourTurnById(id)
            .then((response) => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => console.error(error));
  }

  componentWillMount(){
    const {fk_tour_turn} = this.props.bookedTour.info;
    this.callGetTourTurnById(fk_tour_turn)
        .then((res)=>{
          this.setState({tourInfo: res.data});
        })
  }

  render() {
    const {info, passengers} = this.props.bookedTour;
    const {book_tour_contact_info} = this.props.bookedTour.info;
    const {tourInfo} = this.state;

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
                <Text style={{fontSize: 16}}>{localized.code}: </Text>
                <Text style={{fontSize: 16, color: 'orange', fontWeight: 'bold'}}>{'0000'+info.id}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 16}}>{localized.status}: </Text>
                <Text style={{fontSize: 16, color: COLOR_LIGHT_BLUE, fontWeight: 'bold'}}>{capitalize(info.status)}</Text>
            </View>
        </View>

        <InfoText text={localized.tourInfo}/>
        <View style={styles.card}>
            { tourInfo != null && <TourInfo data={tourInfo}/> }
        </View>

        <InfoText text={localized.checkoutInfo}/>

        <View style={styles.card}>
            <CheckoutInfo firstTxt={localized.adultPrice} secondTxt="2,000,000" thirdTxt="1"/>
            <CheckoutInfo firstTxt={localized.childrenPrice} secondTxt="1,000,000" thirdTxt="1"/>
            <DetailInfo firstTxt={localized.totalPrice} secondTxt={priceFormat(info.total_pay)}/>
        </View>

        <InfoText text={localized.contactInfo}/>

        <View style={styles.card}>
            <DetailInfo firstTxt={localized.fullname} secondTxt={book_tour_contact_info.fullname}/>
            <DetailInfo firstTxt={localized.phone} secondTxt={book_tour_contact_info.phone}/>
            <DetailInfo firstTxt={localized.email} secondTxt={book_tour_contact_info.email}/>
        </View>

        <InfoText text={localized.passengerInfo}/>

        <View style={styles.passengerCard}>
            {passengersList}
        </View>

        <Button
          title={localized.cancelTour.toUpperCase()}
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

class TourInfo extends Component {
  render(){
    const {data} = this.props;
    const {tour} = this.props.data;

    return(
      <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.4, justifyContent: 'flex-start', paddingRight: 12}}>
              <Image style={{flex: 1, width: undefined, height: undefined}} source={{uri: tour.featured_img}}/>
          </View>
          <View style={{flex: 0.6}}>
              <Text style={{fontWeight: 'bold', paddingVertical: 4}}>{tour.name}</Text>
              <Text>{localized.code + ": " + getTourCode(data.id)}</Text>
              <Text>{localized.startDate + ": " + dateFormat(data.start_date)}</Text>
              <Text>{localized.endDate + ": " + dateFormat(data.end_date)}</Text>
              <Text>{localized.lasting + ": " + getDaysDiff(data.start_date, data.end_date)}</Text>
          </View>
      </View>
    )
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
          <Text>{getGenderShow(data.sex)}</Text>
          <Text>{getAgeShow(data.type_passenger.name)}</Text>
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
