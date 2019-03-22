import React from 'react';
import { AsyncStorage } from 'react-native';
import {createBottomTabNavigator} from "react-navigation";

import { COLOR_MAIN } from '../constants/index';

import TabBarComponent from '../components/TabBarComponent';

import MapStack from './MapStack';
import HistoryStack from './HistoryStack';
import SettingStack from './SettingStack';
import ToursStack from './ToursStack';

const TabNavigator = createBottomTabNavigator(
  {
    MapStack,
    ToursStack,
    // HistoryStack,
    SettingStack,
  },
  {
    tabBarComponent: TabBarComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: 'tomato',
      inactiveTintColor: '#FFFFFF',
      style: {
        backgroundColor: COLOR_MAIN,
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
