import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, Dimensions, AsyncStorage } from 'react-native';
import { ListItem, Divider, Avatar, Icon } from 'react-native-elements'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import Modal from 'react-native-modal';
import Dialog from "react-native-dialog";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { handleAccess, changeProfile } from '../actions/index.js';

const deviceWidth = Dimensions.get("window").width;

class Setting extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);

    AsyncStorage.getItem('profile').then((data)=>{
      this.props.changeProfile(JSON.parse(data));
    })

    this.state = {
      birthday: '1997-07-30T00:00:00',
      isMale: true,
      isGenderModalVisible: false,
      isDateTimePickerVisible: false,
      isEmailModalVisible: false,
      isLogedIn: false,
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
  _hideEmailModal = () => this.setState({ isEmailModalVisible: false });
  _showEmailModal = () => this.setState({ isEmailModalVisible: true });
  _handleEmailModal = (email) => {
    this.setState({email: email});
    this._hideEmailModal();
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

  async CheckLogedIn(){
    await AsyncStorage.getItem('userToken')
                      .then((data)=>{
                        if (data != null){
                          this.setState({isLogedIn: true})
                        }
                      });
  }

  render() {
    this.CheckLogedIn();
    if (this.state.isLogedIn == false){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    const {profile} = this.props.access;
    Moment.locale('en');
    let tmpEmail = "";

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
        <Dialog.Container visible={this.state.isEmailModalVisible}>
            <Dialog.Title>Email</Dialog.Title>
            <Dialog.Description>
                Please insert your email
            </Dialog.Description>
            <Dialog.Input
                wrapperStyle={{borderBottomWidth: 1, opacity: 0.3}}
                onChangeText={(email) => {this.tmpEmail = email}}
            />
            <Dialog.Button label="Cancel" onPress={()=>{this._hideEmailModal()}}/>
            <Dialog.Button label="OK" onPress={()=>{this._handleEmailModal(this.tmpEmail)}}/>
        </Dialog.Container>

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
            <Text style={{ fontSize: 16 }}>{profile.fullname}</Text>
            <Text style={{ color: 'gray', fontSize: 14, }}>{profile.phone}</Text>
          </View>
        </View>

        <InfoText text="Account"/>

        <ListItem
          title="Email"
          rightTitle={profile.email}
          rightTitleStyle={{fontSize: 15, position: 'absolute', width: deviceWidth/2, textAlign: 'right'}}
          onPress={() => {this._showEmailModal()}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
        />
        <ListItem
          title="Gender"
          rightTitle={profile.sex}
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
          onPress={() => {this.props.navigation.navigate("ChangePassword")}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
        />

        <Space/>

        <ListItem
          title="Log out"
          titleStyle = {{textAlign: 'center', color: 'rgb(178,34,34)'}}
          onPress={()=>{AsyncStorage.removeItem('userToken'); AsyncStorage.removeItem('profile'); this.props.navigation.navigate("Map")}}
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

function mapStateToProps(state){
  return{
    access: state.access,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    handleAccess: handleAccess,
    changeProfile: changeProfile,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
