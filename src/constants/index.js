export const HOST = 'http://10.0.3.2:5000/';
export const API_CMS_URL='http://10.0.3.2:8080/wordpress/wp-json/wp/v2/';

// Cac buoc chay localhost tren device:
// 1. Doi URL o day, dia chi ip dung ipconfig lay ipv4 cua Wireless LAN adapter Wi-Fi
// 2. Dung extension ADB o google chrome, doi port forwarding
// 3. Chay dong lenh: react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

// export const HOST = 'http://192.168.3.101:5000/';
// export const API_CMS_URL='http://192.168.3.101:8080/wordpress/wp-json/wp/v2/';

export const GOOGLE_MAPS_APIKEY = 'AIzaSyDL7sUf9bCXYdpq5RGDBvnxD1VG9C1619Q';
export const GOOGLE_MAPS_APIKEY_TWO = 'AIzaSyAwixBpyJe3b4Xo1xg74UUa3LyHPN8OnXY';

export const CLIENT_ID_PAYPAL='AYrDxkvR5mFtEM1-cEJLd0DDlgghEBW1Srvh_PCG8sWtGRg3BOBH4_3xfA-vJL9FNDKBEX2aWX7qBCJu';
export const SECRET_PAYPAL='EGPWpcoAadmvCGr9WWPI_GWIbj9L22KPU8z667Ennma0jtYEXg2-fwZzGik1cj9p7Up5eCytlr4D8eC8';
export const API_CONVERT_CURRENCY='http://apilayer.net/api/';
export const KEY_CONVERT_CURRENCY='ae1a0d9d784ff23a851f3502b24eacf2';

export const COLOR_MAIN = '#324a5e';
export const COLOR_GREEN = '#1BBC9B';
export const COLOR_LIGHT_BLACK = '#43484D'; // default color for card title 'react-native-elements'
export const COLOR_GRAY = '#434A54'; // website main gray color
export const COLOR_HARD_RED = '#C50000'; // book tour button color
export const COLOR_GRAY_BACKGROUND = '#F4F5F4'; // background color of setting
export const COLOR_LIGHT_BLUE = '#2089DC'; // default color of react-native-elements button
export const COLOR_PLACEHOLDER = 'rgba(0,0,0,0.15)'; // place holder color for text input
export const COLOR_MAP_DIRECTION_BLUE = "rgba(66,133,244,0.7)"; // color of map direction
export const COLOR_MAP_DIRECTION_GRAY = "rgba(0,0,0,0.2)"; // color of map direction for gone location
export const COLOR_MAP_DIRECTION_RED = 'red'; // color of airways direction

export const ERR_USERNAME = 'Email or Phone number must be in right format';
export const ERR_PASSWORD = 'Password is required';
export const ERR_FULLNAME = 'Fullname is required';
export const ERR_NAME = 'Name is required';
export const ERR_PHONE = 'Phone number is required';
export const ERR_EMAIL = 'Email is required';
export const ERR_EMAIL_VALIDATE = 'Wrong email type';
export const ERR_CONFIRM_PASSWORD = 'Password and Confirm password must be match!';
export const ERR_PHONE_LENGTH = 'Phone number must be 10 digits!';
export const ERR_ALL_FIELD = 'All fields is required';
export const ERR_MESSAGE = 'Message is required';

export const ERR_BOOKING_CONTACT_INFO = 'All contact information is required';
export const ERR_BOOKING_PASSENGER_INFO = 'Fullname, Birthdate, gender of passenger are required';
export const ERR_BOOKING_PASSENGER_MIN = 'There must be 1 passenger';

export const SUCCESS_CHANGE_PASSWORD = 'Change Password Successfully';

const NEWS = 2;
export const mainCategoriesList = [NEWS];
