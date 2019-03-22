import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, Dimensions, AsyncStorage } from 'react-native';
import { ListItem, Divider, Avatar, Icon } from 'react-native-elements'
import Dialog from "react-native-dialog";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import Modal from 'react-native-modal';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { LoginManager } from 'react-native-fbsdk';

import { handleAccess, changeProfile, changeGender, changeBirthday } from '../actions/index.js';
import { me, updateSex, updateBirthdate, logout, userUpdate } from '../services/api';
import { capitalize } from '../services/function';

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
      isAddressModalVisible: false,

      isLogedIn: false,

      tmpAddress: '',
    }

    this.CheckLogedIn();
  }

  //Các hàm quản lý DateTimePicker*
  _showDateTimePicker = (visible) => this.setState({ isDateTimePickerVisible: visible });
  _handleDatePicked = (date) => {
    this.callUpdateBirthdateAPI(date).then(()=>{
      this.props.changeBirthday(date);
      this._showDateTimePicker(false);
    })
  };

  //Các hàm quản lý Address Modal
  _showAddressModal = (visible) => this.setState({ isAddressModalVisible: visible });
  _handleAddressModal = (address) => {
    this.callUpdateAddress(address).then(()=>{
      this._showAddressModal(false);
    })
  };

  //Các hàm quản lý GenderModal
  _showGenderModal = (visible) => this.setState({ isGenderModalVisible: visible });
  _handleGenderModal = (sex) => {
    this.callUpdateSexAPI(sex).then(()=>{
      this.props.changeGender(sex);
      this._showGenderModal(false);
    })
  };

  // Hiển thị modal chọn giới tính
  _renderModalContent = () => {
    const {sex} = this.props.access.profile;

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
              onPress={() => {this._handleGenderModal('male')}}
              containerStyle={styles.listItemContainer}
              rightIcon={sex == 'male' && <Icon name='check' type='entypo' color='#00BFFF'/>}
            />
          </View>
          <View style={{position: 'relative', flexDirection: 'row'}}>
            <ListItem
              style={{flex: 1,}}
              title="Female"
              onPress={() => {this._handleGenderModal('female')}}
              containerStyle={styles.listItemContainer}
              rightIcon={sex == 'female' && <Icon name='check' type='entypo' color='#00BFFF'/>}
            />
          </View>
          <View style={{position: 'relative', flexDirection: 'row'}}>
            <ListItem
              style={{flex: 1,}}
              title="Other"
              onPress={() => {this._handleGenderModal('other')}}
              containerStyle={styles.listItemContainer}
              rightIcon={sex == 'other' && <Icon name='check' type='entypo' color='#00BFFF'/>}
            />
          </View>
      </View>
    );
  }

  _onPressLogout(){
    this.callLogout().then(()=>{
      AsyncStorage.removeItem('userToken');
      LoginManager.logOut();
      this.props.navigation.navigate("Map")
    })
  }

  showAddress(address){
    let ret = '';
    if (address.length > 45){
      ret = address.substring(0,47) + ' ...';
    } else {
      ret = address;
    }
    return ret;
  }

  getTmp(sex){
    console.log(sex);
    return sex;
  }
  // Kiểm tra đã đăng nhập
  async CheckLogedIn(){
    await AsyncStorage.getItem('userToken')
                      .then((data)=>{
                        if (data != null){
                          this.setState({isLogedIn: true})
                        }
                      });
  }

  // Gọi API me lấy thông tin người dùng
  async callMeAPI(){
    return me().then((response) => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => console.error(error));
  }

  // Gọi API cập nhật giới tính
  async callUpdateSexAPI(sex){
    return updateSex(sex)
            .then((response) => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => console.error(error));
  }

  // Gọi API cập nhật ngày sinh
  async callUpdateBirthdateAPI(date){
    return updateBirthdate(date)
            .then((response) => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => {console.error(error);});
  }

  // Gọi API logout
  async callLogout(){
    let status;
    return logout().then((response) => {
                      status = response.status;
                      return response.json();
                    })
                   .then((responseJson) => {
                      if (status != 200){
                        Alert.alert(responseJson.msg);
                      }
                   })
                   .catch((error) => console.error(error));
  }

  async callUpdateAddress(address){
    const data = new FormData();
    data.append('address',address);

    return userUpdate(data)
          .then((response) => {
              status = response.status;
              return response.json();
            })
           .then((responseJson) => {
              if (status != 200){
                Alert.alert(responseJson.msg);
              } else {
                this.props.changeProfile(responseJson.profile);
              }
           })
           .catch((error) => console.error(error));
  }

  componentWillMount(){
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
        <Dialog.Container visible={this.state.isAddressModalVisible}>
            <Dialog.Title>Enter Address</Dialog.Title>
            <Dialog.Description>Please enter new address</Dialog.Description>
            <Dialog.Input placeholder="Address" style={{borderBottomWidth: 0.5}} onChangeText={(value) => this.setState({tmpAddress: value})}>
            </Dialog.Input>
            <Dialog.Button label="Cancel" onPress={()=>this._showAddressModal(false)} />
            <Dialog.Button label="OK" onPress={()=>this._handleAddressModal(this.state.tmpAddress)} />
        </Dialog.Container>

        <View style={styles.userRow}>
          <View style={styles.userImage}>
            { !profile.avatar &&
              <Avatar
                rounded
                size="large"
                onPress={()=>{this.props.navigation.navigate("ChangeAvatar")}}
                source={require('../assets/images/default_user.jpg')}
              />
            }
            { profile.avatar &&
              <Avatar
                rounded
                size="large"
                onPress={()=>{this.props.navigation.navigate("ChangeAvatar")}}
                source={{ uri: profile.avatar }}
              />
            }
          </View>
          <View>
            <Text style={{ fontSize: 16 }} onPress={()=>{Alert.alert("TEST")}}>{profile.fullname}</Text>
            <Text style={{ color: 'gray', fontSize: 14, }}>{profile.phone}</Text>
          </View>
        </View>

        <InfoText text="Account"/>

        <ListItem
          title="Email"
          rightTitle={profile.email}
          rightTitleStyle={{fontSize: 15, position: 'absolute', width: deviceWidth/2, textAlign: 'right'}}
          containerStyle={styles.listItemContainer}
          leftIcon=<Icon name='email' type='material' color='gray' size={20}/>
        />
        <ListItem
          title="Gender"
          rightTitle={profile.sex === undefined ? '' : capitalize(profile.sex)}
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this._showGenderModal(true)}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
          leftIcon=<Icon name='gender-male-female' type='material-community' color='gray' size={20}/>
        />
        <ListItem
          title="Birthday"
          rightTitle={(Moment(profile.birthdate).format('DD/MM/YYYY')=='Invalid date') ? '' : Moment(profile.birthdate).format('DD/MM/YYYY')}
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this._showDateTimePicker(true)}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
          leftIcon=<Icon name='calendar' type='entypo' color='gray' size={20}/>
        />
        <ListItem
          title="Address"
          rightTitle={profile.address ? this.showAddress(profile.address) : ''}
          rightTitleStyle={{fontSize: 15, position: 'absolute', width: deviceWidth/2, textAlign: 'right'}}
          onPress={() => {this._showAddressModal(true)}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
          leftIcon=<Icon name='address' type='entypo' color='gray' size={20}/>
        />

        <Space/>

        <ListItem
          title="My Booking"
          onPress={() => {this.props.navigation.navigate("History2")}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
          leftIcon=<Icon name='shopping-cart' type='entypo' color='gray' size={20}/>
        />
        { profile.type != 'facebook' &&
          <ListItem
            title="Change Password"
            onPress={() => {this.props.navigation.navigate("ChangePassword")}}
            containerStyle={styles.listItemContainer}
            rightIcon={<Chevron />}
            leftIcon=<Icon name='key' type='entypo' color='gray' size={20}/>
          />
        }

        <Space/>

        <ListItem
          title="About Us"
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this.props.navigation.navigate("AboutUs")}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron/>}
          // leftIcon=<Icon name='info' type='octicon' color='gray'/>
        />
        <ListItem
          title="Contact"
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this.props.navigation.navigate("Contact")}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron/>}
          // leftIcon=<Icon name='contacts' type='material-community' color='gray'/>
        />

        <Space/>

        <ListItem
          title="Log out"
          titleStyle = {{textAlign: 'center', color: 'rgb(178,34,34)'}}
          onPress={()=>{this._onPressLogout()}}
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
