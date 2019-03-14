/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import FindGooglePlaces from './src/screens/FindGooglePlaces';
import TourCard from './src/components/TourCard';
import TourDetail2 from './src/screens/TourDetail2';

AppRegistry.registerComponent(appName, () => App);
