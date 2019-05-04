import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Image, FlatList} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { COLOR_GRAY_BACKGROUND, COLOR_MAIN } from '../constants/index';
import { getAllTourTurn, getRecommendation } from '../services/api';
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
      hasLoadTour: false,
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
            this.setState({
              tours: [...this.state.tours, ...responseJson.data],
              nextPage: responseJson.next_page,
              isLoading: false,
            })
          })
          .catch((error) => console.error(error))
  }

  callGetRecommendation(){
    let data = {
      locations: this.props.recommendTour.locations,
    };
    return getRecommendation(false,data)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            this.setState({
              tours: responseJson.data,
              nextPage: responseJson.next_page,
              isLoading: false,
            })
          })
          .catch((error) => console.error(error))
  }

  onLoadMore(){
    this.setState({isLoading: true});
    // this.callGetAllTourTurn();
    this.callGetRecommendation();
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
    // this.callGetAllTourTurn();

    this.callGetRecommendation()
        .then(()=>{
          this.setState({hasLoadTour: true});
        })
  }

  render(){
    const {isLoading, tours, nextPage, hasLoadTour } = this.state;

    if (tours.length <= 0 && hasLoadTour == true){
      return(
        <View>
            <Text style={{padding: 16, color: 'red'}}>
              {localized.noTourFound}
            </Text>
        </View>
      )
    }

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

              {/* tours.length > 0 && nextPage != -1 &&
                <Button
                  title={localized.showMore.toUpperCase()}
                  type="solid"
                  buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
                  containerStyle={{padding: 16, borderRadius: 0}}
                  titleStyle={{fontSize: 16}}
                  onPress={()=>{this.onLoadMore()}}
                />
              */}
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

function mapStateToProps(state){
  return{
    recommendTour: state.recommendTour,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedTour);
