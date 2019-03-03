import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { ListItem, Divider, Avatar, Icon } from 'react-native-elements'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';

const deviceWidth = Dimensions.get("window").width;

export default class Setting extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      birthday: '1997-07-30T00:00:00',
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({birthday: date});
    this._hideDateTimePicker();
  };

  render() {
    Moment.locale('en');

    return (
      <ScrollView style={styles.scroll}>
      <DateTimePicker
        datePickerModeAndroid='spinner'
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this._handleDatePicked}
        onCancel={this._hideDateTimePicker}

      />
        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              onPress={()=>{Alert.alert("Test")}}
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>Cao Gia Huy</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 14,
              }}
            >
              "caogiahuy13@gmail.com"
            </Text>
          </View>
        </View>

        <InfoText text="Account"/>

        <ListItem
          title="Currency"
          onPress={() => {Alert.alert("ABC")}}
          containerStyle={styles.listItemContainer}
          leftIcon={
            <Icon
              name='log-out'
              type='entypo'
              color='#00aced' />
          }
          rightIcon={<Chevron />}
        />

        <InfoText text="Account"/>
        <ListItem
          title="Email"
          rightTitle="caogiahuy13@gmail.com"
          rightTitleStyle={{fontSize: 15, position: 'absolute', width: deviceWidth/2, textAlign: 'right'}}
          onPress={() => {Alert.alert("ABC")}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
        />
        <ListItem
          title="Gender"
          rightTitle="Male"
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {Alert.alert("ABC")}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
        />
        <ListItem
          title="Birthday"
          rightTitle={Moment(this.state.birthday).format('DD/MM/YYYY')}
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this._showDateTimePicker()}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
        />
        <Space/>
        <ListItem
          title="Log out"
          titleStyle = {{textAlign: 'center', color: 'rgb(178,34,34)'}}
          onPress={()=>{Alert.alert("Loged out")}}
        />

      </ScrollView>
    );
  }
}

const InfoText = ({ text }) => (
  <View style={styles.containerInfoText}>
    <Text style={styles.infoText}>{text}</Text>
  </View>
)

const Space = () => (
  <View style={styles.containerInfoText}>
  </View>
)

// Dấu '>' phía cuối ListItem
const Chevron = () => (
  <Icon
    name="chevron-right"
    type="entypo"
    containerStyle={{ marginLeft: -15, width: 20 }}
    color='#D1D1D6'
  />
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
      fontSize: 20,
    },
    containerInfoText: {
      paddingTop: 20,
      paddingBottom: 12,
      backgroundColor: '#F4F5F4',
    },
    infoText: {
      fontSize: 16,
      marginLeft: 20,
      color: 'gray',
      fontWeight: '500',
    },
    userRow: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: 8,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 6,
      backgroundColor: 'white'
    },
    userImage: {
      marginRight: 12,
    },
    listItemContainer: {
      height: 55,
      borderWidth: 0.5,
      borderColor: '#ECECEC',
    },
    scroll: {
      backgroundColor: '#F4F5F4',
    },
})
