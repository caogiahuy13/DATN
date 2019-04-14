import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import { Button } from 'react-native-elements';

import { getTourTurnByType } from '../services/api';
import { COLOR_MAIN, COLOR_GRAY_BACKGROUND } from '../constants/index';
import localized from '../localization/index';

import SmallTourCard from '../components/SmallTourCard';

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

  morePress(type){
    this.props.navigation.navigate({
      routeName: 'ListTours',
      params: {
        type: type,
      },
      key: Math.random () * 10000,
    });
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
          <InfoText text={localized.domesticTours.toUpperCase()} onPress={()=>this.morePress(1)}/>
          <FlatList
            data={domestic}
            renderItem={(item) => <SmallTourCard data={item.item} onPress={this.tourDetailPress}/>}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            style={styles.list}
          />

          <InfoText text={localized.internationalTours.toUpperCase()} onPress={()=>this.morePress(1)}/>
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

class InfoText extends Component {
  render(){
    return(
      <View style={styles.containerInfoText}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.infoText}>{this.props.text}</Text>
          <Button
            title={localized.more}
            type="clear"
            buttonStyle={{padding: 0, margin: 0, borderRadius: 0}}
            containerStyle={{padding: 0, margin: 0, borderRadius: 0}}
            titleStyle={{fontSize: 12}}
            onPress={()=>this.props.onPress()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
  },
  containerInfoText: {
    paddingTop: 20,
    paddingBottom: 12,
    marginLeft: 20,
    marginRight: 10,
    backgroundColor: COLOR_GRAY_BACKGROUND,
  },
  infoText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '500',
    flex: 1,
  },
  more: {
    fontSize: 12,
    color: 'blue',
    alignSelf: 'center',
  }
})

export default TopTours;
