import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "react-navigation";
import {fromRight} from 'react-navigation-transitions';

import { COLOR_MAIN } from '../constants/index';

import Setting from '../screens/Setting';
import ChangePassword from '../screens/ChangePassword';
import AboutUs from '../screens/AboutUs';
import Contact from '../screens/Contact';
import ChangeAvatar from '../screens/ChangeAvatar';

const SettingStack = createStackNavigator(
  {
    Setting,
    ChangePassword,
    AboutUs,
    Contact,
    ChangeAvatar,
  },
  {
    defaultNavigationOptions: {
      // header: null,
      headerStyle: {
        backgroundColor: COLOR_MAIN,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      tabBarVisible: false,
    },
    transitionConfig: () => fromRight(),
  },
);
SettingStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.routes.length > 1) {
      navigation.state.routes.map(route => {
        if (route.routeName === "ChangePassword" || route.routeName === "AboutUs" || route.routeName === "Contact" || route.routeName === "ChangeAvatar") {
          tabBarVisible = false;
        } else {
          tabBarVisible = true;
        }
      });
    }

    return {
      tabBarVisible,
      tabBarLabel: 'Setting',
      tabBarIcon: ({ tintColor }) => (<Icon name="md-settings" color={tintColor} size={33}/>),
    };
};

export default SettingStack;
