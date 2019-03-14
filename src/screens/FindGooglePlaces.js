import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, CheckBox } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { GOOGLE_MAPS_APIKEY } from '../constants/index';

class FindGooglePlaces extends Component {
  static navigationOptions = {
    title: 'Search Location',
  };

  render(){
    return(
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
                this.props.navigation.state.params.move(details.geometry.location.lat, details.geometry.location.lng);
                this.props.navigation.goBack();
              }}

          getDefaultValue={() => ''}

          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_MAPS_APIKEY,
            language: 'en', // language of the results
            country: 'VN',
          }}

          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              margin: 8,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: 'gray',
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
          }}

          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})

export default FindGooglePlaces;
