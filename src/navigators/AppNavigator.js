import React from 'react';
import {createSwitchNavigator, createStackNavigator} from "react-navigation";

import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';

const AppNavigator = createSwitchNavigator(
  {
    TabNavigator,
    AuthStack,
  },
  {
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      // initialRouteName: 'Login',
      header: null,
    },
  }
);

export default AppNavigator;
