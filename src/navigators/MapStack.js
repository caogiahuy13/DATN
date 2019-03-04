import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "react-navigation";

import Map from '../screens/Map';

const MapStack = createStackNavigator(
  {
    Map: {
      screen: Map
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);
MapStack.navigationOptions = {
    tabBarLabel: 'Map',
    tabBarIcon: ({ tintColor }) => (<Icon name="ios-map" size={22}/>),
};

export default MapStack;
