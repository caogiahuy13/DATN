/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Setting from './src/screens/Setting';
import FindGooglePlaces from './src/screens/FindGooglePlaces';

AppRegistry.registerComponent(appName, () => FindGooglePlaces);
