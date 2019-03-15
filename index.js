/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import FindGooglePlaces from './src/screens/FindGooglePlaces';
import TourCard from './src/components/TourCard';
import TourDetail from './src/screens/TourDetail';

AppRegistry.registerComponent(appName, () => App);
