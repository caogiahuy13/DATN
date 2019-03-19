import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import Modal from 'react-native-modal';

import InfoText from './InfoText';

class BookingPassenger extends Component {
  constructor(props){
    super(props);
    this.state = {
      passenger: {
        fullname: '',
        birthday: '',
        age: 0,
        gender: '',
        phone: '',
        identity: '',
      },

      isDateTimePickerVisible: false,
      isGenderModalVisible: false,
    }
  }

  //Các hàm quản lý GenderModal
  _showGenderModal = (visible) => this.setState({ isGenderModalVisible: visible });
  _handleGenderModal = (isMale) => {
    let sex = (isMale) ? 'male' : 'female';
    this.setState({
      passenger: {
        ...this.state.passenger,
        gender: sex,
      }
    })
    this._showGenderModal(false);
  };

    // Hiển thị modal chọn giới tính
    _renderModalContent = () => {
      let isMale;
      if (this.state.passenger.gender != ''){
        isMale = (this.state.passenger.gender.toLowerCase() == 'male') ? true : false;
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

  _showDateTimePicker = (visible) => this.setState({ isDateTimePickerVisible: visible });
  _handleDatePicked = (date) => {
    this.setState({
      passenger: {
        ...this.state.passenger,
        birthday: date,
      }
    })
    this._showDateTimePicker(false);
  };

  render(){
    const {passenger} = this.state;

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

          <InfoText text="Passenger Information"/>

          <View style={styles.card}>
              <TextInput
                  style={styles.input}
                  placeholder="Fullname *"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({
                                            passenger: {
                                              ...this.state.passenger,
                                              fullname: value
                                            }
                                          })}
              />
              <TouchableOpacity activeOpacity={0.8} onPress={()=>this._showDateTimePicker(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="Birthday *"
                    placeholderTextColor='rgba(0,0,0,0.4)'
                    returnKeyType='next'
                    autoCorrect={false}
                    onChangeText={(value)=> this.setState({
                                              passenger: {
                                                ...this.state.passenger,
                                                birthday: value
                                              }
                                            })}
                    editable={false} selectTextOnFocus={false}
                    value={passenger.birthday == '' ? null : Moment(this.state.passenger.birthday).format('DD/MM/YYYY')}
                />
              </TouchableOpacity>
              <TextInput
                  style={styles.input}
                  placeholder="Age *"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  keyboardType='numeric'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({
                                            passenger: {
                                              ...this.state.passenger,
                                              age: value
                                            }
                                          })}
              />

              <TouchableOpacity activeOpacity={0.8} onPress={()=>this._showGenderModal(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="Gender *"
                    placeholderTextColor='rgba(0,0,0,0.4)'
                    returnKeyType='next'
                    autoCorrect={false}
                    onChangeText={(value)=> this.setState({
                                              passenger: {
                                                ...this.state.passenger,
                                                gender: value
                                              }
                                            })}
                    editable={false} selectTextOnFocus={false}
                    value={passenger.gender == '' ? null : passenger.gender}
                />
              </TouchableOpacity>
              <TextInput
                  style={styles.input}
                  placeholder="Phone number"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  keyboardType='phone-pad'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({
                                            passenger: {
                                              ...this.state.passenger,
                                              phone: value
                                            }
                                          })}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Identity number/ Passport"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  keyboardType='numeric'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({
                                            passenger: {
                                              ...this.state.passenger,
                                              identity: value
                                            }
                                          })}
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
