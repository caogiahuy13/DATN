import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import TourCard from '../components/TourCard';

export default class Tours extends Component {
  render() {
    return (
      <View style={styles.container}>
          <FlatList
            data={[
              {key: 'Devin'},
              {key: 'Jackson'},
              {key: 'James'},
            ]}
            renderItem={({item}) => <TourCard/>}
          />
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D3D3D3',
    },
    text: {
      fontSize: 20,
    }
})
