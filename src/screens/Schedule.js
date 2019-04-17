import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Moment from 'moment';
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

  watchID = null;

  constructor(props){
    super(props);
    this.state = {
      route: [],
      curLocation: null,

      watchID: null,
      initialPosition: 'unknown',
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
    const {initialPosition} = this.state;
    let date = new Date();

    let data = {
      // id: this.props.navigation.getParam("id"),
      // lat: 37.948509,
      // lng: 27.368055,
      // cur_time: "2019-04-20T10:10:00.000"
      id: this.props.navigation.getParam("idTourTurn"),
      lat: initialPosition.coords.latitude,
      lng: initialPosition.coords.longitude,
      cur_time: date,
    }
    console.log(data);

    let status;
    return getCurrentRoute(data)
            .then((response) => {
                status = response.status;
                return response.json();
              })
            .then((responseJson) => {
              if (status != 200){
                Alert.alert(responseJson.msg);
              } else if (status == 200){
                console.log(responseJson);
                if (responseJson.data != null){
                  this.setState({curLocation: responseJson.data[0]})
                  this.props.tourDetailCurrentRoute(responseJson.data[0]);
                } else {
                  this.setState({curLcation: null});
                  this.props.tourDetailCurrentRoute(null);
                }
              }
            })
            .catch((error) => console.error(error));
  }

  getScheduleCard(){
    const {route, curLocation} = this.state;

    let curDay = 0;

    let scheduleCards = route.map((val,key)=>{
      let isActive = curLocation ? (curLocation.id == val.id) : false;
      if (val.day > curDay){
        curDay += 1;

        return(
          <View key={key}>
              <InfoText text={localized.day + " " + val.day}/>
              <ScheduleCard data={val} active={isActive}/>
          </View>
        )
      } else {
        return(<ScheduleCard key={key} data={val} active={isActive}/>)
      }
    })
    return scheduleCards;
  }

  componentWillMount(){
    const idTour = this.props.navigation.getParam("idTour");
    // this.callGetCurrentRoute();
    this.callGetRouteByTour(idTour);
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
          console.log(position);
          this.setState({initialPosition: position},()=>{
            this.callGetCurrentRoute();
          });
      },
      (error) => console.log(new Date(), error),
      {enableHighAccuracy: false, timeout: 10000}
    );

    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({ initialPosition: position },()=>{
          this.callGetCurrentRoute();
        });
        console.log(position);
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: false, timeout: 20000, distanceFilter: 1}
    );
  }

  componentWillUnmount(){
      navigator.geolocation.clearWatch(this.watchID);
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
