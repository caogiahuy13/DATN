import LocalizedStrings from 'react-native-localization';

import vi from './vi';
import en from './en';
import en_us from './en_us';

let localized = new LocalizedStrings({
 "en-US": en_us,
 en: en,
 vi: vi,
});

export default localized;
