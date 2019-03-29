import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, Animated} from 'react-native';
import { Button, SearchBar, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SvgUri from 'react-native-svg-uri';
import RNPickerSelect from 'react-native-picker-select';
import Moment from 'moment';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { getAllTourTurn, searchTourTurn } from '../services/api';
import { COLOR_MAIN, COLOR_GRAY_BACKGROUND } from '../constants/index';
import { sortBy, placeHolderSortBy, sortType, placeHolderSortType } from '../constants/search';
import localized from '../localization/index';

import TourCard from '../components/TourCard';

const headerHeight = 108;

class Tours extends Component {
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

      per_page: 4,

      search: '',

      sortBy: null,
      sortType: null,

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

  loadNewTours(data){
    const {per_page, count} = this.state;
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

  getData(){
    const {per_page, count, search, maxPrice, sortType, sortBy} = this.state;
    const {searchFilter} = this.props;

    let data = {
      page: 1,
      per_page: count + per_page,
      isUnique: false,
      name: search,
    }

    if(typeof(searchFilter.maxPrice) != 'undefined'){
      data['price'] = searchFilter.maxPrice;
    }
    if(typeof(searchFilter.date) != 'undefined'){
      data['date'] = Moment(searchFilter.date).format('YYYY-MM-DD');
    }
    if(searchFilter.lasting > 0){
      data['lasting'] = searchFilter.lasting;
    }

    if(sortBy != null){
      data['sortBy'] = sortBy;
    }
    if(sortType != null){
      data['sortType'] = sortType;
    } else {
      data['sortType'] = 'asc';
    }

    return data;
  }

  onSubmitSearch(){
    this.setState({count: 0},()=>{
      let data = this.getData();
      this.loadNewTours(data);
    });
  }

  onLoadMorePress(){
    let data = this.getData();
    this.loadNewTours(data);
  }

  onSearchFilterPress(){
    this.props.navigation.navigate("SearchFilter", {
      onGoBack: () => {
        console.log(this.props.searchFilter);
        this.setState({sortBy: null});
        this.setState({sortType: null});
        this.setState({count: 0},()=>{
          let data = this.getData();
          this.loadNewTours(data);
        })
      }
    });
  }

  onSortByChange(value){
    if (value == null){
      this.setState({sortType: null});
    }
    this.setState({sortBy: value},()=>{
      this.setState({count: 0},()=>{
        let data = this.getData();
        this.loadNewTours(data);
      })
    });
  }

  onSortTypeChange(value){
    this.setState({sortType: value},()=>{
      this.setState({count: 0},()=>{
        let data = this.getData();
        this.loadNewTours(data);
      })
    });
  }

  componentWillMount(){
    let data = this.getData();
    this.loadNewTours(data);
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
                    onChangeText={(value)=>{this.setState({search: value});this.onSubmitSearch();}}
                    // onSubmitEditing={()=>{this.onSubmitSearch()}}
                    // onCancel={()=>{this.onSubmitSearch()}}
                    value={search}
                    containerStyle={{backgroundColor: COLOR_MAIN, flex: 1, borderWidth: 0,padding: 14}}
                    inputContainerStyle={{backgroundColor: 'white', borderRadius: 40, height: 40}}
                    inputStyle={{fontSize: 16}}
                  />
                  <TouchableOpacity style={{backgroundColor: COLOR_MAIN}} onPress={()=>{this.onSearchFilterPress()}} activeOpacity={1}>
                      <Icon name='sliders' type='font-awesome' color='white' size={30} containerStyle={styles.filter}/>
                  </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', paddingHorizontal: 6}}>
                  <View style={{flex: 0.5}}>
                    <RNPickerSelect
                      placeholder={placeHolderSortBy}
                      items={sortBy}
                      onValueChange={value => this.onSortByChange(value)}
                      value={this.state.sortBy}
                    />
                  </View>
                  <View style={{flex: 0.5}}>
                    <RNPickerSelect
                      placeholder={placeHolderSortType}
                      items={sortType}
                      onValueChange={value => this.onSortTypeChange(value)}
                      value={this.state.sortType}
                      disabled={this.state.sortBy == null ? true : false}
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

function mapStateToProps(state){
  return{
    searchFilter: state.searchFilter,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tours);
