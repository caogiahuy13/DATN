import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Divider, Button, CheckBox, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { tourDetailChangeId, tourDetailShowMarker } from '../actions/index.js';
import { getTourTurnById, createCancelBookingRequest } from '../services/api';
import { COLOR_MAIN, COLOR_LIGHT_BLUE, COLOR_HARD_RED } from '../constants/index';
import { capitalize, priceFormat, dateFormat, getGenderShow,
         getAgeShow, getAgePriceShow, getDaysDiff, getTourCode, bookedDateFormat, caculateRefund } from '../services/function';
import localized from '../localization/index';

import InfoText from '../components/InfoText';
import CancelTourCondition from '../components/CancelTourCondition';

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
        radio: 0,
      },

      showCondition: false,

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

    if (cancel.radio == 0 || (cancel.radio == 3 && cancel.reason == '')){
      Alert.alert("Error",localized.cancel_tour.reason_required)
    } else if (!cancel.isChecked) {
      Alert.alert("Error",localized.cancel_tour.not_agree);
    } else {
      this.callCreateCancelBookingRequest(info.id, cancel.reason)
          .then((res)=>{
            Alert.alert(
              localized.congratulation,
              localized.cancelBookingRequestSend,
              [
                {text: localized.ok, onPress: ()=>{
                  this._showCancelModal(false);
                  this.props.navigation.navigate("History")}
                },
              ],
              {cancelable: false},
            );
          })
    }
  }

  reasonRadioBox(text, index){
    let curReason = "";
    if (index == 1){
      curReason = localized.cancel_tour.busy;
    } else if (index == 2){
      curReason = localized.cancel_tour.sick;
    }
    return (
      <CheckBox
          title={text} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checked={this.state.cancel.radio == index}
          containerStyle={{margin: 0, padding: 0, borderRadius: 0, borderWidth: 0, backgroundColor: 'white'}}
          textStyle={{fontSize: 14, fontWeight: 'normal', color: 'gray'}}
          onPress={()=>{
            this.setState({
              cancel: {
                ...this.state.cancel,
                radio: index,
                reason: curReason,
              }
            })
          }}
      />
    )
  }
  // Hiển thị modal chọn giới tính
  _renderModalContent = () => {
    const {info} = this.props.bookedTour;
    const {tourInfo, cancel} = this.state;
    // console.log(this.props.bookedTour);

    return(
      <View style={styles.modalCancel}>
        <Text style={styles.cancelTitle}>{localized.cancelTour.toUpperCase()}</Text>

        { info.status == 'paid' &&
          <View>
            <View style={{flexDirection: 'row'}}>
                <Text>{localized.cancel_tour.refund_money}: </Text>
                { tourInfo &&
                  <Text style={{fontWeight: 'bold'}}>
                    {priceFormat(caculateRefund(info.total_pay, tourInfo.start_date, tourInfo.isHoliday))}
                  </Text>
                }
            </View>
            <Text></Text>
          </View>
        }

        <Text style={{fontSize: 16, paddingVertical: 6}}>{localized.yourReason}</Text>
        {this.reasonRadioBox(localized.cancel_tour.busy, 1)}
        {this.reasonRadioBox(localized.cancel_tour.sick, 2)}
        {this.reasonRadioBox(localized.cancel_tour.other, 3)}

        { this.state.cancel.radio == 3 &&
          <View>
              <Text></Text>
              <TextInput onChangeText={(val)=>{this.changeReason(val)}} value={cancel.reason} multiline style={styles.reason}/>
          </View>
        }

        <Text></Text>

        <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{this.setState({showCondition: !this.state.showCondition})}}>
            <Text style={{fontSize: 16, paddingVertical: 6}}>{localized.termsCondition}</Text>
            <Icon name='caret-down' type='font-awesome' color='gray' size={20} containerStyle={{justifyContent: 'center', marginLeft: 8, padding: 0}}/>
        </TouchableOpacity>

        { this.state.showCondition &&
          <ScrollView style={{height: 200, padding: 10, marginBottom: 10, borderWidth: 0.5, borderColor: 'gray'}}>
              <CancelTourCondition/>
          </ScrollView>
        }
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

  onSchedulePress(){
    const idTour = this.state.tourInfo.tour.id;
    const idTourTurn = this.state.tourInfo.id;

    this.props.tourDetailChangeId(idTour);
    this.props.tourDetailShowMarker(false);

    this.props.navigation.navigate("Schedule", {
      idTour: idTour,
      idTourTurn: idTourTurn,
    });
  }

  getPassengers(){
    const {passengers} = this.props.bookedTour;
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
    return passengersList;
  }
  getPassengerPrice(){
    const {info} = this.props.bookedTour;
    let passengerPrice = info.type_passenger_detail.map((val,key)=>{
      if (val.num_passenger > 0){
        return(<CheckoutInfo key={key} firstTxt={getAgePriceShow(val.type)} secondTxt={priceFormat(val.price)} thirdTxt={val.num_passenger}/>);
      } else {
        return(<View key={key}></View>)
      }
    })
    return passengerPrice;
  }

  isInTour(){
    const {tourInfo} = this.state;

    if (!tourInfo) return false;

    let startDate = tourInfo ? new Date(tourInfo.start_date) : new Date();
    startDate.setHours(0,0,0,0);
    let endDate = tourInfo ? new Date(tourInfo.end_date) : new Date();
    endDate.setHours(24,0,0,0);
    var curDate = new Date();
    console.log(curDate);
    console.log(startDate);
    console.log(endDate);
    return (curDate >= startDate && curDate <= endDate) ? true : false;
    // return (curDate >= startDate) ? true : false;
  }

  isTourEnd(){
    const {tourInfo} = this.state;

    let endDate = tourInfo ? new Date(tourInfo.end_date) : new Date();
    endDate.setHours(24,0,0,0);
    var curDate = new Date();

    return (curDate <= endDate) ? true : false;
  }

  isTourStarted(){
    const {tourInfo} = this.state;

    let startDate = tourInfo ? new Date(tourInfo.start_date) : new Date();
    startDate.setHours(0,0,0,0);
    var curDate = new Date();

    return (curDate < startDate) ? false : true;
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

    let passengersList = this.getPassengers();
    let passengerPrice = this.getPassengerPrice();

    const cancel_info = this.props.bookedTour.info.cancel_bookings[0];
    let requestOfflinePerson = null;
    let refundMessage = null;
    if (cancel_info){
      if (cancel_info.request_offline_person != null){
        requestOfflinePerson = JSON.parse(cancel_info.request_offline_person);
      }
      if (cancel_info.refund_message != null){
        refundMessage = JSON.parse(cancel_info.refund_message);
      }
    }

    let messagePay = null;
    if (info.message_pay){
      messagePay = JSON.parse(info.message_pay);
    }

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
                <Text style={{fontSize: 16, color: 'orange', fontWeight: 'bold'}}>{info.code}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 16}}>{localized.status}: </Text>
                <Text style={{fontSize: 16, color: COLOR_LIGHT_BLUE, fontWeight: 'bold'}}>{localized.detail_booked_tour[info.status]}</Text>
            </View>

            { cancel_info &&
              <View>
                  { cancel_info.confirm_time && !!cancel_info.money_refunded &&
                    cancel_info.refund_period && info.status == 'confirm_cancel' &&
                    <View>
                        <Text></Text>
                        { cancel_info.request_offline_person &&
                            <View>
                                <ExtraInfo first={localized.detail_booked_tour.people_cancel} second={requestOfflinePerson.name}/>
                                <ExtraInfo first={localized.detail_booked_tour.passport + ":"} second={requestOfflinePerson.passport}/>
                            </View>
                        }
                        <ExtraInfo first={localized.detail_booked_tour.confirm_cancel_content} second={bookedDateFormat(cancel_info.confirm_time)}/>
                        <ExtraInfo first={localized.detail_booked_tour.refund_money} second={priceFormat(cancel_info.money_refunded)}/>
                        <Text></Text>
                        <ExtraInfo first={localized.detail_booked_tour.refund_note} second=""/>
                        <ExtraInfo first={localized.detail_booked_tour.refund_period} second={dateFormat(cancel_info.refund_period)}/>
                    </View>
                  }

                  { cancel_info.refunded_time && !!cancel_info.money_refunded &&
                    info.status === 'refunded' &&
                    <View>
                        <Text></Text>
                        { cancel_info.refund_message &&
                          <View>
                              <ExtraInfo
                                  first={refundMessage.helper == true ? localized.detail_booked_tour.people_refund_help : localized.detail_booked_tour.people_refund}
                                  second={refundMessage.name}
                              />
                              <ExtraInfo first={localized.detail_booked_tour.passport + ":"} second={refundMessage.passport}/>
                          </View>
                        }
                        <ExtraInfo first={localized.detail_booked_tour.refund_time} second={dateFormat(cancel_info.refunded_time)}/>
                        <ExtraInfo first={localized.detail_booked_tour.refund_money} second={priceFormat(cancel_info.money_refunded)}/>
                    </View>
                  }
              </View>
            }
        </View>

        <InfoText text={localized.tourInfo}/>
        <View style={styles.card}>
            { tourInfo != null && <TourInfo data={tourInfo}/> }
        </View>

        <InfoText text={localized.checkoutInfo}/>

        <View style={styles.card}>
            <DetailInfo firstTxt={localized.detail_booked_tour.method} secondTxt={localized.detail_booked_tour[info.payment_method.name]}/>
            { info.message_pay && info.status !== 'booked' && info.status !== 'cancelled' &&
              <View>
                  <DetailInfo
                      firstTxt={messagePay.helper == true ? localized.detail_booked_tour.people_pay_help : localized.detail_booked_tour.people_pay}
                      secondTxt={messagePay.name}
                  />
                  <DetailInfo firstTxt={localized.detail_booked_tour.passport} secondTxt={messagePay.passport}/>
              </View>
            }
            <Text></Text>
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

        <View style={{padding: 16}}>
            { this.isInTour() && info.status == 'paid' &&
              <Button
                title={localized.schedule.toUpperCase()}
                type="solid"
                buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
                containerStyle={{paddingBottom: 20, borderRadius: 0}}
                titleStyle={{fontSize: 16}}
                onPress={()=>{this.onSchedulePress()}}
              />
            }

            { !this.isTourStarted() && info.cancel_bookings.length == 0 &&
              (info.status == 'booked' || info.status == 'paid') &&
              <Button
                title={localized.cancelTour.toUpperCase()}
                type="solid"
                buttonStyle={{backgroundColor: COLOR_HARD_RED, borderRadius: 0}}
                containerStyle={{paddingBottom: 4, borderRadius: 0}}
                titleStyle={{fontSize: 16}}
                onPress={()=>{this._showCancelModal(true)}}
                //onPress={()=>{this.props.navigation.navigate("CancelBooking")}}
              />
            }

        </View>


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
          <DetailInfo firstTxt={localized.name} secondTxt={data.fullname}/>
          { data.phone != null && <DetailInfo firstTxt={localized.phone} secondTxt={data.phone}/>}
          <DetailInfo firstTxt={localized.birthdate} secondTxt={dateFormat(data.birthdate)}/>
          <DetailInfo firstTxt={localized.gender} secondTxt={getGenderShow(data.sex)}/>
          <DetailInfo firstTxt={localized.ageType} secondTxt={getAgeShow(data.type_passenger.name)}/>
          { data.passport != null && <DetailInfo firstTxt={localized.passport} secondTxt={data.passport}/>}
      </View>
    )
  }
}

class ExtraInfo extends Component {
  render(){
    const {first, second} = this.props;
    return(
      <View style={{flexDirection: 'row'}}>
          <Text>{first } </Text>
          <Text style={{fontWeight: 'bold'}}>{second}</Text>
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
      minHeight: 50,
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
    tourDetailChangeId: tourDetailChangeId,
    tourDetailShowMarker: tourDetailShowMarker,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetail);
