import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { GOOGLE_MAPS_APIKEY } from '../constants/index';

class ScheduleMapDirection extends Component{
  createCoordinates(){
    const data = this.props.tourDetail.routes;

    let coordinates = [];
    let smallCoordinates = [];
    let airways = [];
    let smallAirways = [];
    let count = 0;
    let isAfterAirways = false;
    let allCoordinates = [];

    for (let i=0; i<data.length; i++){
      allCoordinates.push({
        latitude: data[i].location.latitude,
        longitude: data[i].location.longitude,
      });

      smallCoordinates.push({
        latitude: data[i].location.latitude,
        longitude: data[i].location.longitude,
      });
      count++;

      if (isAfterAirways){
        smallAirways.push({
          latitude: data[i].location.latitude,
          longitude: data[i].location.longitude,
        });

        airways.push(smallAirways);
        smallAirways = [];
        isAfterAirways = false;
      }

      if (data[i].transport.id == 3){
        smallAirways.push({
          latitude: data[i].location.latitude,
          longitude: data[i].location.longitude,
        });

        coordinates.push(smallCoordinates);
        smallCoordinates = [];
        isAfterAirways = true;
        count = 0;
        continue;
      }

      if (count == 22){
        coordinates.push(smallCoordinates);
        smallCoordinates = [];
        smallCoordinates.push({
          latitude: data[i].location.latitude,
          longitude: data[i].location.longitude,
        });
      }
    }

    coordinates.push(smallCoordinates);

    return {
      coordinates: coordinates,
      airways: airways,
      allCoordinates: allCoordinates,
    }
  }

  createGoneCoordinates(){
    const data = [];
    const {routes} = this.props.tourDetail;

    for (let i=0; i<routes.length; i++){
      console.log(routes[i]);
      if (routes[i].id != '121'){
        data.push(routes[i]);
      } else {
        break;
      }
    }

    let coordinates = [];
    let smallCoordinates = [];
    let airways = [];
    let smallAirways = [];
    let count = 0;
    let isAfterAirways = false;
    let allCoordinates = [];

    for (let i=0; i<data.length; i++){
      allCoordinates.push({
        latitude: data[i].location.latitude,
        longitude: data[i].location.longitude,
      });

      smallCoordinates.push({
        latitude: data[i].location.latitude,
        longitude: data[i].location.longitude,
      });
      count++;

      if (isAfterAirways){
        smallAirways.push({
          latitude: data[i].location.latitude,
          longitude: data[i].location.longitude,
        });

        airways.push(smallAirways);
        smallAirways = [];
        isAfterAirways = false;
      }

      if (data[i].transport.id == 3){
        smallAirways.push({
          latitude: data[i].location.latitude,
          longitude: data[i].location.longitude,
        });

        coordinates.push(smallCoordinates);
        smallCoordinates = [];
        isAfterAirways = true;
        count = 0;
        continue;
      }

      if (count == 22){
        coordinates.push(smallCoordinates);
        smallCoordinates = [];
        smallCoordinates.push({
          latitude: data[i].location.latitude,
          longitude: data[i].location.longitude,
        });
      }
    }

    coordinates.push(smallCoordinates);

    return {
      coordinates: coordinates,
      airways: airways,
      allCoordinates: allCoordinates,
    }
  }
  render(){
    let routes = this.createCoordinates();

    let allCoordinates = routes.allCoordinates;

    let coordinates = routes.coordinates.map((val,key)=>{
        return (
          <MapViewDirections
            key={key}
            origin={val[0]}
            waypoints={(val.length > 2) ? val.slice(1, -1) : null}
            destination={val[val.length-1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={2}
            strokeColor="rgba(66,133,244,0.7)"
            onReady={(result) => {
              this.props.parent().fitToCoordinates(allCoordinates,{
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              });
            }}
          />
        );
    });

    let airways = routes.airways.map((val,key)=>{
        return (
          <Polyline
            key={key}
        		coordinates={val}
        		strokeWidth={2}
            strokeColor='red'
        	/>
        );
    });

    return(
      <View>
        {coordinates}
        {airways}
      </View>
    );
  }
}

function mapStateToProps(state){
  return{
    tourDetail: state.tourDetail,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleMapDirection);
