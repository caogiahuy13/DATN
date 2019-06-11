import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Card, Icon, ListItem, Button, Divider } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import PayPal from 'react-native-paypal-wrapper';
import { subDays } from 'date-fns';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { COLOR_MAIN, COLOR_GRAY_BACKGROUND, COLOR_LIGHT_BLACK, COLOR_LIGHT_BLUE,
         CLIENT_ID_PAYPAL
} from '../constants/index';
import { bookingChangeInfo } from '../actions/index';
import localized from '../localization/index';
import { getRateCurrency } from '../services/apiWordpress';
import { dateFormat } from '../services/function';

import BookingStage from '../components/BookingStage';
import InfoText from '../components/InfoText';
import BookingTourCard from '../components/BookingTourCard';

class BookingPayment extends Component {
  static navigationOptions = {
    title: localized.paymentInfo,
  };

  constructor(props){
    super(props);
    this.state = {
      payType: 0,

      isPayInCashCollapsed: true,
      isPayByTransferCollapsed: true,
      isPayOnlineCollapsed: true,
    }
  }

  togglePayInCash(){
    this.setState({isPayInCashCollapsed: !this.state.isPayInCashCollapsed});
    this.setState({isPayByTransferCollapsed: true});
    this.setState({isPayOnlineCollapsed: true});
    this.setState({payType: 1});
  }
  togglePayByTransfer(){
    this.setState({isPayByTransferCollapsed: !this.state.isPayByTransferCollapsed});
    this.setState({isPayInCashCollapsed: true});
    this.setState({isPayOnlineCollapsed: true});
    this.setState({payType: 2});
  }
  togglePayOnline(){
    this.setState({isPayOnlineCollapsed: !this.state.isPayOnlineCollapsed});
    this.setState({isPayInCashCollapsed: true});
    this.setState({isPayByTransferCollapsed: true});
    this.setState({payType: 3});
  }

  onNextPress(){
    let {info} = this.props.booking;
    switch(this.state.payType){
      case 1:
        info.payment = 'incash';
        break;
      case 2:
        info.payment = 'transfer';
        break;
      case 3:
        info.payment = 'online';
        break;
    }

    this.props.bookingChangeInfo(info);
    this.props.navigation.navigate("BookingConfirmation");
  }

  paypalPress(){
    const {booking} = this.props;

    getRateCurrency().then((res)=>{
      priceUSD = Math.round(booking.info.total_pay/res.quotes.USDVND * 100)/100;

      PayPal.initialize(PayPal.SANDBOX, CLIENT_ID_PAYPAL);
      PayPal.pay({
        price: priceUSD.toString(),
        currency: 'USD',
        description: 'Your description goes here',
      }).then(confirm => {
          console.log(confirm);
          this.onNextPress();
        })
        .catch(error => console.log(error));
    })
  }

  getPayNote(){
    const {booking} = this.props;
    const checkout_days = 3;
    return (
      <Text style={{fontWeight: 'bold'}}>
          {localized.checkout_payment.note_pay_1 + " "}
          <Text style={{color: 'red'}}>{dateFormat(subDays(new Date(booking.tourTurn.start_date),checkout_days))}</Text>
          {". " + localized.checkout_payment.note_pay_2}
      </Text>
    )
  }

