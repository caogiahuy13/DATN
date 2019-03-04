import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "react-navigation";

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
    tabBarIcon: ({ tintColor }) => (<Icon name="ios-car" size={22}/>),
};

export default ToursStack;
