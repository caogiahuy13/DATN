import React from 'react';
import {createSwitchNavigator} from "react-navigation";

import Login from '../screens/Login';
import TabNavigator from './TabNavigator';

const AppNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login
    },
    TabNavigator,
  },
  {
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      initialRouteName: 'Login',
      header: null,
    },
  }
);

export default AppNavigator;
