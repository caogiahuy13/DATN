import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { tourDetailCurrentRoute } from '../actions/index.js';
import { getRouteByTour, getCurrentRoute } from '../services/api';
import { COLOR_MAIN, COLOR_GRAY_BACKGROUND } from '../constants/index';
import { } from '../services/function';
import localized from '../localization/index';

import ScheduleCard from '../components/ScheduleCard';
import InfoText from '../components/InfoText';
import ScheduleMap from '../components/ScheduleMap';

class Schedule extends Component {
  static navigationOptions = {
    title: localized.schedule,
  };

  constructor(props){
    super(props);
    this.state = {
      route: [],
      curLocation: null,
      watchID: null,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    }
  }

  async callGetRouteByTour(id){
    return getRouteByTour(id)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({route: responseJson.data})
            })
            .catch((error) => console.error(error));
  }

  async callGetCurrentRoute(){
    let data = {
      id: 34,
      lat: 37.948509,
      lng: 27.368055,
      cur_time: "2019-04-20T10:10:00.000"
    }
    return getCurrentRoute(data)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({curLocation: responseJson.data[0]})
              this.props.tourDetailCurrentRoute(responseJson.data[0]);
            })
            .catch((error) => console.error(error));
  }

  getScheduleCard(){
    const {route, curLocation} = this.state;

    let curDay = 0;

    let scheduleCards = route.map((val,key)=>{
      if (val.day > curDay){
        curDay += 1;
        let isActive = curLocation ? (curLocation.id == val.id) : false;
        return(
          <View key={key}>
              <InfoText text={localized.day + " " + val.day}/>
              <ScheduleCard data={val} active={isActive}/>
          </View>
        )
      } else {
        return(<ScheduleCard key={key} data={val}/>)
      }
    })
    return scheduleCards;
  }

  componentWillMount(){
    const id = this.props.navigation.getParam("id");
    this.callGetCurrentRoute();
    this.callGetRouteByTour(id);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{height: 400, marginBottom: 10}}>
            <ScheduleMap/>
        </View>
          {this.getScheduleCard()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_GRAY_BACKGROUND,
  },
})

function mapStateToProps(state){
  return{
    bookedTour: state.bookedTour,

  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    tourDetailCurrentRoute: tourDetailCurrentRoute,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
