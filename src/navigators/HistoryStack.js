import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "react-navigation";

import History from '../screens/History';

const HistoryStack = createStackNavigator(
  {
    History: {
      screen: History
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);
HistoryStack.navigationOptions = {
    tabBarLabel: 'History',
    tabBarIcon: ({ tintColor }) => (<Icon name="ios-time" size={22}/>),
};

export default HistoryStack;
