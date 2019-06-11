import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "react-navigation";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fromRight} from 'react-navigation-transitions';

import { COLOR_MAIN } from '../constants/index';

import Tours from '../screens/Tours';
import SearchFilter from '../screens/SearchFilter';
import TourDetail from '../screens/TourDetail';
import BookingInfo from '../screens/BookingInfo';
import BookingPayment from '../screens/BookingPayment';
import BookingConfirmation from '../screens/BookingConfirmation';
import TourCard from '../components/TourCard';
import Review from '../screens/Review';
import ListTours from '../screens/ListTours';
import Policy from '../screens/Policy';
const SearchStack = createStackNavigator(
  {
    Tours,
    TourCard,
    SearchFilter,
    TourDetail,
    Review,
    BookingInfo,
    BookingPayment,
    BookingConfirmation,
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
SearchStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.routes.length > 1) {
      navigation.state.routes.map(route => {
        if (route.routeName === "TourDetail" ||
            route.routeName === "BookingInfo" ||
            route.routeName === "BookingPayment" ||
            route.routeName === "BookingConfirmation" ||
            route.routeName === "SearchFilter" ||
            route.routeName === "Review" ||
            route.routeName === "ListTours" ||
            route.routeName === "Policy") {
          tabBarVisible = false;
        } else {
          tabBarVisible = true;
        }
      });
    }

    return {
      tabBarVisible,
      tabBarLabel: 'Tours',
      tabBarIcon: ({ tintColor }) => (<FontAwesome name="search" color={tintColor} size={30}/>),
    };
};

export default SearchStack;
