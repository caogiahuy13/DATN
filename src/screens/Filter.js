import React, { Component } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Text, Button, CheckBox } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { filterType } from '../actions/index.js';

class Filter extends Component {
  static navigationOptions = {
    title: 'Filter location type',
    headerStyle: {
      backgroundColor: '#324a5e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    tabBarVisible: false,
  };

  constructor(props){
    super(props);
    this.state = {
      checked: true,
    }
  }


  render() {
    return (
      <ScrollView style={styles.container}>
        <CheckBox
          title='Click Here'
          checked={this.state.checked}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
    },
})

function mapStateToProps(state){
  return{
    filterLocation: state.filterLocation,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    filterType: filterType,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
