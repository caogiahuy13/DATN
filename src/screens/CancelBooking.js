import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Alert } from 'react-native';
import { Divider, Button, CheckBox } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { } from '../actions/index.js';
import { createCancelBookingRequest } from '../services/api';
import { COLOR_MAIN, COLOR_LIGHT_BLUE, COLOR_HARD_RED } from '../constants/index';
import {  } from '../services/function';
import localized from '../localization/index';

class CancelBooking extends Component {
  static navigationOptions = {
    title: localized.detailBookedTour,
  };

  constructor(props){
    super(props);

  }


  render() {
    return (
        <ScrollView style={styles.container}>

        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F5F4',
    },
})

function mapStateToProps(state){
  return{
    bookedTour: state.bookedTour,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelBooking);
