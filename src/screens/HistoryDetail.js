import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Alert } from 'react-native';
import { Divider, Button, CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { getTourTurnById, createCancelBookingRequest } from '../services/api';
import { COLOR_MAIN, COLOR_LIGHT_BLUE, COLOR_HARD_RED } from '../constants/index';
import { capitalize, priceFormat, dateFormat, getGenderShow,
         getAgeShow, getAgePriceShow, getDaysDiff, getTourCode, bookedDateFormat } from '../services/function';
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
      cancel: {
        reason: '',
        isChecked: false,
      },

      isCancelModalVisible: false,
    }
  }

  async callGetTourTurnById(id){
    return getTourTurnById(id)
            .then((response) => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => console.error(error));
  }
  async callCreateCancelBookingRequest(idBookTour, message){
    return createCancelBookingRequest(idBookTour, message)
            .then((response) => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => console.error(error));
  }

  //Các hàm quản lý CancelModal
  _showCancelModal = (visible) => this.setState({ isCancelModalVisible: visible });
  _handleCancelModal = () => {
    this._showCancelModal(false);
  };
  changeReason(reason){
    this.setState({
      cancel: {
        ...this.state.cancel,
        reason: reason,
      }
    });
  }
  handleCheckBox(){
    this.setState({
      cancel: {
        ...this.state.cancel,
        isChecked: !this.state.cancel.isChecked,
      }
    });
  }
  onCanCelPress(){
    const {info} = this.props.bookedTour;
    const {cancel} = this.state;

    if (!cancel.isChecked){
      Alert.alert(localized.agreeAlert);
    } else {
      this.callCreateCancelBookingRequest(info.id, cancel.reason)
          .then((res)=>{
            Alert.alert(
              localized.congratulation,
              localized.cancelBookingRequestSend,
              [
                {text: localized.ok, onPress: ()=>{
                  this._showCancelModal(false);
                  this.props.navigation.navigate("History2")}
                },
              ],
              {cancelable: false},
            );
          })
    }
  }
  // Hiển thị modal chọn giới tính
  _renderModalContent = () => {
    const {info} = this.props.bookedTour;
    const {tourInfo, cancel} = this.state;
    // console.log(this.props.bookedTour);
    return(
      <View style={styles.modalCancel}>
        <Text style={styles.cancelTitle}>{localized.cancelTour.toUpperCase()}</Text>

        <Text style={{fontSize: 16, paddingVertical: 6}}>{localized.yourReason}</Text>
        <TextInput onChangeText={(val)=>{this.changeReason(val)}} value={cancel.reason} multiline style={styles.reason}/>

        <Text></Text>
        <Text style={{fontSize: 16, paddingVertical: 6}}>{localized.termsCondition}</Text>
        <ScrollView style={{height: 100, padding: 10, borderWidth: 0.5, borderColor: 'gray'}}>
            <Text> Lorem Ipsum Lorem Ipsumvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv</Text>
        </ScrollView>
        <CheckBox
          title={localized.agreeCondition}
          checked={cancel.isChecked}
          onPress={() => this.handleCheckBox()}
          containerStyle={styles.checkBoxContainer}
          textStyle={styles.checkBoxText}
        />

        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}></View>
            <Button
              title={localized.cancel}
              type="clear"
              buttonStyle={{borderRadius: 0}}
              containerStyle={{marginHorizontal: 6}}
              titleStyle={{fontSize: 16, paddingHorizontal: 12}}
              onPress={()=>{this._showCancelModal(false)}}
            />
            <Button
              title={localized.ok}
              type="solid"
              buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0, marginHorizontal: 6}}
              titleStyle={{fontSize: 16, paddingHorizontal: 12}}
              onPress={()=>{this.onCanCelPress()}}
            />
        </View>
      </View>
    );
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

    let passengerPrice = info.type_passenger_detail.map((val,key)=>{
      if (val.num_passenger > 0){
        return(<CheckoutInfo key={key} firstTxt={getAgePriceShow(val.type)} secondTxt={priceFormat(val.price)} thirdTxt={val.num_passenger}/>);
      } else {
        return(<View key={key}></View>)
      }
    })

    return (
      <ScrollView style={styles.container}>
        <Modal
          isVisible={this.state.isCancelModalVisible}
          onBackdropPress={()=>{this._showCancelModal(false)}}
        >
          {this._renderModalContent()}
        </Modal>

        <View style={styles.card}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 16}}>{localized.code}: </Text>
                <Text style={{fontSize: 16, color: 'orange', fontWeight: 'bold'}}>{getTourCode(info.id)}</Text>
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
            {passengerPrice}
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
          onPress={()=>{this._showCancelModal(true)}}
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
          <Text style={styles.secondTxt}>{secondTxt}{' x ' + thirdTxt}</Text>
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
    },
    modalCancel: {
      backgroundColor: 'white',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      padding: 12,
    },
    cancelTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      alignItems: 'center',
      alignSelf: 'center',
      padding: 10,
    },
    checkBoxContainer: {
      backgroundColor: 'white',
      paddingVertical: 12,
      paddingHorizontal: 0,
      margin: 0,
      borderWidth: 0
    },
    checkBoxText: {
      fontSize: 13,
      fontWeight: 'normal',
      color: 'gray',
      margin: 0,
      padding: 0,
    },
    reason: {
      minHeight: 150,
      height: 'auto',
      borderWidth: 0.5,
      borderColor: 'gray',
      color: 'gray',
      padding: 10,
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
