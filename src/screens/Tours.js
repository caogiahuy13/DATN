import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image} from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SvgUri from 'react-native-svg-uri';

import { getAllTourTurn } from '../services/api';
import { COLOR_MAIN } from '../constants/index';

import TourCard from '../components/TourCard';

export default class Tours extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      tours: null,
      count: 0,
      maxCount: 0,
      isLoading: false,

      per_page: 6,
    }
  }

  async callGetAllTourTurnAPI(page, per_page, isUnique){
    return getAllTourTurn(page, per_page, isUnique)
            .then((response) => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => console.error(error));
  }

  tourDetailPress = (id) => {
    this.props.navigation.navigate("TourDetail",{id: id});
  }
  tourBookNowPress = () => {
    this.props.navigation.navigate("BookingInfo");
  }

  onLoadMorePress(){
    this.setState({isLoading: true});
    this.callGetAllTourTurnAPI(1,this.state.count + this.state.per_page,false)
        .then((ret)=>{
          this.setState({tours: ret.data}, ()=>{
            this.setState({isLoading: false});
          });
          this.setState({maxCount: ret.itemCount});
          this.setState({count: this.state.count + this.state.per_page})
        })
  }

  componentWillMount(){
    this.callGetAllTourTurnAPI(1,this.state.per_page,false)
        .then((ret)=>{
          this.setState({tours: ret.data});
          this.setState({maxCount: ret.itemCount});
          this.setState({count: this.state.count + this.state.per_page});
        })
  }

  render() {
    const { tours, maxCount, count, isLoading } = this.state;
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={tours}
          renderItem={(item) => <TourCard data={item.item} onPress={this.tourDetailPress} onBookNowPress={this.tourBookNowPress}/>}
          keyExtractor={(item, index) => index.toString()}
        />

        { isLoading && maxCount >= count &&
          <View style={{alignItems: 'center', padding: 16}}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../assets/images/svg/Rolling-1.9s-106px.gif')} />
          </View>
        }

        {
          maxCount < count &&
          <View style={{alignItems: 'center', paddingTop: 16}}>
              <Text style={{color: 'red'}}>All tours have been loaded</Text>
          </View>
        }

        { tours != null &&
          <Button
            title="SHOW MORE"
            type="solid"
            buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
            containerStyle={{padding: 16, borderRadius: 0}}
            titleStyle={{fontSize: 16}}
            onPress={()=>{this.onLoadMorePress()}}
          />
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F5F4',
    },
})
