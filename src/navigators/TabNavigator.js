import React from 'react';
import { AsyncStorage } from 'react-native';
import {createBottomTabNavigator} from "react-navigation";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { handleAccess } from '../actions/index.js';

import MapStack from './MapStack';
import HistoryStack from './HistoryStack';
import SettingStack from './SettingStack';
import ToursStack from './ToursStack';

const TabNavigator = createBottomTabNavigator(
  {
    MapStack,
    ToursStack,
    HistoryStack,
    SettingStack,
  },
  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: 'tomato',
      inactiveTintColor: '#FFFFFF',
      style: {
        backgroundColor: '#324A5E',
        height: 60,
      },
    },
  }
);
TabNavigator.navigationOptions = ({ navigation }) => {

    if (navigation.state.index === 3){
      AsyncStorage.getItem('userToken').then((data) => {
        if (data == null){
          navigation.navigate("AuthStack");
        }
      })
    }

    if (navigation.state.routes.length > 1) {
      // console.log(navigation.state);
      navigation.state.routes.map(route => {
        if (route.routeName === "SettingStack") {
          tabBarVisible = false;
        } else {
          tabBarVisible = true;
        }
      });
    }

    return {
    };
};

function mapStateToProps(state){
  return{
    access: state.access,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    handleAccess: handleAccess,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigator);
