import React, { Component } from 'react';
import {Text, View, Image, StyleSheet } from 'react-native';
import {Marker, Callout} from 'react-native-maps';
import isEqual from 'lodash.isequal';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { tourDetailShowLocation, tourDetailChangeLocation } from '../actions/index.js';
import localized from '../localization/index';

class ScheduleMapMarker extends Component{
  constructor(props) {
  	super(props);
  	this.state = {
      ...props,
      tracksViewChanges: true,
      badge: null,
      isOrderVisible: false,
    };
  }

  getImageUrl(val){
    switch(val)
    {
      case "amusement":
        icon = require("../assets/images/markers/amusement.png");
        break;
      case "bank":
        icon = require("../assets/images/markers/bank.png");
        break;
      case "bus_stop":
        icon = require("../assets/images/markers/bus_stop.png");
        break;
      case "cafe_and_milk_tea":
        icon = require("../assets/images/markers/cafe_and_milk_tea.png");
        break;
      case "church":
        icon = require("../assets/images/markers/church.png");
        break;
      case "entertainment":
        icon = require("../assets/images/markers/entertainment.png");
        break;
      case "gas_station":
        icon = require("../assets/images/markers/gas_station.png");
        break;
      case "hospital":
        icon = require("../assets/images/markers/hospital.png");
        break;
      case "hotel":
        icon = require("../assets/images/markers/hotel.png");
        break;
      case "start_end":
        icon = require("../assets/images/markers/start_end.png");
        break;
      case "mall":
        icon = require("../assets/images/markers/mall.png");
        break;
      case "market":
        icon = require("../assets/images/markers/market.png");
        break;
      case "marketnight":
        icon = require("../assets/images/markers/marketnight.png");
        break;
      case "museum":
        icon = require("../assets/images/markers/museum.png");
        break;
      case "police":
        icon = require("../assets/images/markers/police.png");
        break;
      case "restaurant":
        icon = require("../assets/images/markers/restaurant.png");
        break;
      case "sport":
        icon = require("../assets/images/markers/sport.png");
        break;
      case "temple":
        icon = require("../assets/images/markers/temple.png");
        break;
      case "tourist_area":
        icon = require("../assets/images/markers/tourist_area.png");
        break;
      case "zoo":
        icon = require("../assets/images/markers/zoo.png");
        break;
      case "airport":
        icon = require("../assets/images/markers/airport.png");
        break;
      default:
        break;
    }
    return icon;
  }

  _onMarkerPress(){
    this.setState({isOrderVisible: !this.state.isOrderVisible});
    this.props.tourDetailChangeLocation(this.props.val);
    this.props.tourDetailShowLocation(true);
  }

  _isInRoute(id){
    let idList = this.props.tourDetail.routes.map((val,key)=>{
      return(val.location.id);
    });
    return idList.indexOf(id);
  }

  hasGone(id, curLocationId){
    const {routes} = this.props.tourDetail;
    for (let i=0; i<routes.length; i++){
      if (routes[i].location.id == id){
        if (routes[i].id < curLocationId){
          return true;
        } else {
          return false;
        }
      }
    }
  }

  getBadge(id){
    let idList = this.props.tourDetail.routes.map((val,key)=>{
      return(val.location.id);
    });

    let indexOfID = idList.indexOf(id);

    if(indexOfID >= 0){
      let indexes = [], i;
      for(i = 0; i < idList.length; i++){
        if (idList[i] == this.props.val.id){
          indexes.push(i);
        }
      }

      let labels = indexes.join();

      if (indexes.length>1){
        return {
          label: '...',
          isMultiple: true,
          multipleLabel: labels,
        };
      } else {
        return {
          label: indexOfID,
          isMultiple: false,
          multipleLabel: '',
        };
      }
    } else {
      return {
        label: '',
        isMultiple: false,
        multipleLabel: '',
      };
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (!isEqual(this.props, nextProps)) {
      this.setState(() => ({
        tracksViewChanges: true,
      }))
    }
  }
  componentDidUpdate() {
    if (this.state.tracksViewChanges) {
      this.setState(() => ({
        tracksViewChanges: false,
      }))
    }
  }

  render(){
    const {val} = this.props;
    const {curRoute} = this.props.tourDetail;

    // Link ảnh địa điểm
    let icon = React.createRef();
    icon = this.getImageUrl(val.type.marker);

    if (curRoute != null){
      if (this._isInRoute(val.id)>=0 && !this.hasGone(val.id, curRoute.id)){
        icon = require("../assets/images/markers/location.png");
      } else if (this._isInRoute(val.id)>=0 && this.hasGone(val.id, curRoute.id)){
        icon = require("../assets/images/markers/location_gone.png");
      }
    } else {
      if (this._isInRoute(val.id)>=0){
        icon = require("../assets/images/markers/location.png");
      }
    }


    let badge = this.getBadge(val.id);

    return(
        <View>
          { (this.props.tourDetail.showMarker || this._isInRoute(val.id)>=0 ) &&
            <Marker
              coordinate={{
                latitude: parseFloat(val.latitude),
                longitude: parseFloat(val.longitude)
              }}
              onPress={() => {this._onMarkerPress()}}
              // tracksViewChanges={{this.state.tracksViewChanges}
              tracksViewChanges={false}
            >
                { this.state.isOrderVisible && this._isInRoute(val.id)>=0 && badge.isMultiple &&
                  <Text style={styles.callout}>{localized.order}: {badge.multipleLabel}</Text>
                }

                <Image source={icon} style={styles.image}/>

                { this._isInRoute(val.id)>=0 &&
                  <Text style={styles.num}>{badge.label}</Text>
                }

                <Callout tooltip={true}></Callout>
            </Marker>
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    alignSelf: 'flex-end',
    transform: [{scaleX: 0.7}, {scaleY: 0.7}, {translateY: -5}, {translateX: 5}],
  },
  image: {
    width: 32,
    height: 32,
    alignSelf: 'center'
  },
  callout: {
    backgroundColor: '#fff',
    marginBottom: 4,
    paddingHorizontal: 4,
    borderRadius: 10,
    elevation: 2,
  },
  num: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    transform: [{translateY: 5}],
  }

})

function mapStateToProps(state){
  return{
    tourDetail: state.tourDetail,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    tourDetailChangeLocation: tourDetailChangeLocation,
    tourDetailShowLocation: tourDetailShowLocation,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleMapMarker);
