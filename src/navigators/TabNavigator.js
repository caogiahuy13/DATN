import React from 'react';
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
    // if (navigation.state.index === 3){
    //   navigation.navigate("HistoryStack");
    // }
    if (navigation.state.routes.length > 1) {
      console.log(navigation.state);
      navigation.state.routes.map(route => {
        if (route.routeName === "SettingStack") {
          tabBarVisible = false;
        } else {
          tabBarVisible = true;
        }
      });
    }

    return {
    };
};

export default TabNavigator;
