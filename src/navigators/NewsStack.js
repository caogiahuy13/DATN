import React from 'react';
import {createStackNavigator} from "react-navigation";
import {fromRight} from 'react-navigation-transitions';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR_MAIN } from '../constants/index';

import News from '../screens/News';
import NewsDetail from '../screens/NewsDetail';
import NewsTag from '../screens/NewsTag';

const NewsStack = createStackNavigator(
  {
    News,
    NewsDetail,
    NewsTag,
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
NewsStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.routes.length > 1) {
      navigation.state.routes.map(route => {
        if (route.routeName === "NewsDetail" ||
            route.routeName === "NewsTag") {
          tabBarVisible = false;
        } else {
          tabBarVisible = true;
        }
      });
    }

    return {
      tabBarVisible,
      tabBarLabel: 'News',
      tabBarIcon: ({ tintColor }) => (<MaterialIcon name="newspaper" color={tintColor} size={33}/>),
    };
};

export default NewsStack;
