import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, Dimensions, AsyncStorage } from 'react-native';
import { ListItem, Divider, Avatar, Icon } from 'react-native-elements'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { handleAccess, changeProfile, changeGender, changeBirthday } from '../actions/index.js';
import { me } from '../services/api';

const deviceWidth = Dimensions.get("window").width;

class Setting extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      isGenderModalVisible: false,
      isDateTimePickerVisible: false,
      isLogedIn: false,
    }

    this.CheckLogedIn();
  }

  //Các hàm quản lý DateTimePicker*
  _showDateTimePicker = (visible) => this.setState({ isDateTimePickerVisible: visible });
  _handleDatePicked = (date) => {
    this.props.changeBirthday(date);
    this._showDateTimePicker(false);
  };

  //Các hàm quản lý GenderModal
  _showGenderModal = (visible) => this.setState({ isGenderModalVisible: visible });
  _handleGenderModal = (isMale) => {
    let sex = (isMale) ? 'Male' : 'Female';
    this.props.changeGender(sex);
    this._showGenderModal(false);
  };

  _renderModalContent = () => {
    let isMale;
    if (this.props.access.profile.sex != null){
      isMale = (this.props.access.profile.sex.toLowerCase() == 'male') ? true : false;
    }

    return(
      <View style={styles.modalGender}>
          <View style={{position: 'relative', flexDirection: 'row'}}>
            <ListItem
              style={{flex: 1,}}
              title="Choose Gender"
              onPress={() => {this._showGenderModal(false)}}
              containerStyle={styles.listItemContainer}
              rightIcon={<Icon name='close' type='FontAwesome' color='#D1D1D6'/>}
            />
          </View>
          <View style={{position: 'relative', flexDirection: 'row'}}>
            <ListItem
              style={{flex: 1,}}
              title="Male"
              onPress={() => {this._handleGenderModal(true)}}
              containerStyle={styles.listItemContainer}
              rightIcon={isMale && <Icon name='check' type='entypo' color='#00BFFF'/>}
            />
          </View>
          <View style={{position: 'relative', flexDirection: 'row'}}>
            <ListItem
              style={{flex: 1,}}
              title="Female"
              onPress={() => {this._handleGenderModal(false)}}
              containerStyle={styles.listItemContainer}
              rightIcon={isMale == false && <Icon name='check' type='entypo' color='#00BFFF'/>}
            />
          </View>
      </View>
    );
  }

  async CheckLogedIn(){
    await AsyncStorage.getItem('userToken')
                      .then((data)=>{
                        if (data != null){
                          this.setState({isLogedIn: true})
                        }
                      });
  }

  async callMeAPI(){
    return me()
            .then((response) => {
                return response.json();
              })
            .then((responseJson) => {
              return responseJson;
            })
            .catch((error) => {
              console.error(error);
            });
  }

  componentDidMount(){
    this.callMeAPI().then((data)=>{
      this.props.changeProfile(data.profile);
    })
  }

  render() {
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
          onConfirm={(date)=>{this._handleDatePicked(date)}}
          onCancel={()=>{this._showDateTimePicker(false)}}
        />
        <Modal
          isVisible={this.state.isGenderModalVisible}
          onBackdropPress={()=>{this._showGenderModal(false)}}
        >
          {this._renderModalContent()}
        </Modal>

        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              onPress={()=>{Alert.alert("Test")}}
              source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
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
          containerStyle={styles.listItemContainer}
        />
        <ListItem
          title="Gender"
          rightTitle={profile.sex}
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this._showGenderModal(true)}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
        />
        <ListItem
          title="Birthday"
          rightTitle={Moment(profile.birthday).format('DD/MM/YYYY')}
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this._showDateTimePicker(true)}}
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
    changeGender: changeGender,
    changeBirthday: changeBirthday,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
