import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "react-navigation";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fromRight} from 'react-navigation-transitions';

import Map from '../screens/Map';
import TourDetail from '../screens/TourDetail';
import Filter from '../screens/Filter';
import FindGooglePlaces from '../screens/FindGooglePlaces';

const MapStack = createStackNavigator(
  {
    Map,
    TourDetail,
    Filter,
    FindGooglePlaces,
  },
  {
    defaultNavigationOptions: {
      // header: null,
    },
    transitionConfig: () => fromRight(),
  },
);
MapStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.routes.length > 1) {
      navigation.state.routes.map(route => {
        if (route.routeName === "TourDetail" || route.routeName === "Filter" || route.routeName === "FindGooglePlaces") {
          tabBarVisible = false;
        } else {
          tabBarVisible = true;
        }
      });
    }

    return {
      tabBarVisible,
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => (<FontAwesome name="map" color={tintColor} size={30}/>),
    };
};

export default MapStack;
