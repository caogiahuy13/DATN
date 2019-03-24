import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Slider, Button, Rating, AirbnbRating } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { COLOR_PLACEHOLDER, COLOR_MAIN, COLOR_GREEN, COLOR_LIGHT_BLUE } from '../constants/index';
import { dateFormat, priceFormat } from '../services/function';
import { searchFilterChange } from '../actions/index';

class SearchFilter extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  constructor(props){
    super(props);
    this.state = {
      date: '',
      maxPrice: 0,
      destination: '',
      rating: 3,

      isDateTimePickerVisible: false,
    }
  }

  _showDateTimePicker = (visible) => this.setState({ isDateTimePickerVisible: visible });
  _handleDatePicked = (date) => {
    this.setState({date: date});
    this._showDateTimePicker(false);
  };

  onSearchPress(){
    this.props.searchFilterChange(this.state);
    this.props.navigation.goBack();
  }

  onResetPress(){
    this.setState({
      date: '',
      maxPrice: 0,
      destination: '',
      rating: 0,
    }, ()=>{
      this.props.searchFilterChange(this.state);
    })
  }

  componentWillMount(){
    const {searchFilter} = this.props;
    this.setState({
      date: searchFilter.date,
      maxPrice: searchFilter.maxPrice,
      destination: searchFilter.destination,
      rating: searchFilter.rating,
    })
  }

  render() {
    const {date, maxPrice, destination, rating} = this.state;

    return (
      <View style={styles.container}>
          <DateTimePicker
            datePickerModeAndroid='spinner'
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={(date)=>{this._handleDatePicked(date)}}
            onCancel={()=>{this._showDateTimePicker(false)}}
          />

          <TouchableOpacity style={{padding: 16, alignItems: 'flex-end'}} onPress={()=>this.onResetPress()}>
              <Text style={{color: COLOR_LIGHT_BLUE, fontSize: 16}}>Reset</Text>
          </TouchableOpacity>

          <Text style={styles.inputText}>Select your destination</Text>
          <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor={COLOR_PLACEHOLDER}
              returnKeyType='next'
              autoCorrect={false}
              onChangeText={(value)=> this.setState({destination: value})}
              value={destination == '' ? null : destination}
          />

          <Text style={styles.inputText}>Select your date</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>this._showDateTimePicker(true)}>
              <TextInput
                  style={styles.input}
                  placeholder="dd/mm/yyyy"
                  placeholderTextColor={COLOR_PLACEHOLDER}
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> {}}
                  editable={false} selectTextOnFocus={false}
                  value={date == '' ? null : dateFormat(date)}
              />
          </TouchableOpacity>

          <View style={{flexDirection: 'row', paddingVertical: 6}}>
              <Text style={{flex: 1, fontSize: 18}}>Max Price</Text>
              <Text style={{fontSize: 18}}>{priceFormat(maxPrice)}</Text>
          </View>
          <Slider
            value={maxPrice}
            onValueChange={value => this.setState({maxPrice: value})}
            maximumValue={100000000}
            maximumTrackTintColor={COLOR_PLACEHOLDER}
            minimumTrackTintColor={COLOR_MAIN}
            step={500000}
            thumbTintColor={COLOR_GREEN}
            thumbStyle={{}}
          />

          <Text style={styles.inputText}>Min Rating</Text>
          <View style={{alignItems: 'flex-start'}}>
              <AirbnbRating
                count={5}
                defaultRating={rating}
                size={28}
                showRating={false}
                onFinishRating={(value)=>this.setState({rating: value})}
              />
          </View>

          <Button
            title="SEARCH"
            type="solid"
            buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
            containerStyle={{paddingVertical: 32, paddingHorizontal: 16, borderRadius: 0}}
            titleStyle={{fontSize: 16}}
            onPress={()=>{this.onSearchPress()}}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  input: {
      fontSize: 16,
      height: 40,
      backgroundColor: 'rgba(0,0,0,0.02)',
      borderColor: 'rgba(0,0,0,0.05)',
      color: 'gray',
      marginBottom: 10,
      padding: 10,
  },
  inputText:
  {
      fontSize: 18,
      paddingVertical: 6,
  },
})

function mapStateToProps(state){
  return{
    searchFilter: state.searchFilter,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    searchFilterChange: searchFilterChange,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);
