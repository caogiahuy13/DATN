import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, FlatList} from 'react-native';
import { Divider } from 'react-native-elements';

import { getHistoryByUser } from '../services/api';
import { COLOR_MAIN } from '../constants/index';

import HistoryCard from '../components/HistoryCard';

class History2 extends Component {
  static navigationOptions = {
    title: 'History',
  };

  onPress = () => {
    this.props.navigation.navigate("HistoryDetail");
  }

  callGetHistoryByUser(){
    return getHistoryByUser()
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
          })
          .catch((error) => console.error(error));
  }

  componentWillMount(){
    this.callGetHistoryByUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <HistoryCard onPress={()=>this.onPress()}/>
        <Divider style={{height: 0.5, marginHorizontal: 14}}/>
        <HistoryCard/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F5F4',
    },
    text: {
      fontSize: 20,
    },
})

export default History2;
