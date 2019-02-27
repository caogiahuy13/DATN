import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default class Map extends Component {
  getNearMe(lat, lng){
    return fetch('http://10.0.3.2:5000/location/getNearMe', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                lat: 10.762864,
                lng: 106.682229,
                distance: 2,
              }),
            }).then((response) => response.json())
              .then((responseJson) => {
                  this.setState({
                    isLoading: false,
                    dataSource: responseJson.data,
                  });
              })
              .catch((error) => {
                console.error(error);
              });
  }
  getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
            region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }
        });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      region: {
        latitude:  10.762864,
        longitude: 106.682229,
      }
    }
  }

  componentWillMount()
  {
    return this.getCurrentLocation();
  }

  componentDidMount()
  {
    return this.getNearMe(this.state.region.latitude, this.state.region.longitude);
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    console.log(this.state.dataSource);
    let markers = this.state.dataSource.map((val,key)=>{
        return <Marker key={key} coordinate={{
                  latitude: val.latitude,
                  longitude: val.longitude,}}
                  title={val.name}
                  description={val.description}
                  onCalloutPress = {()=>{Alert.alert(val.address)}}
                >
                </Marker>
    });
    return(
        <MapView style={styles.map}
            initialRegion={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
          }}>
              {markers}
          </MapView>
    );

  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
      fontSize: 20,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
      },
})
