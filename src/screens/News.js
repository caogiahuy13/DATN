import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { COLOR_GRAY_BACKGROUND } from '../constants/index';

import NewsCard from '../components/NewsCard';

class News extends Component {
  static navigationOptions = {
    header: null,
  };

  render(){
    return(
      <ScrollView style={styles.container}>
          <NewsCard/>
          <View style={{height: 16}}></View>
          <NewsCard/>
          <View style={{height: 16}}></View>
          <NewsCard/>
          <View style={{height: 16}}></View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_GRAY_BACKGROUND,
    padding: 12,
  },
})

export default News;
