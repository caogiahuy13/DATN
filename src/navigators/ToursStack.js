import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "react-navigation";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Tours from '../screens/Tours';

const ToursStack = createStackNavigator(
  {
    Tours: {
      screen: Tours
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);
ToursStack.navigationOptions = {
    tabBarLabel: 'Tours',
    tabBarIcon: ({ tintColor }) => (<MaterialIcon name="map-marker-distance" color={tintColor} size={30}/>),
};

export default ToursStack;
