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

  constructor(props){
    super(props);
    this.state = {
      booking: null,
      rating: null,
      view: null,
    }
  }
  async callGetAllTourTurnAPI(data){
    return getAllTourTurn(data)
            .then((response) => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => console.error(error))
  }

  getTopTourBooking(){
    let data = {
      isUniqueTour: false,
      page: 1,
      per_page: 8,
      sortBy: 'booking',
      sortType: 'desc',
    }
    this.callGetAllTourTurnAPI(data)
        .then((res)=>{
          this.setState({booking: res.data})
        })
  }
  getTopTourRating(){
    let data = {
      isUniqueTour: false,
      page: 1,
      per_page: 8,
      sortBy: 'rating',
      sortType: 'desc',
    }
    this.callGetAllTourTurnAPI(data)
        .then((res)=>{
          this.setState({rating: res.data})
        })
  }
  getTopTourView(){
    let data = {
      isUniqueTour: false,
      page: 1,
      per_page: 8,
      sortBy: 'view',
      sortType: 'desc',
    }
    this.callGetAllTourTurnAPI(data)
        .then((res)=>{
          this.setState({view: res.data})
        })
  }

  componentDidMount(){
    this.getTopTourBooking();
    this.getTopTourView();
  }

  render() {
    const { booking, rating, view } = this.state;

    return (
      <ScrollView>
          <InfoText text="Top tours"/>
          <FlatList
            data={booking}
            renderItem={(item) => <SmallTourCard data={item.item}/>}
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
            data={view}
            renderItem={(item) => <SmallTourCard data={item.item}/>}
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
