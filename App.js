/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createAppContainer } from "react-navigation";
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import AppNavigator from './src/navigators/AppNavigator';
import allReducers from './src/reducers/index';

const store = createStore(allReducers);

const AppContainer = createAppContainer(AppNavigator);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      // <AppContainer/>
      <Provider store= {store}>
        <AppContainer/>
      </Provider>
    );
  }
}
