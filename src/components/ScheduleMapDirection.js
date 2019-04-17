import React, { Component } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { GOOGLE_MAPS_APIKEY } from '../constants/index';

class ScheduleMapDirection extends Component{
  getAllCoordinates(){
    const data = this.props.tourDetail.routes;
    let allCoordinates = [];
    for (let i=0; i<data.length; i++){
      allCoordinates.push({
        latitude: data[i].location.latitude,
        longitude: data[i].location.longitude,
      });
    }
    return allCoordinates;
  }

  createCoordinates(type, id){
    // const data = this.props.tourDetail.routes;

    const data = [];
    const {routes} = this.props.tourDetail;

    if (type == 1){
      for (let i=0; i<routes.length; i++){
        if (routes[i].id != id){
          data.push(routes[i]);
        } else {
          break;
        }
      }
    } else if (type == 2){
      let check = false;
      for (let i=0; i<routes.length; i++){
        if (check){
          data.push(routes[i]);
        }

        if (routes[i].id == id){
          check = true;
          data.push(routes[i]);
        }
      }
    }

    let coordinates = [];
    let smallCoordinates = [];
    let airways = [];
    let smallAirways = [];
    let count = 0;
    let isAfterAirways = false;

    for (let i=0; i<data.length; i++){
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
    }
  }

  render(){
    let allCoordinates = this.getAllCoordinates();

    let goneRoutes = this.createCoordinates(1,125);
    let routes = this.createCoordinates(2,125);

    let goneCoordinates = goneRoutes.coordinates.map((val,key)=>{
        return (
          <MapViewDirections
            key={key}
            origin={val[0]}
            waypoints={(val.length > 2) ? val.slice(1, -1) : null}
            destination={val[val.length-1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={2}
            strokeColor="rgba(0,0,0,0.3)"
            onReady={(result) => {
              this.props.parent().fitToCoordinates(allCoordinates,{
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              });
            }}
          />
        );
    });

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
        {goneCoordinates}
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
