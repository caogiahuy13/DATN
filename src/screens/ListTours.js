import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Image, FlatList} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { COLOR_GRAY_BACKGROUND, COLOR_MAIN } from '../constants/index';
import { getTourTurnByType } from '../services/api';
import localized from '../localization/index';

import TourCard from '../components/TourCard';

class ListTours extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "LIST TOURS",
  });

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      nextPage: 1,
      tours: [],
      isFirstLoad: false,

      type: null,
    }
  }

  callGetTourTurnByType(type){
    return getTourTurnByType(type, this.state.nextPage, 4)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              tours: [...this.state.tours, ...responseJson.data],
              nextPage: responseJson.next_page,
              isLoading: false,
            })
            return responseJson;
          })
          .catch((error) => console.error(error))
  }

  onLoadMore(){
    this.setState({isLoading: true});
    this.callGetTourTurnByType(this.state.type);
  }

  tourDetailPress = (id) => {
    this.props.navigation.navigate("TourDetail",{id: id});
  }

  componentDidMount() {
    const type = this.props.navigation.getParam("type");
    this.setState({type: type});
    this.setState({isFirstLoad: true});
    this.callGetTourTurnByType(type);
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
