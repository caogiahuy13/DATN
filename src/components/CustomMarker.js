import React, { Component } from 'react';
import {Text, Button, View, Image, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import {Marker, Callout} from 'react-native-maps';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Badge, Icon} from 'react-native-elements';
import isEqual from 'lodash.isequal';

import { handleModalLocation, changeSelectedLocation, handleTourCarousel, filterLocation } from '../actions/index.js';

class CustomMarker extends Component{
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
    switch(val.type.marker)
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
    this.props.handleModalLocation(true);
    this.props.handleTourCarousel(false);
    this.props.changeSelectedLocation(this.props.val);
  }

  _isInRoute(id){
    let idList = this.props.currentRoute.data.map((val,key)=>{
      return(val.location.id);
    });
    return idList.indexOf(id);
  }

  getBadge(id){
    let idList = this.props.currentRoute.data.map((val,key)=>{
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

  // shouldComponentUpdate(nextProps, nextState) {
  // 	return nextProps.val.latitude != this.state.val.latitude && nextProps.val.longitude != this.state.val.longitude;
  // }
  //
  // componentDidUpdate(prevProps) {
  //     if (prevProps.val !== this.props.val) {
  //         this.setState({tracksViewChanges: true})
  //     } else if (this.state.tracksViewChanges) {
  //         this.setState({tracksViewChanges: false})
  //     }
  // }

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
    const { val, currentRoute, filterLocation } = this.props;

    // Link ảnh địa điểm
    let icon = React.createRef();
    icon = this.getImageUrl(val);

    if (currentRoute.isVisible && this._isInRoute(val.id)>=0){
      icon = require("../assets/images/markers/location.png");
    }
    // Ký tự cho địa điểm đi qua của tour ví dụ A, B, C, D
    // let char;
    // if (this._isInRoute(val.id)>=0){
    //   char = String.fromCharCode(65 + this._isInRoute(val.id));
    // }

    let badge = this.getBadge(val.id);

    return(
        <View>
          { filterLocation.filterTypes[val.type.id] &&
            <Marker
              coordinate={{
                latitude: val.latitude,
                longitude: val.longitude,
              }}
              onPress={() => {this._onMarkerPress()}}
              tracksViewChanges={this.state.tracksViewChanges}
              // ref={_marker => {this.marker = _marker;}}
              // onCalloutPress={() => {this.marker.hideCallout();}}
            >
                { this.state.isOrderVisible && currentRoute.isVisible && this._isInRoute(val.id)>=0 && badge.isMultiple &&
                  <Text style={styles.callout}>Orders: {badge.multipleLabel}</Text>
                }

                <Image source={icon} style={styles.image}/>

                { currentRoute.isVisible && this._isInRoute(val.id)>=0 &&
                  <Text style={styles.num}>{badge.label}</Text>
                }

                {/*!this.state.isOrderVisible && currentRoute.isVisible && this._isInRoute(val.id)>=0 &&
                  <Badge
                    status="error"
                    value={badge.label}
                    containerStyle={styles.badge}
                  />
                */}

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
    modalLocation: state.modalLocation,
    currentRoute: state.currentRoute,
    filterLocation: state.filterLocation,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    handleModalLocation: handleModalLocation,
    changeSelectedLocation: changeSelectedLocation,
    handleTourCarousel: handleTourCarousel,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomMarker);
