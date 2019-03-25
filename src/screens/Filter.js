import React, { Component } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Text, Button, CheckBox } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { filterType } from '../actions/index.js';
import localized from '../localization/index';

class Filter extends Component {
  static navigationOptions = {
    title: localized.filterLocationType,
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

    onCheckAll = () => {
      for (i = 0; i<filterTypes.length; i++){
        filterTypes[i] = true;
      }
      this.props.filterType(filterTypes);
    }

    onUncheckAll = () => {
      for (i = 0; i<filterTypes.length; i++){
        filterTypes[i] = false;
      }
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
      <View style={{flex: 1}}>
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Button
                  containerStyle={styles.button}
                  buttonStyle={{borderWidth: 0.6}}
                  title={localized.checkAll}
                  type='outline'
                  onPress={()=>onCheckAll()}
                />
                <Button
                  containerStyle={styles.button}
                  buttonStyle={{borderColor: 'red', borderWidth: 0.6}}
                  titleStyle={{color: 'red'}}
                  title={localized.uncheckAll}
                  type='outline'
                  onPress={()=>onUncheckAll()}
                />
            </View>
            <ScrollView style={styles.scroll}>
                {checkBoxes}
            </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
    },
    scroll: {
      paddingHorizontal: 8,
      marginTop: 8,
    },
    button: {
      paddingHorizontal: 8,
      flex: 1,
    }
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
