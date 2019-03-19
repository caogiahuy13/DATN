import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Icon, ListItem, Button, Divider } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

import { COLOR_MAIN, COLOR_GRAY_BACKGROUND, COLOR_LIGHT_BLACK, COLOR_LIGHT_BLUE } from '../constants/index';

import BookingStage from '../components/BookingStage';
import InfoText from '../components/InfoText';
import BookingTourCard from '../components/BookingTourCard';

class BookingPayment extends Component {
  constructor(props){
    super(props);
    this.state = {
      payType: 0,

      isPayInCashCollapsed: true,
      isPayByTransferCollapsed: true,
    }
  }

  togglePayInCash(){
    this.setState({isPayInCashCollapsed: !this.state.isPayInCashCollapsed});
    this.setState({isPayByTransferCollapsed: true});
    this.setState({payType: 1});
  }
  togglePayByTransfer(){
    this.setState({isPayByTransferCollapsed: !this.state.isPayByTransferCollapsed});
    this.setState({isPayInCashCollapsed: true});
    this.setState({payType: 2});
  }

  render(){
    return(
      <ScrollView style={styles.container}>
          <BookingStage stage={2}/>

          <Space/>

          <BookingTourCard/>

          <Space/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CardTitle
                      title="Pay in cash at Travel Tour Office"
                      subTitle="Please come to Travel Tour Office for payment and receive ticket"
                      status={this.state.isPayInCashCollapsed}
                      payType={this.state.payType}
                      index={1}
                      onPress={()=>this.togglePayInCash()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={this.state.isPayInCashCollapsed}>
                <View>
                  <Text style={{marginBottom: 5, fontWeight: 'bold'}}>TRAVELTOUR OFFICE</Text>
                  <Text><Text style={{fontWeight: 'bold'}}>Address:</Text> 162 Ba Tháng Hai, Phường 12, Quận 10, TP.HCM</Text>
                  <Text><Text style={{fontWeight: 'bold'}}>Phone number:</Text> 0963186896</Text>
                  <Text><Text style={{fontWeight: 'bold'}}>Email:</Text> traveltour@gmail.com</Text>
                </View>
              </Collapsible>
          </Card>

          <Space/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CardTitle
                      title="Pay by transfer money through banking"
                      subTitle="After you transfer money successfully, our staff will contact you by email or telephone"
                      status={this.state.isPayByTransferCollapsed}
                      payType={this.state.payType}
                      index={2}
                      onPress={()=>this.togglePayByTransfer()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={this.state.isPayByTransferCollapsed}>
                <View>
                  <Text style={{fontWeight: 'bold', marginBottom: 5}}>TRAVELTOUR BANKING ACCOUNT</Text>
                  <Text style={{fontWeight: 'bold'}}>Note:</Text>
                  <Text style={{color: 'red'}}>Please contact our staffs to confirm your booking before tranfering</Text>
                  <Text>When you transfer money, the message should be</Text>
                  <Text style={{fontWeight: 'bold'}}>"MT TourCode, Fullname, Content"</Text>
                  <Text>For example: "MT 00001, Williams, Booking tour on website"</Text>
                  <View style={{marginBottom: 10}}></View>
                  <Text>Banking account of Travel Tour Company at Vietcombank Hồ Chí Minh City - VCB</Text>
                  <Text>Account number: <Text style={{fontWeight: 'bold'}}>13422518A41</Text></Text>
                  <View style={{marginBottom: 10}}></View>
                  <Text>Thank you very much!</Text>
                </View>
              </Collapsible>
          </Card>

          <Space/>

          <Button
            title="NEXT"
            type="solid"
            buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
            containerStyle={{paddingHorizontal: 16, borderRadius: 0}}
            titleStyle={{fontSize: 16}}
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

export default BookingPayment;
