import React from 'react';
import {createStackNavigator} from "react-navigation";
import {fromRight} from 'react-navigation-transitions';

import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgetPassword from '../screens/ForgetPassword';

const AuthStack = createStackNavigator(
  {
    Login,
    ForgetPassword,
    Register,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    transitionConfig: () => fromRight(),
  }
);

export default AuthStack;
