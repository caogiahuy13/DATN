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
      types: [
        { name: 'Restaurant', id: 1 },
        { name: 'Amusement', id: 2 },
        { name: 'Market', id: 3 },
        { name: 'Night Marker', id: 4 },
        { name: 'Cafe and Milk, Tea', id: 5 },
        { name: 'Bus Stop', id: 6 },
        { name: 'Gas Station', id: 7 },
        { name: 'Mall', id: 8 },
        { name: 'Sport', id: 9 },
        { name: 'Police', id: 10 },
        { name: 'Hospital', id: 11 },
        { name: 'Bank', id: 12 },
        { name: 'Church', id: 13 },
        { name: 'Hotel', id: 14 },
        { name: 'Museum', id: 15 },
        { name: 'Park', id: 16 },
        { name: 'Tourist Area', id: 17 },
        { name: 'Start End', id: 18 },
        { name: 'Temple', id: 19 },
        { name: 'Airport', id: 20 },
      ],
    }
  }

  render() {
    onCheck = (id) => {
      filterTypes[id] = !filterTypes[id];
      this.props.filterType(filterTypes);
    }

    let filterTypes = this.props.filterLocation.filterTypes;

    let checkBoxes = this.state.types.map((val,key)=>{
        return (<CheckBox
                    title={val.name}
                    key={key}
                    checked={filterTypes[val.id]}
                    onPress={()=>{onCheck(val.id)}}
                />);
    });

    return (
      <ScrollView style={styles.container}>
        {checkBoxes}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        marginTop: 5,
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
