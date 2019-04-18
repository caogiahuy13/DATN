import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Image, FlatList} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { COLOR_GRAY_BACKGROUND, COLOR_MAIN } from '../constants/index';
import { getAllTourTurn } from '../services/api';
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
      isLoading: false,
      nextPage: 1,
      tours: [],
      isFirstLoad: false,
    }
  }

  callGetAllTourTurn(){
    let data = {
      page: this.state.nextPage,
      per_page: 4,
    };
    return getAllTourTurn(data)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            this.setState({
              tours: [...this.state.tours, ...responseJson.data],
              nextPage: responseJson.next_page,
              isLoading: false,
            })
          })
          .catch((error) => console.error(error))
  }

  onLoadMore(){
    this.setState({isLoading: true});
    this.callGetAllTourTurn();
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
    this.setState({isFirstLoad: true});
    this.callGetAllTourTurn();
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
})

export default RecommendedTour;
