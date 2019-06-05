import React from 'react';
import {createSwitchNavigator, createStackNavigator} from "react-navigation";

import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';
import Splash from '../screens/Splash';

const AppNavigator = createSwitchNavigator(
  {
    Splash,
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
