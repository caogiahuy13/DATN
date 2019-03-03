/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Setting from './src/screens/Setting';
import Example from './src/components/Example';

AppRegistry.registerComponent(appName, () => Setting);
