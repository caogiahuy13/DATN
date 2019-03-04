import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './screens/Login';
import History from './screens/History';
import Map from './screens/Map';
import Setting from './screens/Setting';
import Tours from './screens/Tours';

const MapStack = createStackNavigator(
  {
    Map: {
      screen: Map
    },
  },
  {
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      header: null,
    },
  }
);
MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ tintColor }) => (<FontAwesome name="map" color={tintColor} size={30}/>),
};

const ToursStack = createStackNavigator(
  {
    Tours: {
      screen: Tours
    },
  },
  {
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      header: null,
    },
  }
);
ToursStack.navigationOptions = {
    tabBarLabel: 'Tours',
    tabBarIcon: ({ tintColor }) => (<MaterialIcon name="map-marker-distance" color={tintColor} size={30}/>),
};


const HistoryStack = createStackNavigator(
  {
    History: {
      screen: History
    },
  },
  {
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      header: null,
    },
  }
);
HistoryStack.navigationOptions = {
    tabBarLabel: 'History',
    tabBarIcon: ({ tintColor }) => (<FontAwesome name="history" color={tintColor} size={30}/>),
};

const SettingStack = createStackNavigator(
  {
    Setting: {
      screen: Setting
    },
  },
  {
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      header: null,
    },
  },
);
SettingStack.navigationOptions = {
    tabBarLabel: 'Setting',
    tabBarIcon: ({ tintColor }) => (<Icon name="md-settings" color={tintColor} size={30}/>),
};

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

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    TabNavigator,
  },
  {
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      header: null,
    },
  }
);

export default AppNavigator;
