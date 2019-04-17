import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {  } from '../actions/index.js';
import { COLOR_MAIN } from '../constants/index';
import localized from '../localization/index';

import ChoseLocationCard from '../components/ChoseLocationCard';

class ChoseLocation extends Component {
  static navigationOptions = {
    title: "CHOSE LOCATION",
  };

  onDelete(){

  }

  componentWillMount(){

  }

  render() {
    const {locations} = this.props.recommendTour;

    let locationCards = locations.map((val,key)=>{
      return(
        <ChoseLocationCard key={key} data={val}/>
      )
    })
    return (
      <View style={styles.container}>
          {locationCards}
      </View>
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
    recommendTour: state.recommendTour,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoseLocation);
