/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import TourDetailMap from './src/components/TourDetailMap';
import BookingInfo from './src/screens/BookingInfo';
import HistoryDetail from './src/screens/HistoryDetail';
import TopTours from './src/screens/TopTours';
import SmallTourCard from './src/components/SmallTourCard';

AppRegistry.registerComponent(appName, () => TopTours);
