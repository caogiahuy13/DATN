import React from 'react';
import {createSwitchNavigator} from "react-navigation";

import Login from '../screens/Login';
import Register from '../screens/Register';
import TabNavigator from './TabNavigator';

const AppNavigator = createSwitchNavigator(
  {
    Login,
    Register,
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
