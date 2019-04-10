import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Slider, Button, Rating, AirbnbRating } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { COLOR_PLACEHOLDER, COLOR_MAIN, COLOR_GREEN, COLOR_LIGHT_BLUE } from '../constants/index';
import { dateFormat, priceFormat } from '../services/function';
import { searchFilterChange } from '../actions/index';
import localized from '../localization/index';

import NumberPicker from '../components/NumberPicker';

class SearchFilter extends Component {
  static navigationOptions = {
    title: localized.search,
  };

  constructor(props){
    super(props);
    this.state = {
      date: undefined,
      maxPrice: undefined,
      destination: undefined,
      rating: undefined,
      lasting: undefined,

      isDateTimePickerVisible: false,
    }
  }

  _showDateTimePicker = (visible) => this.setState({ isDateTimePickerVisible: visible });
  _handleDatePicked = (date) => {
    this.setState({date: date});
    this._showDateTimePicker(false);
  };

  async onSearchPress(){
    await this.props.searchFilterChange(this.state);
    this.props.navigation.state.params.onGoBack();
    this.props.navigation.goBack();
  }

  increaseLasting(){
    const {lasting} = this.state;
    if (typeof(lasting) == 'undefined'){
      this.setState({lasting: 1});
    } else {
      this.setState({lasting: lasting + 1});
    }
  }
  decreaseLasting(){
    const {lasting} = this.state;
    let newValue = lasting - 1;
    if (newValue < 0){
      newValue = 0;
    }
    this.setState({lasting: newValue});
  }

  onResetPress(){
    this.setState({
      date: undefined,
      maxPrice: undefined,
      destination: undefined,
      rating: undefined,
      lasting: undefined,
    }, ()=>{
      this.props.searchFilterChange(this.state);
    })
  }

  componentWillMount(){
    const {searchFilter} = this.props;
    let tmpLasting = (typeof(searchFilter.lasting) == 'undefined') ? 0 : searchFilter.lasting;
    this.setState({
      date: searchFilter.date,
      maxPrice: searchFilter.maxPrice,
      destination: searchFilter.destination,
      rating: searchFilter.rating,
      lasting: searchFilter.lasting,
    })
  }

  render() {
    const {date, maxPrice, destination, rating, lasting} = this.state;

    return (
      <View style={styles.container}>
          <DateTimePicker
            datePickerModeAndroid='spinner'
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={(date)=>{this._handleDatePicked(date)}}
            onCancel={()=>{this._showDateTimePicker(false)}}
          />

          <TouchableOpacity style={{padding: 16, alignItems: 'flex-end'}} onPress={()=>this.onResetPress()}>
              <Text style={{color: COLOR_LIGHT_BLUE, fontSize: 16}}>{localized.searchReset}</Text>
          </TouchableOpacity>

          <Text style={styles.inputText}>{localized.selectDestination}</Text>
          <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor={COLOR_PLACEHOLDER}
              returnKeyType='next'
              autoCorrect={false}
              onChangeText={(value)=> this.setState({destination: value})}
              value={destination == '' ? null : destination}
          />

          <Text style={styles.inputText}>{localized.selectDate}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>this._showDateTimePicker(true)}>
              <TextInput
                  style={styles.input}
                  placeholder="dd/mm/yyyy"
                  placeholderTextColor={COLOR_PLACEHOLDER}
                  returnKeyType='next'
                  autoCorrect={false}
                  onChangeText={(value)=> {}}
                  editable={false} selectTextOnFocus={false}
                  value={typeof(date) == 'undefined' ? null : dateFormat(date)}
              />
          </TouchableOpacity>

          <View style={{flexDirection: 'row', paddingVertical: 6}}>
              <Text style={{flex: 1, fontSize: 18}}>{localized.maxPrice}</Text>
              { typeof(maxPrice) != 'undefined' && <Text style={{fontSize: 18}}>{priceFormat(maxPrice)}</Text>}
          </View>
          <Slider
            value={maxPrice}
            onValueChange={value => this.setState({maxPrice: value})}
            maximumValue={10000000}
            maximumTrackTintColor={COLOR_PLACEHOLDER}
            minimumTrackTintColor={COLOR_MAIN}
            step={100000}
            thumbTintColor={COLOR_GREEN}
            thumbStyle={{}}
          />

          <Text style={styles.inputText}>{localized.lasting}</Text>
          <NumberPicker value={typeof(lasting) == 'undefined' ? 0 : lasting} increase={()=>this.increaseLasting()} decrease={()=>this.decreaseLasting()}/>

          <Text style={styles.inputText}>Min Rating</Text>
          <View style={{alignItems: 'flex-start'}}>
              <AirbnbRating
                count={5}
                defaultRating={typeof(rating)=='undefined' ? 0 : rating}
                size={28}
                showRating={false}
                onFinishRating={(value)=>this.setState({rating: value})}
              />
          </View>

          <Button
            title={localized.search.toUpperCase()}
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
