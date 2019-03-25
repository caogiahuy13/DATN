import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, FlatList} from 'react-native';
import { Divider } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { getHistoryByUser, getPassengerInBookTourHistory } from '../services/api';
import { bookedTourGetInfo, bookedTourGetPassengers } from '../actions/index.js';
import { COLOR_MAIN } from '../constants/index';
import localized from '../localization/index';

import HistoryCard from '../components/HistoryCard';

class History2 extends Component {
  static navigationOptions = {
    title: localized.historyBook,
  };

  constructor(props){
    super(props);
    this.state = {
      bookedTour: [],
    }
  }

  onPress = (data) => {
    this.props.bookedTourGetInfo(data);
    this.callGetPassengerInBookTourHistory(data.id)
        .then((passengersData)=>{
          this.props.bookedTourGetPassengers(passengersData);
        })
    this.props.navigation.navigate("HistoryDetail");
  }

  callGetHistoryByUser(){
    return getHistoryByUser()
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({bookedTour: responseJson.data});
          })
          .catch((error) => console.error(error));
  }

  callGetPassengerInBookTourHistory(id){
    return getPassengerInBookTourHistory(id)
          .then((response) => response.json())
          .then((responseJson) => responseJson.data)
          .catch((error) => console.error(error));
  }

  componentWillMount(){
    this.callGetHistoryByUser();
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

export default connect(mapStateToProps, mapDispatchToProps)(History2);
