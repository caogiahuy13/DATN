import React from 'react';
import { AsyncStorage } from 'react-native';
import {createBottomTabNavigator} from "react-navigation";

import MapStack from './MapStack';
import HistoryStack from './HistoryStack';
import SettingStack from './SettingStack';
import ToursStack from './ToursStack';

const TabNavigator = createBottomTabNavigator(
  {
    MapStack,
    ToursStack,
    HistoryStack,
    SettingStack,
  },
  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: 'tomato',
      inactiveTintColor: '#FFFFFF',
      style: {
        backgroundColor: '#324A5E',
        height: 60,
      },
    },
  }
);
TabNavigator.navigationOptions = ({ navigation }) => {
    if (navigation.state.index === 3){
      AsyncStorage.getItem('userToken').then((data) => {
        if (data == null){
          navigation.navigate("AuthStack");
        }
      })
    }

    return {
    };
};

export default TabNavigator;
