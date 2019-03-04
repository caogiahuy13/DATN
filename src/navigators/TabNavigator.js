import React from 'react';
import {createBottomTabNavigator} from "react-navigation";

import MapStack from './MapStack';
import HistoryStack from './HistoryStack';
import SettingStack from './SettingStack';
import ToursStack from './ToursStack';


const TabNavigator = createBottomTabNavigator({
  MapStack,
  ToursStack,
  HistoryStack,
  SettingStack,
});

export default TabNavigator;
