import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput, Touch, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback, NativeModules } from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';

import { COLOR_MAIN, COLOR_GRAY_BACKGROUND } from '../constants/index';

import BookingStage from '../components/BookingStage';
import NumberPicker from '../components/NumberPicker';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class BookingInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      contactInfo: {
        fullname: '',
        phone: '',
        email: '',
        address: '',
      },
      number: {
        adult: 0,
        children: 1,
      },

      isDateTimePickerVisible: false,
      isGenderModalVisible: false,
    }
  }

  increaseChildren(){
    let changeValue = this.state.number.children + 1;
    this.setState({
      number: {
        ...this.state.number,
        children: changeValue,
      }
    });
  }
  decreaseChildren(){
    let changeValue = this.state.number.children - 1;
    if (changeValue < 0){
      changeValue = 0
    }
    this.setState({
      number: {
        ...this.state.number,
        children: changeValue,
      }
    });
  }
  increaseAdult(){
    let changeValue = this.state.number.adult + 1;
    this.setState({
      number: {
        ...this.state.number,
        adult: changeValue,
      }
    });
  }
  decreaseAdult(){
    let changeValue = this.state.number.adult - 1;
    if (changeValue < 0){
      changeValue = 0
    }
    this.setState({
      number: {
        ...this.state.number,
        adult: changeValue,
      }
    });
  }

  //Các hàm quản lý DateTimePicker*
  _showDateTimePicker = (visible) => this.setState({ isDateTimePickerVisible: visible });
  _handleDatePicked = (date) => {
    this._showDateTimePicker(false);
  };

  //Các hàm quản lý GenderModal
  _showGenderModal = (visible) => this.setState({ isGenderModalVisible: visible });
  _handleGenderModal = (isMale) => {
    let sex = (isMale) ? 'male' : 'female';
    this._showGenderModal(false);
  };

  // Hiển thị modal chọn giới tính
  _renderModalContent = () => {
    // let isMale;
    // if (this.props.access.profile.sex != null){
    //   isMale = (this.props.access.profile.sex.toLowerCase() == 'male') ? true : false;
    // }
    let isMale = true;

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

  render(){
    return(
      <ScrollView style={styles.container}>
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

          <BookingStage stage={1}/>

          <Space/>

          <View style={styles.card}>
              <View style={styles.numberPicker}>
                  <Text style={styles.numberPickerText}>Adult *</Text>
                  <NumberPicker value={this.state.number.adult} increase={()=>this.increaseAdult()} decrease={()=>this.decreaseAdult()}/>
              </View>
              <View style={styles.numberPicker}>
                  <Text style={styles.numberPickerText}>Children</Text>
                  <NumberPicker value={this.state.number.children} increase={()=>this.increaseChildren()} decrease={()=>this.decreaseChildren()}/>
              </View>
          </View>

          <InfoText text="Contact Information"/>

          <View style={styles.card}>
              <TextInput
                  style={styles.input}
                  placeholder="Fullname *"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {fullname: value}})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Phone number *"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  keyboardType='phone-pad'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {phone: value}})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Email *"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  keyboardType='email-address'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {email: value}})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Address *"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {address: value}})}
              />
          </View>

          <InfoText text="Passenger Information"/>

          <View style={styles.card}>
              <TextInput
                  style={styles.input}
                  placeholder="Fullname *"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {fullname: value}})}
              />
              <TouchableOpacity activeOpacity={0.8} onPress={()=>this._showDateTimePicker(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="Birthday *"
                    placeholderTextColor='rgba(0,0,0,0.4)'
                    returnKeyType='next'
                    autoCorrect={false}
                    onChangeText={(value)=> this.setState({contactInfo: {phone: value}})}
                    editable={false} selectTextOnFocus={false}
                />
              </TouchableOpacity>
              <TextInput
                  style={styles.input}
                  placeholder="Age *"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  keyboardType='numeric'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {email: value}})}
              />

              <TouchableOpacity activeOpacity={0.8} onPress={()=>this._showGenderModal(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="Gender *"
                    placeholderTextColor='rgba(0,0,0,0.4)'
                    returnKeyType='next'
                    autoCorrect={false}
                    onChangeText={(value)=> this.setState({contactInfo: {address: value}})}
                    editable={false} selectTextOnFocus={false}
                />
              </TouchableOpacity>
              <TextInput
                  style={styles.input}
                  placeholder="Phone number"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  keyboardType='phone-pad'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {email: value}})}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Identity number/ Passport"
                  placeholderTextColor='rgba(0,0,0,0.4)'
                  keyboardType='numeric'
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({contactInfo: {email: value}})}
              />
          </View>
      </ScrollView>
    )
  }
}

const Space = () => (
  <View style={styles.space}></View>
)
const InfoText = ({ text }) => (
  <View style={styles.containerInfoText}>
    <Text style={styles.infoText}>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_GRAY_BACKGROUND,
    },
    input: {
        fontSize: 16,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderColor: 'rgba(0,0,0,0.05)',
        color: 'gray',
        marginBottom: 10,
    },
    space: {
      paddingTop: 20,
      paddingBottom: 12,
      backgroundColor: COLOR_GRAY_BACKGROUND,
    },
    card: {
      backgroundColor: 'white',
      padding: 10,
      elevation: 1,
    },
    numberPicker: {
      flexDirection: 'row',
      paddingHorizontal: 4,
      padding: 4,
    },
    numberPickerText: {
      fontSize: 18,
      flex: 1,
      alignSelf: 'center',
    },
    containerInfoText: {
      paddingTop: 20,
      paddingBottom: 12,
      backgroundColor: COLOR_GRAY_BACKGROUND,
    },
    infoText: {
      fontSize: 16,
      marginLeft: 20,
      color: 'gray',
      fontWeight: '500',
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

export default BookingInfo;
