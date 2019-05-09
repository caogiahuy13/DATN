import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "react-navigation";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fromRight} from 'react-navigation-transitions';

import { COLOR_MAIN } from '../constants/index';

import Map from '../screens/Map';
import TourDetail from '../screens/TourDetail';
import Filter from '../screens/Filter';
import FindGooglePlaces from '../screens/FindGooglePlaces';
import BookingInfo from '../screens/BookingInfo';
import BookingPayment from '../screens/BookingPayment';
import BookingConfirmation from '../screens/BookingConfirmation';
import ChoseLocation from '../screens/ChoseLocation';
import RecommendedTour from '../screens/RecommendedTour';
import ListTours from '../screens/ListTours';

const MapStack = createStackNavigator(
  {
    Map,
    TourDetail,
    BookingInfo,
    BookingPayment,
    BookingConfirmation,
    Filter,
    FindGooglePlaces,
    ChoseLocation,
    RecommendedTour,
    ListTours,
  },
  {
    defaultNavigationOptions: {
      // header: null,
      headerStyle: {
        backgroundColor: COLOR_MAIN,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      tabBarVisible: false,
    },
    transitionConfig: () => fromRight(),
  },
);
MapStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.routes.length > 1) {
      navigation.state.routes.map(route => {
        if (route.routeName === "TourDetail" ||
            route.routeName === "Filter" ||
            route.routeName === "FindGooglePlaces" ||
            route.routeName === "ChoseLocation" ||
            route.routeName === "RecommendedTour" ||
            route.routeName === "ListTours") {
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
