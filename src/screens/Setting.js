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
import { me, logout, userUpdate } from '../services/api';
import { capitalize, getGenderShow } from '../services/function';
import localized from '../localization/index';

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
      isFullnameModalVisible: false,

      isLogedIn: false,

      tmpAddress: '',
      tmpFullname: '',
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

  //Các hàm quản lý Fullname Modal
  _showFullnameModal = (visible) => this.setState({ isFullnameModalVisible: visible });
  _handleFullnameModal = (fullname) => {
    this.callUpdateFullname(fullname).then(()=>{
      this._showFullnameModal(false);
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
              title={localized.genderMocalLabel}
              onPress={() => {this._showGenderModal(false)}}
              containerStyle={styles.listItemContainer}
              rightIcon={<Icon name='close' type='FontAwesome' color='#D1D1D6'/>}
            />
          </View>
          <View style={{position: 'relative', flexDirection: 'row'}}>
            <ListItem
              style={{flex: 1,}}
              title={localized.male}
              onPress={() => {this._handleGenderModal('male')}}
              containerStyle={styles.listItemContainer}
              rightIcon={sex == 'male' && <Icon name='check' type='entypo' color='#00BFFF'/>}
            />
          </View>
          <View style={{position: 'relative', flexDirection: 'row'}}>
            <ListItem
              style={{flex: 1,}}
              title={localized.female}
              onPress={() => {this._handleGenderModal('female')}}
              containerStyle={styles.listItemContainer}
              rightIcon={sex == 'female' && <Icon name='check' type='entypo' color='#00BFFF'/>}
            />
          </View>
          <View style={{position: 'relative', flexDirection: 'row'}}>
            <ListItem
              style={{flex: 1,}}
              title={localized.other}
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
    const data = new FormData();
    data.append('sex',sex);

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

  // Gọi API cập nhật ngày sinh
  async callUpdateBirthdateAPI(date){
    const data = new FormData();
    data.append('birthdate',new Date(date).toISOString().slice(0, 19).replace('T', ' '));

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

  async callUpdateFullname(fullname){
    const data = new FormData();
    data.append('fullname',fullname);

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
      this.setState({tmpAddress: data.profile.address});
      this.setState({tmpFullname: data.profile.fullname});
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
    const {tmpAddress, tmpFullname} = this.state;

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
            <Dialog.Title>{localized.addressModalLabel}</Dialog.Title>
            <Dialog.Description>{localized.addressModalDescription}</Dialog.Description>
            <Dialog.Input placeholder={localized.address} style={{borderBottomWidth: 0.5}} value={tmpAddress} onChangeText={(value) => this.setState({tmpAddress: value})}>
            </Dialog.Input>
            <Dialog.Button label={localized.cancel} onPress={()=>this._showAddressModal(false)} />
            <Dialog.Button label={localized.ok} onPress={()=>this._handleAddressModal(tmpAddress)} />
        </Dialog.Container>

        <Dialog.Container visible={this.state.isFullnameModalVisible}>
            <Dialog.Title>{localized.fullnameModalLabel}</Dialog.Title>
            <Dialog.Description>{localized.fullnameModalDescription}</Dialog.Description>
            <Dialog.Input placeholder={localized.fullname} style={{borderBottomWidth: 0.5}} value={tmpFullname} onChangeText={(value) => this.setState({tmpFullname: value})}>
            </Dialog.Input>
            <Dialog.Button label={localized.cancel} onPress={()=>this._showFullnameModal(false)} />
            <Dialog.Button label={localized.ok} onPress={()=>this._handleFullnameModal(tmpFullname)} />
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
            <Text style={{ fontSize: 16 }} onPress={() => {this._showFullnameModal(true)}}>{profile.fullname}</Text>
            <Text style={{ color: 'gray', fontSize: 14, }}>{profile.phone}</Text>
          </View>
        </View>

        <InfoText text={localized.account}/>

        <ListItem
          title={localized.email}
          rightTitle={profile.email}
          rightTitleStyle={{fontSize: 15, position: 'absolute', width: deviceWidth/2, textAlign: 'right'}}
          containerStyle={styles.listItemContainer}
          leftIcon=<Icon name='email' type='material' color='gray' size={20}/>
        />
        <ListItem
          title={localized.gender}
          rightTitle={(profile.sex == undefined || profile.sex == '' ) ? '' : getGenderShow(profile.sex)}
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this._showGenderModal(true)}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
          leftIcon=<Icon name='gender-male-female' type='material-community' color='gray' size={20}/>
        />
        <ListItem
          title={localized.birthdate}
          rightTitle={(Moment(profile.birthdate).format('DD/MM/YYYY')=='Invalid date') ? '' : Moment(profile.birthdate).format('DD/MM/YYYY')}
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this._showDateTimePicker(true)}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
          leftIcon=<Icon name='calendar' type='entypo' color='gray' size={20}/>
        />
        <ListItem
          title={localized.address}
          rightTitle={profile.address ? this.showAddress(profile.address) : ''}
          rightTitleStyle={{fontSize: 15, position: 'absolute', width: deviceWidth/2, textAlign: 'right'}}
          onPress={() => {this._showAddressModal(true)}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
          leftIcon=<Icon name='address' type='entypo' color='gray' size={20}/>
        />

        <Space/>

        <ListItem
          title={localized.historyBook}
          onPress={() => {this.props.navigation.navigate("History")}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron />}
          leftIcon=<Icon name='shopping-cart' type='entypo' color='gray' size={20}/>
        />
        { profile.type != 'facebook' &&
          <ListItem
            title={localized.changePassword}
            onPress={() => {this.props.navigation.navigate("ChangePassword")}}
            containerStyle={styles.listItemContainer}
            rightIcon={<Chevron />}
            leftIcon=<Icon name='key' type='entypo' color='gray' size={20}/>
          />
        }

        <Space/>

        <ListItem
          title={localized.aboutUs}
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this.props.navigation.navigate("AboutUs")}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron/>}
          // leftIcon=<Icon name='info' type='octicon' color='gray'/>
        />
        <ListItem
          title={localized.contact}
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this.props.navigation.navigate("Contact")}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron/>}
        />
        <ListItem
          title={localized.termsCondition}
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this.props.navigation.navigate("TermsCondition")}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron/>}
        />
        <ListItem
          title={localized.faq}
          rightTitleStyle={{ fontSize: 15}}
          onPress={() => {this.props.navigation.navigate("Faq")}}
          containerStyle={styles.listItemContainer}
          rightIcon={<Chevron/>}
        />

        <Space/>

        <ListItem
          title={localized.logout}
          titleStyle = {{textAlign: 'center', color: 'rgb(178,34,34)'}}
          onPress={()=>{this._onPressLogout()}}
        />

        <Space/>

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
