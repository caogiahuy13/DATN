import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

import { getTourTurnByType } from '../services/api';
import { COLOR_MAIN, COLOR_GRAY_BACKGROUND } from '../constants/index';
import localized from '../localization/index';

import SmallTourCard from '../components/SmallTourCard';
import InfoText from '../components/InfoText';

class TopTours extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      domestic: null,
      international: null,
    }
  }

  async callGetTourTurnByType(type){
    return getTourTurnByType(type, 1, 8)
          .then((response) => response.json())
          .then((responseJson) => responseJson)
          .catch((error) => console.error(error))
  }

  tourDetailPress = (id) => {
    this.props.navigation.navigate("TourDetail",{id: id});
  }

  getDomesticTours(){
    this.callGetTourTurnByType(1)
        .then((res)=>{
          this.setState({domestic: res.data});
        })
  }
  getInternationalTours(){
    this.callGetTourTurnByType(2)
        .then((res)=>{
          this.setState({international: res.data});
        })
  }

  componentWillMount(){
    this.getDomesticTours();
    this.getInternationalTours();
  }

  render() {
    const { domestic, international } = this.state;

    return (
      <ScrollView style={{backgroundColor: COLOR_GRAY_BACKGROUND}}>
          <InfoText text={localized.domesticTours.toUpperCase()}/>
          <FlatList
            data={domestic}
            renderItem={(item) => <SmallTourCard data={item.item} onPress={this.tourDetailPress}/>}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            style={styles.list}
          />

          <InfoText text={localized.internationalTours.toUpperCase()}/>
          <FlatList
            data={international}
            renderItem={(item) => <SmallTourCard data={item.item} onPress={this.tourDetailPress}/>}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            style={styles.list}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
  }
})

export default TopTours;
