import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, FlatList} from 'react-native';
import { Divider } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { getHistoryByUser, getPassengerInBookTourHistory, getHistoryBookTourById } from '../services/api';
import { bookedTourGetInfo, bookedTourGetPassengers } from '../actions/index.js';
import { COLOR_MAIN } from '../constants/index';
import localized from '../localization/index';

import HistoryCard from '../components/HistoryCard';

class History extends Component {
  static navigationOptions = {
    title: localized.historyBook,
  };

  constructor(props){
    super(props);
    this.state = {
      bookedTour: [],
      hasLoad: false,
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
            this.setState({bookedTour: responseJson.data});
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

  componentWillMount(){
    this.callGetHistoryByUser()
        .then(()=>{
          this.setState({hasLoad: true});
        })
  }

  render() {
    const {bookedTour} = this.state;

    let index = 0;
    let history = bookedTour.map((val,key)=>{
      index += 1;
      return(
        <View key={key}>
            <HistoryCard data={val} onPress={this.onPress}/>
            { index != bookedTour.length &&
              <Divider style={{height: 0.5, marginHorizontal: 14}}/>
            }
        </View>
      )
    });

    if (index == 0 && this.state.hasLoad){
      history = this.getNoTourView();
    }

    return (
      <View style={styles.container}>
        {history}
      </View>
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
