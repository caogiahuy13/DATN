import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import Modal from 'react-native-modal';

import InfoText from './InfoText';

import { COLOR_PLACEHOLDER } from '../constants/index';
import { capitalize } from '../services/function';

class BookingPassenger extends Component {
  constructor(props){
    super(props);
    this.state = {
      passenger: {
        fullname: '',
        birthdate: '',
        type: '',
        sex: '',
        phone: '',
        passport: '',
      },

      isDateTimePickerVisible: false,
      isGenderModalVisible: false,
    }
  }

  //Các hàm quản lý GenderModal
  _showGenderModal = (visible) => this.setState({ isGenderModalVisible: visible });
  _handleGenderModal = (sex) => {
    this.setState({
      passenger: {
        ...this.state.passenger,
        sex: sex,
      }
    },()=>{this.props.update(this.state.passenger, this.props.index);});
    this._showGenderModal(false);
  };
  // Hiển thị modal chọn giới tính
  _renderModalContent = () => {
      const {sex} = this.state.passenger;

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

  _showDateTimePicker = (visible) => this.setState({ isDateTimePickerVisible: visible });
  _handleDatePicked = (date) => {
    this.setState({
      passenger: {
        ...this.state.passenger,
        birthdate: date,
      }
    },()=>{this.props.update(this.state.passenger, this.props.index);});
    this._showDateTimePicker(false);
  };


  changeFullname(value){
    this.setState(
      {
        passenger: {
          ...this.state.passenger,
          fullname: value
        }
      }, () => {
        this.props.update(this.state.passenger, this.props.index);
      }
    );
  }
  changeBirthdate(value){
    this.setState(
      {
        passenger: {
          ...this.state.passenger,
          birthdate: value
        }
      }, () => {
        this.props.update(this.state.passenger, this.props.index);
      }
    );
  }
  changeAge(value){
    this.setState(
      {
        passenger: {
          ...this.state.passenger,
          type: value
        }
      }, () => {
        this.props.update(this.state.passenger, this.props.index);
      }
    );
  }
  changeGender(value){
    this.setState(
      {
        passenger: {
          ...this.state.passenger,
          sex: value
        }
      }, () => {
        this.props.update(this.state.passenger, this.props.index);
      }
    );
  }
  changePhone(value){
    this.setState(
      {
        passenger: {
          ...this.state.passenger,
          phone: value
        }
      }, () => {
        this.props.update(this.state.passenger, this.props.index);
      }
    );
  }
  changeIdentity(value){
    this.setState(
      {
        passenger: {
          ...this.state.passenger,
          passport: value
        }
      }, () => {
        this.props.update(this.state.passenger, this.props.index);
      }
    );
  }

  componentWillMount(){
    const {val} = this.props;
    this.setState({passenger: val});
  }

  render(){
    const {passenger} = this.state;
    let infoText = "Passenger Information #" + this.props.index;

    return(
      <View>
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

          <InfoText text={infoText}/>

          <View style={styles.card}>
              <TextInput
                  style={styles.input}
                  placeholder="Fullname *"
                  placeholderTextColor={COLOR_PLACEHOLDER}
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.changeFullname(value)}
              />
              <TouchableOpacity activeOpacity={0.8} onPress={()=>this._showDateTimePicker(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="birthdate *"
                    placeholderTextColor={COLOR_PLACEHOLDER}
                    returnKeyType='next'
                    autoCorrect={false}
                    onChangeText={(value)=> this.changeBirthdate(value)}
                    editable={false} selectTextOnFocus={false}
                    value={passenger.birthdate == '' ? null : Moment(this.state.passenger.birthdate).format('DD/MM/YYYY')}
                />
              </TouchableOpacity>
              <TextInput
                  style={styles.input}
                  placeholder="Age *"
                  placeholderTextColor={COLOR_PLACEHOLDER}
                  onChangeText={(value)=> this.changeAge(value)}
                  editable={false} selectTextOnFocus={false}
                  value={passenger.type == '' ? null : capitalize(passenger.type)}
              />

              <TouchableOpacity activeOpacity={0.8} onPress={()=>this._showGenderModal(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="Gender *"
                    placeholderTextColor={COLOR_PLACEHOLDER}
                    returnKeyType='next'
                    autoCorrect={false}
                    onChangeText={(value)=> this.changeGender(value)}
                    editable={false} selectTextOnFocus={false}
                    value={passenger.sex == '' ? null : capitalize(passenger.sex)}
                />
              </TouchableOpacity>
              <TextInput
                  style={styles.input}
                  placeholder="Phone number"
                  placeholderTextColor={COLOR_PLACEHOLDER}
                  keyboardType='phone-pad'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.changePhone(value)}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Identity number/ Passport"
                  placeholderTextColor={COLOR_PLACEHOLDER}
                  keyboardType='numeric'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.changeIdentity(value)}
              />
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
      fontSize: 16,
      height: 40,
      backgroundColor: 'rgba(0,0,0,0.02)',
      borderColor: 'rgba(0,0,0,0.05)',
      color: 'gray',
      marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 1,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
  modalGender: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
  },
})

export default BookingPassenger;