  render(){
    const {payType} = this.state;

    return(
      <ScrollView style={styles.container}>
          <BookingStage stage={2}/>

          <Space/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CardTitle
                      title={localized.checkout_payment.incash}
                      subTitle={localized.checkout_payment.sub_incash}
                      status={this.state.isPayInCashCollapsed}
                      payType={payType}
                      index={1}
                      onPress={()=>this.togglePayInCash()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={this.state.isPayInCashCollapsed}>
                <View>
                  <Text style={{marginBottom: 5, fontWeight: 'bold'}}>{localized.checkout_payment.office}</Text>
                  <Text><Text style={{fontWeight: 'bold'}}>{localized.checkout_payment.address}:</Text> 162 Ba Tháng Hai, Phường 12, Quận 10, TP.HCM</Text>
                  <Text><Text style={{fontWeight: 'bold'}}>{localized.checkout_payment.phone}:</Text> 0963186896</Text>
                  <Text><Text style={{fontWeight: 'bold'}}>Email:</Text> traveltour@gmail.com</Text>
                  <Text></Text>
                  {this.getPayNote()}
                </View>
              </Collapsible>
          </Card>

          <Space/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CardTitle
                      title={localized.checkout_payment.transfer}
                      subTitle={localized.checkout_payment.sub_transfer}
                      status={this.state.isPayByTransferCollapsed}
                      payType={payType}
                      index={2}
                      onPress={()=>this.togglePayByTransfer()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={this.state.isPayByTransferCollapsed}>
                <View>
                  <Text style={{fontWeight: 'bold', marginBottom: 5}}>{localized.checkout_payment.account}</Text>
                  <Text style={{fontWeight: 'bold'}}>{localized.checkout_payment.note}:</Text>
                  <Text style={{color: 'red'}}>{localized.checkout_payment.note_content}</Text>
                  <Text>{localized.checkout_payment.formula}</Text>
                  <Text style={{fontWeight: 'bold'}}>{localized.checkout_payment.formula_content}</Text>
                  <Text>{localized.checkout_payment.ex}</Text>
                  <View style={{marginBottom: 10}}></View>
                  <Text>{localized.checkout_payment.bank}</Text>
                  <Text>{localized.checkout_payment.account_number}: <Text style={{fontWeight: 'bold'}}>13422518A41</Text></Text>
                  <Text>{localized.checkout_payment.account_name}: <Text style={{fontWeight: 'bold'}}>TRAVEL TOUR</Text></Text>
                  <View style={{marginBottom: 10}}></View>
                  {this.getPayNote()}
                  <View style={{marginBottom: 10}}></View>
                  <Text>{localized.checkout_payment.thank}</Text>
                </View>
              </Collapsible>
          </Card>

          <Space/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CardTitle
                      title={localized.checkout_payment.online}
                      subTitle={localized.checkout_payment.sub_online}
                      status={this.state.isPayOnlineCollapsed}
                      payType={payType}
                      index={3}
                      onPress={()=>this.togglePayOnline()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={this.state.isPayOnlineCollapsed}>
                  <Icon
                    name='cc-paypal'
                    type='font-awesome'
                    size={40}
                    color={COLOR_LIGHT_BLUE}
                    onPress={()=>{this.paypalPress()}}
                  />
              </Collapsible>
          </Card>

          <Space/>

          <Button
            title="NEXT"
            type="solid"
            disabled = {(payType == 0 || payType == 3) ? true : false}
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

class CardTitle extends Component{
  render(){
    const {payType, index} = this.props;
    return(
      <View>
        <TouchableOpacity style={{flexDirection: 'row', flex: 1, paddingVertical: 10}} activeOpacity={0.7} onPress={this.props.onPress}>
          <View style={{flex: 1}}>
              <Text style={{flex: 1, fontWeight: 'bold', fontSize: 18, color: COLOR_LIGHT_BLACK, marginBottom: 5}}>
                  {this.props.title}
              </Text>
              <Text>{this.props.subTitle}</Text>
          </View>
          <Icon
            name='check'
            type='font-awesome'
            color={payType != index ? 'rgba(0,0,0,0.1)' : COLOR_MAIN}
            size={17}
            containerStyle={{justifyContent: 'center'}}
          />
        </TouchableOpacity>
        { !this.props.status && <Divider style={{height: 1, backgroundColor: '#F4F5F4'}}/> }
      </View>
    );
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
    cardContainer: {
      margin: 0,
      flex: 1,
      paddingVertical: 0,
      elevation: 1,
    },
    cardTitle: {
      alignSelf: 'flex-start',
      marginHorizontal: 8,
    },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(BookingPayment);
