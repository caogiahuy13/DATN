import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating, Avatar } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import Moment from 'moment';
import Collapsible from 'react-native-collapsible';
import Slideshow from 'react-native-image-slider-show';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { bookingChangeTourTurn } from '../actions/index.js';
import { getImageByTourId, getTourTurnById, getNearMe, getRouteByTour, getCommentByTour, increaseView } from '../services/api';
import { getDaysDiff, getDaysLeft, priceFormat, getDiscountPrice, getAgeShow } from '../services/function';
import { GOOGLE_MAPS_APIKEY,
         COLOR_MAIN, COLOR_LIGHT_BLACK, COLOR_HARD_RED, COLOR_GREEN } from '../constants/index';
import localized from '../localization/index';

import TourDetailMap from '../components/TourDetailMap';
import TourDetailReview from '../components/TourDetailReview';
import TourCardTitle from '../components/TourCardTitle';
import CollapsibleCardTitle from '../components/CollapsibleCardTitle';

class TourDetail extends Component{
  static navigationOptions = ({navigation}) => ({
    title: localized.tourDetail,
  });

  constructor(props){
    super(props);
    this.state = {
      tour: {},
      currentTurn: {},
      images: [],
      dayDiff: 0,
      slotLeft: 0,
      daysLeft: 0,
      comments: [],

      isDescriptionCollapsed: true,
      isDetailCollapsed: true,
      isReviewCollapsed: true,
      isAdditionCollapsed: true,
    }
  }

  toggleDescription(){
    this.setState({isDescriptionCollapsed: !this.state.isDescriptionCollapsed});
  }
  toggleDetail(){
    this.setState({isDetailCollapsed: !this.state.isDetailCollapsed});
  }
  toggleReview(){
    this.setState({isReviewCollapsed: !this.state.isReviewCollapsed});
  }
  toggleAddition(){
    this.setState({isAdditionCollapsed: !this.state.isAdditionCollapsed});
  }

