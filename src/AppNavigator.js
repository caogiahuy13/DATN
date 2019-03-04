import React from 'react';
import {Dimensions, TouchableOpacity, Alert} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  tabBarIcon: ({ tintColor }) => (<FontAwesome name="map" color={tintColor} size={30}/>),
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
    tabBarIcon: ({ tintColor }) => (<MaterialIcon name="map-marker-distance" color={tintColor} size={30}/>),
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
    tabBarIcon: ({ tintColor }) => (<FontAwesome name="history" color={tintColor} size={30}/>),
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
