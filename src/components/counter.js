import React, { Component } from 'react';
// import { Container, Content, Text, Card, Header, Body, Button, Title, CardItem } from 'native-base';
import {Text, Button, View, Alert} from 'react-native';
import { increment, decrement, changeCurrentLocation } from '../actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Counter extends Component{
  getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(
      position => {
        // this.setState({
        //     region: {
        //         latitude: position.coords.latitude,
        //         longitude: position.coords.longitude,
        //     }
        // });
        this.props.changeCurrentLocation(position.coords.latitude, position.coords.longitude);
        console.log(position);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render(){
    console.log(this.props.count);
    console.log(this.props.region);
    return(
      <View>
          <Text>{this.props.count}</Text>
          <Button
            onPress={() => this.props.increment()}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={() => this.props.decrement()}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={() => {
                this.props.changeCurrentLocation(10,20);
                console.log(this.props.region);
                this.getCurrentLocation();
                console.log(this.props.region);
            }}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
      </View>
    );
  }
}

function mapStateToProps(state){
  return{
    count : state.count,
    region: state.region,
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({
    increment: increment,
    decrement: decrement,
    changeCurrentLocation: changeCurrentLocation,
  }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Counter);
