import React from 'react';
import {createStackNavigator} from "react-navigation";

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
  }
);

export default AuthStack;
