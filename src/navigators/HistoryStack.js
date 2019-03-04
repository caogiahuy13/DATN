import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "react-navigation";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
    tabBarIcon: ({ tintColor }) => (<FontAwesome name="history" color={tintColor} size={30}/>),
};

export default HistoryStack;
