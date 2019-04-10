import React from 'react';
import { AsyncStorage } from 'react-native';
import {createBottomTabNavigator} from "react-navigation";

import { COLOR_MAIN } from '../constants/index';

import TabBarComponent from '../components/TabBarComponent';

import MapStack from './MapStack';
import SettingStack from './SettingStack';
import SearchStack from './SearchStack';
import ToursStack from './ToursStack';
import NewsStack from './NewsStack';

const TabNavigator = createBottomTabNavigator(
  {
    MapStack,
    NewsStack,
    ToursStack,
    SearchStack,
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
    if (navigation.state.index === 4){
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
