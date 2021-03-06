import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "react-navigation";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {fromRight} from 'react-navigation-transitions';

import { COLOR_MAIN } from '../constants/index';

import TopTours from '../screens/TopTours';
import TourDetail from '../screens/TourDetail';
import BookingInfo from '../screens/BookingInfo';
import BookingPayment from '../screens/BookingPayment';
import BookingConfirmation from '../screens/BookingConfirmation';
import Review from '../screens/Review';
import ListTours from '../screens/ListTours';
import Policy from '../screens/Policy';

const ToursStack = createStackNavigator(
  {
    TopTours,
    TourDetail,
    BookingInfo,
    BookingPayment,
    BookingConfirmation,
    Review,
    ListTours,
    Policy,
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
  }
);
ToursStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.routes.length > 1) {
      navigation.state.routes.map(route => {
        if (route.routeName === "TopTours"){
          tabBarVisible = true;
        } else {
          tabBarVisible = false;
        }
      });
    }

    return {
      tabBarVisible,
      tabBarLabel: 'Tours',
      tabBarIcon: ({ tintColor }) => (<MaterialIcon name="map-marker-distance" color={tintColor} size={33}/>),
    };
};

export default ToursStack;
