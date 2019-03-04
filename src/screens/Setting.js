import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { ListItem, Divider, Avatar, Icon } from 'react-native-elements'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import Modal from 'react-native-modal';

const deviceWidth = Dimensions.get("window").width;

export default class Setting extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      birthday: '1997-07-30T00:00:00',
      isGenderModalVisible: false,
      isMale: true,
    }
  }

  //Các hàm quản lý DateTimePicker*
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => {
    this.setState({birthday: date});
    this._hideDateTimePicker();
  };

  //Các hàm quản lý GenderModal
  _hideGenderModal = () => this.setState({ isGenderModalVisible: false });
  _showGenderModal = () => this.setState({ isGenderModalVisible: true });
  _handleGenderModal = (isMale) => {
    this.setState({isMale: isMale});
    this._hideGenderModal();
  };

  _renderModalContent = (isMale) => (
    <View style={styles.modalGender}>
        <View style={{position: 'relative', flexDirection: 'row'}}>
          <ListItem
            style={{flex: 1,}}
            title="Choose Gender"
            onPress={() => {this._hideGenderModal()}}
            containerStyle={styles.listItemContainer}
            rightIcon={<Icon
              name='close'
              type='FontAwesome'
              color='#D1D1D6'/>}
          />
        </View>
        <View style={{position: 'relative', flexDirection: 'row'}}>
          <ListItem
            style={{flex: 1,}}
            title="Male"
            onPress={() => {this._handleGenderModal(true)}}
            containerStyle={styles.listItemContainer}
            rightIcon={this.state.isMale && <Icon
              name='check'
              type='entypo'
              color='#00BFFF' />}
          />
        </View>
        <View style={{position: 'relative', flexDirection: 'row'}}>
          <ListItem
            style={{flex: 1,}}
            title="Female"
            onPress={() => {this._handleGenderModal(false)}}
            containerStyle={styles.listItemContainer}
            rightIcon={!this.state.isMale && <Icon
              name='check'
              type='entypo'
              color='#00BFFF' />}
          />
        </View>
    </View>
  );

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
        <Modal
          isVisible={this.state.isGenderModalVisible}
          onBackdropPress={()=>{this.setState({isGenderModalVisible: false})}}
        >
          {this._renderModalContent()}
        </Modal>

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
          title="Email"
          rightTitle="caogiahuy13@gmail.com"
          rightTitleStyle={{fontSize: 15, position: 'absolute', width: deviceWidth/2, textAlign: 'right'}}
          onPress={() => {Alert.alert("ABC")}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
        />
        <ListItem
          title="Gender"
          rightTitle={this.state.isMale ? "Male" : "Female"}
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this.setState({isGenderModalVisible: true})}}
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
          title="Change Password"
          onPress={() => {Alert.alert()}}
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
  <View style={styles.containerInfoText}></View>
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
    modalGender: {
      backgroundColor: 'white',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
    },
})
