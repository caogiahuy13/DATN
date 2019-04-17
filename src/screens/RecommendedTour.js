import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Image, FlatList} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { COLOR_GRAY_BACKGROUND, COLOR_MAIN } from '../constants/index';
import { } from '../services/api';
import localized from '../localization/index';

import TourCard from '../components/TourCard';

class RecommendedTour extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: localized.recommendedTour,
    };
  };

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  onLoadMore(){

  }

  tourDetailPress = (id) => {
    this.props.navigation.navigate({
      routeName: 'TourDetail',
      params: {
        id: id,
      },
      key: Math.random () * 10000,
    });
  }

  componentDidMount() {
  }

  render(){
    return(
      <ScrollView style={styles.container}>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_GRAY_BACKGROUND,
  },
})

export default RecommendedTour;
