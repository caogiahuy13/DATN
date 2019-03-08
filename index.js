/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Setting from './src/screens/Setting';
import ChangePassword from './src/screens/ChangePassword';
import TourDetail from './src/components/TourDetail';


AppRegistry.registerComponent(appName, () => TourDetail);
