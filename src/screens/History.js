import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, FlatList, Image, ScrollView } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { getHistoryByUser, getPassengerInBookTourHistory, getHistoryBookTourById } from '../services/api';
import { slugify } from '../services/function';
import { bookedTourGetInfo, bookedTourGetPassengers } from '../actions/index.js';
import { COLOR_MAIN } from '../constants/index';
import localized from '../localization/index';

import { historySortBy, placeHolderSortBy } from '../constants/search';

import HistoryCard from '../components/HistoryCard';

class History extends Component {
  static navigationOptions = {
    title: localized.historyBook,
  };

  constructor(props){
    super(props);
    this.state = {
      bookedTour: [],
      bookedTourAll: [],
      hasLoad: false,

      search: '',

      sortBy: null,
      count: 0,
      per_page: 4,
      isLoading: false,
      hasLoadAll: false,
    }
  }

  onPress = (data) => {
    this.callGetPassengerInBookTourHistory(data.id)
        .then((passengersData)=>{
          this.props.bookedTourGetPassengers(passengersData);
        });
    this.callGetHistoryBookTourById(data.id)
        .then((res)=>{
          this.props.bookedTourGetInfo(res.data);
          this.props.navigation.navigate("HistoryDetail");
        })
    // this.props.navigation.navigate("HistoryDetail");
  }

  callGetHistoryByUser(){
    return getHistoryByUser()
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({bookedTourAll: responseJson.data});
            this.setState({bookedTour: responseJson.data});
            let num = this.state.count + this.state.per_page;
            if (num >= responseJson.data.length){
              this.setState({hasLoadAll: true});
            }
          })
          .catch((error) => console.error(error));
  }

  callGetHistoryBookTourById(id){
    return getHistoryBookTourById(id)
          .then((response) => response.json())
          .then((responseJson) => responseJson)
          .catch((error) => console.error(error));
  }

  callGetPassengerInBookTourHistory(id){
    return getPassengerInBookTourHistory(id)
          .then((response) => response.json())
          .then((responseJson) => responseJson.data)
          .catch((error) => console.error(error));
  }

  getNoTourView(){
    return (
      <View>
          <Text style={{padding: 16, color: 'red'}}>
            {localized.noBookedTour}
          </Text>
      </View>
    )
  }

  getData(){
    let data = this.state.bookedTourAll;
    let {sortBy, search} = this.state;

    if (sortBy == 'bookDayDesc'){
      data.sort((a, b) => {
        var aDate = new Date(a.book_time);
        var bDate = new Date(b.book_time);
        return aDate - bDate;
      });
    } else if (sortBy == 'bookDayAsc'){
      data.sort((a, b) => {
        var aDate = new Date(a.book_time);
        var bDate = new Date(b.book_time);
        return bDate - aDate;
      });
    } else if (sortBy == 'priceDesc'){
      data.sort((a, b) => b.total_pay - a.total_pay);
    } else if (sortBy == 'priceAsc'){
      data.sort((a, b) => a.total_pay - b.total_pay);
    }

    if (search != null && search != ''){
      data = data.filter(item => {
        let name = slugify(item.tour_turn.tour.name);
        return name.includes(slugify(search));
      });
    }

    return data;
  }

  onLoadMorePress(){
    var {bookedTour,count, per_page} = this.state;

    this.setState({isLoading: true});

    if (count + per_page + per_page >= bookedTour.length){
      this.setState({hasLoadAll: true});
    }

    this.setState({count: count + per_page},()=>{
        this.setState({isLoading: false});
    });
  }

  getShowData(){
    const {bookedTour, count, per_page} = this.state;
    let data = [];
    for (let i=0; i<bookedTour.length; i++){
      if (i==count+per_page){
        break;
      }
      data.push(bookedTour[i]);
    }
    return data;
  }

  getHistoryCard(){
    let data = this.getShowData();

    let index = 0;
    let history = data.map((val,key)=>{
      index += 1;
      return(
        <View key={key}>
            <HistoryCard data={val} onPress={this.onPress}/>
            { index != data.length &&
              <Divider style={{height: 0.5, marginHorizontal: 14}}/>
            }
        </View>
      )
    });

    if (this.state.bookedTourAll.length == 0 && this.state.hasLoad){
      history = this.getNoTourView();
    }

    return history;
  }

  onDataChange(){
    this.setState({count: 0},()=>{
      let data = this.getData();
      this.setState({bookedTour: data}, ()=>{
        const {bookedTour, count, per_page} = this.state;
        if (count + per_page >= bookedTour.length){
          this.setState({hasLoadAll: true});
        } else {
          this.setState({hasLoadAll: false});
        }
      });
    })
  }

  onSortByChange(value){
    this.setState({sortBy: value},()=>{
      this.onDataChange();
    });
  }

  onSearchChange(value){
    this.setState({search: value},()=>{
      this.onDataChange();
    });
  }

  componentWillMount(){
    this.callGetHistoryByUser()
        .then(()=>{
          this.setState({hasLoad: true});
        })
  }

  render() {
    const {bookedTour, isLoading, hasLoadAll, hasLoad} = this.state;

    let history = this.getHistoryCard();

    return (
      <ScrollView style={styles.container}>
          <View style={{flexDirection: 'row', paddingHorizontal: 6}}>
              <View style={{flex: 0.5}}>
                  <TextInput style={styles.input}
                      placeholder={localized.my_booking.search_tour}
                      placeholderTextColor='rgba(0,0,0,0.2)'
                      autoCorrect={false}
                      onChangeText={(value)=> this.onSearchChange(value)}
                  />
              </View>
              <View style={{flex: 0.5}}>
                  <RNPickerSelect
                    placeholder={placeHolderSortBy}
                    items={historySortBy}
                    onValueChange={value => this.onSortByChange(value)}
                    value={this.state.sortBy}
                  />
              </View>
          </View>

          {history}

          { isLoading &&
            <View style={{alignItems: 'center', padding: 16}}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../assets/images/svg/Rolling-1.9s-106px.gif')} />
            </View>
          }

          { !hasLoadAll && hasLoad &&
            <Button
              title={localized.showMore.toUpperCase()}
              type="solid"
              buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
              containerStyle={{padding: 16, borderRadius: 0}}
              titleStyle={{fontSize: 16}}
              onPress={()=>{this.onLoadMorePress()}}
            />
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F5F4',
    },
    text: {
      fontSize: 20,
    },
    input: {
      fontSize: 16,
    },
})

function mapStateToProps(state){
  return{
    bookedTour: state.bookedTour,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    bookedTourGetInfo: bookedTourGetInfo,
    bookedTourGetPassengers: bookedTourGetPassengers,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
