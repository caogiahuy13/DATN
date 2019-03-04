import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "react-navigation";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
    tabBarIcon: ({ tintColor }) => (<FontAwesome name="map" color={tintColor} size={30}/>),
};

export default MapStack;
