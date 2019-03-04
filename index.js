/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Setting from './src/screens/Setting';
import Example from './src/components/Example';
import DateTimePickerTester from './src/components/DateTimePickerTester';

AppRegistry.registerComponent(appName, () => App);
