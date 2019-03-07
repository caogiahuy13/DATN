import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { Button, Icon } from 'react-native-elements';

import {handleModalLocation, handleTourCarousel} from '../actions/index.js';

import TourCarouselEntry from './TourCarouselEntry';

const window = Dimensions.get('window');
const { width, height }  = window;

class TourCarousel extends Component {
  // render tour carousel tương ứng với tour đi qua địa điểm
  _renderItem ({item, index}) {
      return (
          <TourCarouselEntry item={item}/>
      );
  }

  render(){
    const {tours} = this.props.modalLocation.location;

    return(
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={tours}
        renderItem={this._renderItem.bind(this)}
        sliderWidth={width}
        itemWidth={width/1.2}
        layout={'default'}
      />
    )
  }
}

function mapStateToProps(state){
  return{
    modalLocation: state.modalLocation,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    handleModalLocation: handleModalLocation,
    handleTourCarousel: handleTourCarousel,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TourCarousel);
