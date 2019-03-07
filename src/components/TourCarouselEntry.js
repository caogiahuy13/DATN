import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { Button, Icon } from 'react-native-elements';

export default class TourCarouselEntry extends Component {

    testfunc(){
      console.log("TEST2");
    }

    render () {
        return (
          <Button title="TEST" onPress={()=>{this.testfunc()}}/>
        )
    }
}
