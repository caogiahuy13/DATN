import React from 'react';
import {createSwitchNavigator} from "react-navigation";

import Login from '../screens/Login';
import Register from '../screens/Register';
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
