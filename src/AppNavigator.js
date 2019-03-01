import React from 'react';
import {Dimensions, TouchableOpacity, Alert} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';

import Login from './screens/Login';
import History from './screens/History';
import Map from './screens/Map';
import Setting from './screens/Setting';
import Tours from './screens/Tours';
import Profile from './screens/Profile';
import ChangePassword from './screens/ChangePassword';

const MenuButton = (props) => (
    <TouchableOpacity onPress={()=>{Alert.alert("Test")}}>
        <Icon name="ios-map" size={22}/>
    </TouchableOpacity>
);

const MapStack = createStackNavigator(
  {
    Map: {
      screen: Map
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);
MapStack.navigationOptions = {
    tabBarLabel: 'Map',
    tabBarIcon: ({ tintColor }) => (<Icon name="ios-map" size={22}/>),
};

const ToursStack = createStackNavigator(
  {
    Tours: {
      screen: Tours
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);
ToursStack.navigationOptions = {
    tabBarLabel: 'Tours',
    tabBarIcon: ({ tintColor }) => (<Icon name="ios-car" size={22}/>),
};


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

const SettingStack = createStackNavigator(
  {
    Setting: {
      screen: Setting
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);
SettingStack.navigationOptions = {
    tabBarLabel: 'Setting',
    tabBarIcon: ({ tintColor }) => (<Icon name="ios-settings" size={22}/>),
};

const TabNavigator = createBottomTabNavigator({
  MapStack,
  ToursStack,
  HistoryStack,
  SettingStack,
});


const AppNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login
    },
    TabNavigator,
  },
  {
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      initialRouteName: 'Login',
      header: null,
    },
  }
);

export default AppNavigator;
