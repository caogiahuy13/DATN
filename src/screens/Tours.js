import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, Animated} from 'react-native';
import { Button, SearchBar, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SvgUri from 'react-native-svg-uri';
import RNPickerSelect from 'react-native-picker-select';

import { getAllTourTurn, searchTourTurn } from '../services/api';
import { COLOR_MAIN, COLOR_GRAY_BACKGROUND } from '../constants/index';
import { price, placeholderPrice } from '../constants/search';
import localized from '../localization/index';

import TourCard from '../components/TourCard';

const headerHeight = 108;

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

      search: null,
      price: undefined,

      isNavBarHidden: false,
      height: new Animated.Value(headerHeight),
    }
  }

  async callGetAllTourTurnAPI(page, per_page, isUnique){
    return getAllTourTurn(page, per_page, isUnique)
            .then((response) => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => console.error(error));
  }
  async callSearchTourTurn(data){
    return searchTourTurn(data)
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

  setAnimation(disable) {
    Animated.timing(this.state.height, {
      duration: 100,
      toValue: disable ? 0 : headerHeight
    }).start()
  };
  handleScroll(event) {
      this.setAnimation((event.nativeEvent.contentOffset.y > headerHeight));
      this.setState({ isNavBarHidden: !this.state.isNavBarHidden });
  }

  // onLoadMorePress(){
  //   this.setState({isLoading: true});
  //   this.callGetAllTourTurnAPI(1,this.state.count + this.state.per_page,false)
  //       .then((ret)=>{
  //         this.setState({tours: ret.data}, ()=>{
  //           this.setState({isLoading: false});
  //         });
  //         this.setState({maxCount: ret.itemCount});
  //         this.setState({count: this.state.count + this.state.per_page})
  //       })
  // }
  onLoadMorePress(){
    const {count, per_page} = this.state;
    let data = {
      page: 1,
      per_page: count + per_page,
      isUnique: false,
    }

    this.setState({isLoading: true});
    this.callSearchTourTurn(data)
        .then((ret)=>{
          this.setState({tours: ret.data}, ()=>{
            this.setState({isLoading: false});
          });
          this.setState({maxCount: ret.itemCount});
          this.setState({count: count + per_page})
        })
  }

  // componentWillMount(){
  //   this.callGetAllTourTurnAPI(1,this.state.per_page,false)
  //       .then((ret)=>{
  //         this.setState({tours: ret.data});
  //         this.setState({maxCount: ret.itemCount});
  //         this.setState({count: this.state.count + this.state.per_page});
  //       })
  // }
  componentWillMount(){
    const {count, per_page} = this.state;
    let data = {
      page: 1,
      per_page: per_page,
      isUnique: false,
    }

    this.callSearchTourTurn(1,this.state.per_page,false)
        .then((ret)=>{
          this.setState({tours: ret.data});
          this.setState({maxCount: ret.itemCount});
          this.setState({count: count + per_page});
        })
  }

  render() {
    const { tours, maxCount, count, isLoading } = this.state;
    const { search } = this.state;

    return (
      <View style={{flex: 1, backgroundColor: COLOR_GRAY_BACKGROUND}}>
          <Animated.View style={{height: this.state.height}}>
              <View style={{flexDirection: 'row'}}>
                  <SearchBar
                    platform="android"
                    placeholder="..."
                    onChangeText={()=>{}}
                    value={search}
                    containerStyle={{backgroundColor: COLOR_MAIN, flex: 1, borderWidth: 0,padding: 14}}
                    inputContainerStyle={{backgroundColor: 'white', borderRadius: 40, height: 40}}
                    inputStyle={{fontSize: 16}}
                  />
                  <TouchableOpacity style={{backgroundColor: COLOR_MAIN}} onPress={()=>{this.props.navigation.navigate("SearchFilter")}} activeOpacity={1}>
                      <Icon name='sliders' type='font-awesome' color='white' size={30} containerStyle={styles.filter}/>
                  </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <RNPickerSelect
                      placeholder={placeholderPrice}
                      items={price}
                      onValueChange={value => {
                        this.setState({
                          price: value,
                        });
                      }}
                      value={this.state.price}
                    />
                  </View>
              </View>
          </Animated.View>


          <ScrollView onScroll={this.handleScroll.bind(this)}>
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
                  <Text style={{color: 'red'}}>{localized.allTourLoaded}</Text>
              </View>
            }

            { tours != null &&
              <Button
                title={localized.showMore.toUpperCase()}
                type="solid"
                buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
                containerStyle={{padding: 16, borderRadius: 0}}
                titleStyle={{fontSize: 16}}
                onPress={()=>{this.onLoadMorePress()}}
              />
            }
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F5F4',
    },
    filter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 14,
      marginRight: 14,
    }
})
