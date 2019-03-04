import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "react-navigation";
import {fromRight} from 'react-navigation-transitions';

import Setting from '../screens/Setting';
import ChangePassword from '../screens/ChangePassword';

const SettingStack = createStackNavigator(
  {
    Setting,
    ChangePassword,
  },
  {
    defaultNavigationOptions: {
      // header: null,
    },
    transitionConfig: () => fromRight(),
  },
);
SettingStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 1) {
      navigation.state.routes.map(route => {
        if (route.routeName === "ChangePassword") {
          tabBarVisible = false;
        } else {
          tabBarVisible = true;
        }
      });
    }

    return {
      tabBarVisible,
      tabBarLabel: 'Setting',
      tabBarIcon: ({ tintColor }) => (<Icon name="md-settings" color={tintColor} size={30}/>),
    };
};

export default SettingStack;