  async callGetTourTurnById(id){
    return getTourTurnById(id)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({tour: responseJson.data.tour});
              this.setState({currentTurn: responseJson.data});
            })
            .catch((error) => console.error(error));
  }
  async callGetImageByTourId(id){
    return getImageByTourId(id)
            .then((response) => response.json())
            .then((responseJson) => {
              let source = responseJson.data.map((val,key)=>{
                return {url: val.name}
              });
              this.setState({images: source});
            })
            .catch((error) => console.error(error));
  }
  async callGetCommentByTour(id){
    return getCommentByTour(id)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({comments: responseJson.data});
            })
            .catch((error) => console.error(error));
  }
  async callIncreaseView(id){
    return increaseView(id)
            .then((response) => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => console.error(error));
  }

  setMultipleState(){
    const {tour, currentTurn} = this.state;
    this.setState({dayDiff: getDaysDiff(currentTurn.start_date, currentTurn.end_date)});
    this.setState({slotLeft: currentTurn.num_max_people - currentTurn.num_current_people});
    this.setState({daysLeft: getDaysLeft(currentTurn.start_date)});
  }

  onBookNowPress(){
    this.props.bookingChangeTourTurn(this.state.currentTurn);
    this.props.navigation.navigate("BookingInfo");
  }

  componentWillMount(){
    const id = this.props.navigation.getParam("id");
    this.callIncreaseView(id);
    this.callGetTourTurnById(id)
        .then(()=>{
          this.callGetImageByTourId(this.state.tour.id);
          this.callGetCommentByTour(this.state.tour.id);
          this.setMultipleState();
        });
  }

  componentWillUnmount() {
    this.state = false;
  }

  render(){
    Moment.locale('en');
    const {
      tour, currentTurn,
      dayDiff, slotLeft, daysLeft,
      comments,
      isDescriptionCollapsed, isDetailCollapsed, isReviewCollapsed, isAdditionCollapsed
    } = this.state;

    let reviews = comments.map((val,key)=>{
      return (<TourDetailReview key={key} comment={val}/>)
    });

    let detailPrice = null;
    if (currentTurn.price_passengers != undefined){
      detailPrice = currentTurn.price_passengers.map((val,key)=>{
        return(<DetailPrice key={key} data={val}/>)
      })
    }


    return(
      <View style={{flex: 1, backgroundColor: '#F4F5F4'}}>
        <ScrollView>
          <Card
            containerStyle = {{margin: 0, padding: 0}}
            title=<TourCardTitle title={tour.name} isSale={currentTurn.discount > 0} view={currentTurn.view}/>
            titleStyle={styles.cardTitle}
          >
            <Slideshow dataSource={this.state.images} containerStyle={{marginBottom: 8}}/>
            <View style={{paddingHorizontal: 12}}>
                <View style={{marginBottom: 8}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{flex: 0.36}}>Tour code:</Text>
                    <Text style={{flex: 0.64}}>000{currentTurn.id}</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={{flex: 0.36}}>Start date:</Text>
                    <Text style={{flex: 0.32}}>{Moment(currentTurn.start_date).format('DD/MM/YYYY')}</Text>
                    <View style={{flexDirection: 'row', flex: 0.32}}>
                        <Icon name='calendar' type='antdesign' color={COLOR_MAIN} size={18}/>
                        <Text style={{color: 'orange'}}> Other day</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={{flex: 0.36}}>Last in {dayDiff} days</Text>
                    <Text style={{flex: 0.32}}>{daysLeft} days left</Text>
                    <Text style={{flex: 0.32}}>{slotLeft} slot left</Text>
                  </View>
                </View>

                <Divider style={{height: 1}}/>

                <TourPrice price={currentTurn.price} discount={currentTurn.discount}/>
            </View>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CollapsibleCardTitle title={localized.description} status={isDescriptionCollapsed} onPress={()=>this.toggleDescription()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={isDescriptionCollapsed}>
                <Text>{tour.description}</Text>
              </Collapsible>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CollapsibleCardTitle title={localized.detail} status={isDetailCollapsed} onPress={()=>this.toggleDetail()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={isDetailCollapsed}>
                <View style={{height: 400, marginBottom: 10}}>
                    <TourDetailMap/>
                </View>
                <Text>{tour.detail}</Text>
              </Collapsible>

          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CollapsibleCardTitle title={localized.review} status={isReviewCollapsed} onPress={()=>this.toggleReview()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={isReviewCollapsed}>
                  {reviews}
              </Collapsible>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CollapsibleCardTitle title={localized.additionalInfo} status={isAdditionCollapsed} onPress={()=>this.toggleAddition()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={isAdditionCollapsed}>
                  <Text style={{fontWeight: 'bold', paddingVertical: 4}}>Price of Tour</Text>
                  {detailPrice}
              </Collapsible>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

        </ScrollView>

        <Button
          buttonStyle={{backgroundColor: COLOR_HARD_RED, borderRadius: 0}}
          title={localized.bookTour.toUpperCase()}
          onPress={()=>{this.onBookNowPress()}}
          titleStyle={{fontSize: 18, fontWeight: 'bold'}}
        />
      </View>
    );
  }
}

class TourPrice extends Component {
  render(){
    const {price, discount} = this.props;

    let newPrice = getDiscountPrice(price, discount);
    return(
      <View style={{marginVertical: 8, alignItems: 'center'}}>
        { discount > 0 &&
          <Text style={{color:'gray', fontWeight: 'bold', fontSize: 14, textDecorationLine: 'line-through'}}>
            {priceFormat(this.props.price)}
          </Text>
        }
        <Text style={{color:'#C50000', fontWeight: 'bold', fontSize: 24}}>
            {priceFormat(newPrice)}
        </Text>
      </View>
    )
  }
}

class DetailPrice extends Component {
  render(){
    const {data} = this.props;
    return(
      <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 0.4}}>{getAgeShow(data.type)}</Text>
          <Text style={{flex: 0.6}}>{priceFormat(data.price)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 0,
    flex: 1,
    paddingVertical: 0,
  },
  cardTitle: {
    alignSelf: 'flex-start',
    marginHorizontal: 8,
  },
  map: {
      ...StyleSheet.absoluteFillObject,
  },
  sale: {
    backgroundColor: COLOR_GREEN,
    borderRadius: 0,
    padding: 0,
  },
})

function mapStateToProps(state){
  return{
    booking: state.booking,
    currentTourTurn: state.currentTourTurn,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    bookingChangeTourTurn: bookingChangeTourTurn,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TourDetail);
