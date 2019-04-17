import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {  } from '../actions/index.js';
import { COLOR_MAIN } from '../constants/index';
import localized from '../localization/index';

import ChoseLocationCard from '../components/ChoseLocationCard';

class ChoseLocation extends Component {
  static navigationOptions = {
    title: localized.choseLocations,
  };

  onGetRecommendedTourPress(){
    this.props.navigation.navigate("RecommendedTour");
  }

  render() {
    const {locations} = this.props.recommendTour;

    let locationCards = locations.map((val,key)=>{
      return(
        <ChoseLocationCard key={key} data={val}/>
      )
    })

    return (
      <ScrollView style={styles.container}>
          {locationCards}

          { locations.length > 0 &&
            <Button
              title={localized.recommendedTour.toUpperCase()}
              type="solid"
              buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
              containerStyle={{padding: 16, borderRadius: 0}}
              titleStyle={{fontSize: 16}}
              onPress={()=>{this.onGetRecommendedTourPress()}}
            />
          }

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
    recommendTour: state.recommendTour,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoseLocation);
