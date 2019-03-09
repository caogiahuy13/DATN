import React from 'react';
import {createStackNavigator} from "react-navigation";
import {fromRight} from 'react-navigation-transitions';

import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthStack = createStackNavigator(
  {
    Login,
    Register
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    transitionConfig: () => fromRight(),
  }
);

export default AuthStack;
