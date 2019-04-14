import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Image, FlatList} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { COLOR_GRAY_BACKGROUND, COLOR_MAIN } from '../constants/index';
import { getTourTurnByType, getTourTurnByCountry, getTourTurnByProvince } from '../services/api';
import localized from '../localization/index';

import TourCard from '../components/TourCard';

class ListTours extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "Tours: " + navigation.getParam("name"),
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      nextPage: 1,
      tours: [],
      isFirstLoad: false,

      type: null,
      id: null,
    }
  }

  setTours(res){
    this.setState({
      tours: [...this.state.tours, ...res.data],
      nextPage: res.next_page,
      isLoading: false,
    })
  }

  callGetTourTurnByType(id){
    return getTourTurnByType(id, this.state.nextPage, 4)
          .then((response) => response.json())
          .then((responseJson) => responseJson)
          .catch((error) => console.error(error))
  }
  callGetTourTurnByCountry(id){
    return getTourTurnByCountry(id, this.state.nextPage, 4)
          .then((response) => response.json())
          .then((responseJson) => responseJson)
          .catch((error) => console.error(error))
  }
  callGetTourTurnByProvince(id){
    return getTourTurnByProvince(id, this.state.nextPage, 4)
          .then((response) => response.json())
          .then((responseJson) => responseJson)
          .catch((error) => console.error(error))
  }


  getTourTurn(type, id){
    if (type == "category"){
      this.callGetTourTurnByType(id)
          .then((res)=>this.setTours(res))
    } else if (type == "province"){
      this.callGetTourTurnByProvince(id)
          .then((res)=>this.setTours(res))
    } else if (type == "country"){
      this.callGetTourTurnByCountry(id)
          .then((res)=>this.setTours(res))
    }
  }

  onLoadMore(){
    this.setState({isLoading: true});
    this.getTourTurn(this.state.type, this.state.id);
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
    const type = this.props.navigation.getParam("type");
    const id = this.props.navigation.getParam("id");

    this.setState({type: type});
    this.setState({id: id});

    this.setState({isFirstLoad: true});
    this.getTourTurn(type,id);
  }

  render(){
    const {isLoading, tours, nextPage } = this.state;

    return(
      <ScrollView style={styles.container}>
          <View style={styles.content}>
              <FlatList
                data={tours}
                renderItem={(item) => <TourCard data={item.item} onPress={this.tourDetailPress}/>}
                keyExtractor={(item, index) => index.toString()}
              />

              { isLoading && nextPage != -1 &&
                <View style={{alignItems: 'center', padding: 16}}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../assets/images/svg/Rolling-1.9s-106px.gif')} />
                </View>
              }

              { tours.length > 0 && nextPage != -1 &&
                <Button
                  title={localized.showMore.toUpperCase()}
                  type="solid"
                  buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
                  containerStyle={{padding: 16, borderRadius: 0}}
                  titleStyle={{fontSize: 16}}
                  onPress={()=>{this.onLoadMore()}}
                />
              }
          </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_GRAY_BACKGROUND,
  },
  content: {

  }
})

export default ListTours;
