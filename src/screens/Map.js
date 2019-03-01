import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default class Setting extends Component {
  render() {
    return (
      <MapView style={styles.map}
          initialRegion={{
            latitude: 10.762864,
            longitude: 106.682229,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }}>
            <Marker coordinate={{
              latitude: 10.762864,
              longitude: 106.682229,}}
              title={"Khoa Học Tự Nhiên"}
              description={"Trường Đại Học Khoa Học Tự Nhiên"}
              onCalloutPress = {()=>{Alert.alert("Đây là School")}}
            >
            	<Image source={require("./../../assets/images/Location.png")} style={{ height: 50, width: 50 }} />
            </Marker>
            <Marker coordinate={{  
              latitude: 10.763780,
              longitude: 106.680818,}}
              title={"NOWZONE Fashion Mall"}
              description={"NOWZONE Fashion Mall"}
              onCalloutPress = {()=>{Alert.alert("Đây là Entertainment")}}
            >
              <Image source={require("./../../assets/images/Entertainment.png")} style={{ height: 50, width: 50 }} />
            </Marker>
            <Marker coordinate={{ 
              latitude: 10.764283,
              longitude: 106.683003,}}
              title={"Hotel Nikko Saigon"}
              description={"Hotel Nikko Saigon"}
              onCalloutPress = {()=>{Alert.alert("Đây là Hotel")}}
            >
              <Image source={require("./../../assets/images/Hotel.png")} style={{ height: 50, width: 50 }} />
            </Marker>
            <Marker coordinate={{
              latitude: 10.764708,
              longitude: 106.678909,}}
              title={"Fuji Restaurant"}
              description={"Fuji Restaurant"}
              onCalloutPress = {()=>{Alert.alert("Đây là Restaurant")}}
            >
              <Image source={require("./../../assets/images/Restaurant.png")} style={{ height: 50, width: 50 }} />
            </Marker>
            <Marker coordinate={{
              latitude: 10.760281,
              longitude: 106.680647,}}
              title={"Hotel Equatorial"}
              description={"Hotel Equatorial Ho Chi Minh City"}
              onCalloutPress = {()=>{Alert.alert("Đây là Hotel")}}
            >
              <Image source={require("./../../assets/images/Hotel.png")} style={{ height: 50, width: 50 }} />
            </Marker>
            <Marker coordinate={{
              latitude: 10.763310,
              longitude: 106.684609,}}
              title={"Toi Caffe"}
              description={"Coffe Toi Ho Chi Minh City"}
              onCalloutPress = {()=>{Alert.alert("Đây là Caffe")}}
            >
              <Image source={require("./../../assets/images/Coffe.png")} style={{ height: 50, width: 50 }} />
            </Marker>
            <Marker coordinate={{
              latitude: 10.762445,
              longitude: 106.683061,}}
              title={"Hotel Equatorial"}
              description={"Hotel Equatorial Ho Chi Minh City"}
              onCalloutPress = {()=>{Alert.alert("Đây là Hotel")}}
            >
              <Image source={require("./../../assets/images/Sport.png")} style={{ height: 50, width: 50 }} />
            </Marker>
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
