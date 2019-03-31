import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import { } from 'react-native-elements';


import { getAllTourTurn } from '../services/api';
import { COLOR_MAIN, COLOR_GRAY_BACKGROUND } from '../constants/index';
import localized from '../localization/index';

import SmallTourCard from '../components/SmallTourCard';
import InfoText from '../components/InfoText';

class TopTours extends Component {
  static navigationOptions = {
    header: null,
  };



  render() {
    return (
      <ScrollView>
          <InfoText text="Top tours"/>
          <FlatList
            data={[{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}]}
            renderItem={(item) => <SmallTourCard/>}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            style={styles.list}
          />
          <InfoText text="Top tours"/>
          <FlatList
            data={[{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}]}
            renderItem={(item) => <SmallTourCard/>}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            style={styles.list}
          />
          <InfoText text="Top tours"/>
          <FlatList
            data={[{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}]}
            renderItem={(item) => <SmallTourCard/>}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            style={styles.list}
          />
      </ScrollView>
    );
  }
}
class Card extends Component {
  render(){
    return(
      <View style={{backgroundColor: 'white', width: 100, height: 100, padding: 20}}>
          <Text>ABC</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
  }
})

export default TopTours;
