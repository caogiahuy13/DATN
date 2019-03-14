import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, FlatList} from 'react-native';
import TourCard from '../components/TourCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { getAllTour, getAllTourTurn } from '../services/api';

var { width } = Dimensions.get('window');
var inputSearch_Width = width - 80;

export default class Tours extends Component {
  constructor(props){
    super(props);
    this.state = {
      tours: {},
    }
  }

  async callGetAllTourAPI(){
    return getAllTour()
          .then((response) => {
            return response.json();
           })
           .then((responseJson) => {
             return responseJson.data;
           })
          .catch((error) => {
            console.error(error);
          });
  }

  async callGetAllTourTurnAPI(){
    return getAllTourTurn()
            .then((response) => response.json())
            .then((responseJson) => responseJson.data)
            .catch((error) => console.error(error));
  }

  componentDidMount(){
    this.callGetAllTourTurnAPI()
        .then((data)=>{
          this.setState({tours: data});
        })
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<View style={styles.searchBar}>
          <TextInput style={styles.inputSearch}
            placeholder = "Find Your Tour ..."
            placeholderTextColor = 'rgba(50,74,94,0.4)'
            keyboardType = 'email-address'
            returnKeyType = 'next'
            autoCorrect = {false}
            ref={"txtSearch"}
          />
          <TouchableOpacity style={styles.buttonSearch}>
            <FontAwesome name="search" size={30} color="#324A5E"/>
          </TouchableOpacity>
        </View>*/}

        <FlatList
          data={this.state.tours}
          renderItem={(item) => <TourCard data={item.item}/>}
          keyExtractor={(item, index) => index.toString()}
        />
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
    searchBar: {
      backgroundColor: '#fff',
      width: '100%',
      height: 60,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputSearch: {
      fontSize: 20,
      height: 44,
      width: inputSearch_Width,
      backgroundColor: 'rgba(0,0,0,0.02)',
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.05)',
      borderRadius: 5,
      color: '#324A5E',
      marginRight: 5,
      paddingHorizontal: 15,
    },
    buttonSearch: {
      height: 44,
      width: 44,
      padding: 5,
      marginLeft: 5,
    },
})
