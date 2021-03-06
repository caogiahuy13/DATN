import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating, Avatar, ButtonGroup } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import Slideshow from 'react-native-image-slider-show';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { bookingChangeTourTurn, searchNameChange, tourDetailChangeId } from '../actions/index.js';
import { getImageByTourId, getTourTurnById, getNearMe, getRouteByTour, getRouteByTour_v2, getReviewByTour, increaseView } from '../services/api';
import { getDaysDiff, getDaysLeft, priceFormat, getDiscountPrice, getAgeShow } from '../services/function';
import { COLOR_HARD_RED, COLOR_MAIN } from '../constants/index';
import localized from '../localization/index';

import TourDetailMap from '../components/TourDetailMap';
import TourDetailReview from '../components/TourDetailReview';
import TourCardTitle from '../components/TourCardTitle';
import CollapsibleCardTitle from '../components/CollapsibleCardTitle';
import TourDetailCardInfo from '../components/TourDetailCardInfo';
import ScheduleCard from '../components/ScheduleCard';
import InfoText from '../components/InfoText';

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
      reviews: [],
      route: [],
      provinces: [],

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
  async callGetReviewByTour(id){
    return getReviewByTour(id)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({reviews: responseJson.data});
            })
            .catch((error) => console.error(error));
  }
  async callIncreaseView(id){
    return increaseView(id)
            .then((response) => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => console.error(error));
  }
  async callGetRouteByTour(id){
    return getRouteByTour(id)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({route: responseJson.data})
            })
            .catch((error) => console.error(error));
  }
  async callGetRouteByTour_v2(id){
    return getRouteByTour_v2(id)
            .then((response) => response.json())
            .then((responseJson) => {
              let provinces = responseJson.data.map((val)=>{
                return val.list_province;
              })
              this.setState({provinces: provinces});
            })
            .catch((error) => console.error(error));
  }

  getReviews(){
    let reviews = this.state.reviews.map((val,key)=>{
      return (<TourDetailReview key={key} review={val}/>)
    });
    return reviews;
  }

  getDetailPrice(){
    const {currentTurn} = this.state;
    let detailPrice = null;
    if (currentTurn.price_passengers != undefined){
      detailPrice = currentTurn.price_passengers.map((val,key)=>{
        return(<DetailPrice key={key} data={val}/>)
      })
    }
    return detailPrice;
  }

  onOtherDayPress = async (value) => {
    await this.props.searchNameChange(value)
    this.props.navigation.navigate("Tours");
  }

  onTagPress = (type, id, name) => {
    this.props.navigation.navigate({
      routeName: 'ListTours',
      params: {
        type: type,
        id: id,
        name: name,
      },
      key: Math.random () * 10000,
    });
  }

  onBookNowPress(){
    this.props.bookingChangeTourTurn(this.state.currentTurn);
    this.props.navigation.navigate("BookingInfo");
  }

  getProvinceString(array){
    let ret = '';
    for (let i=0; i<array.length; i++){
      ret += array[i];
      if (i != array.length - 1){
        ret += ", ";
      }
    }
    return ret;
  }

  getScheduleCard(){
    const {route, provinces} = this.state;

    for (let i=0; i<provinces.length; i++){
      this.getProvinceString(provinces[i]);
    }


    let curDay = 0;
    let scheduleCards = route.map((val,key)=>{
      if (val.day > curDay){
        curDay += 1;
        let dayProvince = ' : ';
        if (provinces.length > 0){
          dayProvince += this.getProvinceString(provinces[curDay - 1]);
        }
        return(
          <View key={key}>
              <InfoText text={localized.day + " " + val.day + dayProvince}/>
              <ScheduleCard data={val} active={false}/>
          </View>
        )
      } else {
        return(<ScheduleCard key={key} data={val} active={false}/>)
      }
    })
    return scheduleCards;
  }

  componentWillMount(){
    const id = this.props.navigation.getParam("id");
    this.callIncreaseView(id);
    this.callGetTourTurnById(id)
        .then(()=>{
          this.callGetImageByTourId(this.state.tour.id);
          this.callGetReviewByTour(this.state.tour.id);
          this.props.tourDetailChangeId(this.state.tour.id);
          this.callGetRouteByTour(this.state.tour.id);
          this.callGetRouteByTour_v2(this.state.tour.id);
        });
  }

  componentWillUnmount() {
    this.state = false;
  }

  render(){
    const {
      tour, currentTurn,
      isDescriptionCollapsed, isDetailCollapsed, isReviewCollapsed, isAdditionCollapsed,
    } = this.state;

    return(
      <View style={{flex: 1, backgroundColor: '#F4F5F4'}}>
        <ScrollView>
          <Card
            containerStyle = {{margin: 0, padding: 0}}
            title=<TourCardTitle title={tour.name} isSale={currentTurn.discount > 0} rating={tour.average_rating} view={currentTurn.view}/>
            titleStyle={styles.cardTitle}
          >
            <Slideshow dataSource={this.state.images} containerStyle={{marginBottom: 8}}/>
            <TourDetailCardInfo currentTourTurn={currentTurn} tour={tour} onOtherDayPress={this.onOtherDayPress} onTagPress={this.onTagPress}/>
          </Card>

          <TourDetailDivider/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CollapsibleCardTitle title={localized.description} status={isDescriptionCollapsed} onPress={()=>this.toggleDescription()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={isDescriptionCollapsed}>
                <Text>{tour.description}</Text>
              </Collapsible>
          </Card>

          <TourDetailDivider/>



          <Card
            containerStyle = {styles.cardContainer}
            title=<CollapsibleCardTitle title={localized.detail} status={isDetailCollapsed} onPress={()=>this.toggleDetail()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={isDetailCollapsed}>
                { !isDetailCollapsed &&
                  <View style={{height: 400, marginBottom: 10}}>
                      <TourDetailMap/>
                  </View>
                }
                {this.getScheduleCard()}
              </Collapsible>

          </Card>

          <TourDetailDivider/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CollapsibleCardTitle title={localized.review + " (" + this.state.reviews.length + ")"} status={isReviewCollapsed} onPress={()=>this.toggleReview()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={isReviewCollapsed}>
                  { !isReviewCollapsed &&
                    <View>
                      {this.getReviews()}
                      <Button
                        title={localized.review.toUpperCase()}
                        type="solid"
                        buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
                        containerStyle={{padding: 16, borderRadius: 0}}
                        titleStyle={{fontSize: 16}}
                        onPress={()=>{this.props.navigation.navigate("Review", {id: tour.id})}}
                      />
                    </View>
                  }
              </Collapsible>
          </Card>

          <TourDetailDivider/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CollapsibleCardTitle title={localized.additionalInfo} status={isAdditionCollapsed} onPress={()=>this.toggleAddition()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={isAdditionCollapsed}>
                  { !isAdditionCollapsed &&
                    <View>
                        <Text style={{fontWeight: 'bold', paddingVertical: 4}}>{localized.detailPrice}</Text>
                        {this.getDetailPrice()}
                        <Button
                          title={localized.policy.toUpperCase()}
                          type="solid"
                          buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
                          containerStyle={{padding: 16, borderRadius: 0}}
                          titleStyle={{fontSize: 16}}
                          onPress={()=>{this.props.navigation.navigate("Policy")}}
                        />
                    </View>
                  }
              </Collapsible>
          </Card>

          <TourDetailDivider/>


        </ScrollView>

        <Button
          buttonStyle={{backgroundColor: COLOR_HARD_RED, borderRadius: 0}}
          title={localized.bookTour.toUpperCase()}
          onPress={()=>{this.onBookNowPress()}}
          disabled={currentTurn.isAllowBooking == false ? true : false}
          titleStyle={{fontSize: 18, fontWeight: 'bold'}}
        />

      </View>
    );
  }
}

const TourDetailDivider = () => {
  return(
    <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>
  )
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
})

function mapStateToProps(state){
  return{
    booking: state.booking,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    bookingChangeTourTurn: bookingChangeTourTurn,
    searchNameChange: searchNameChange,
    tourDetailChangeId: tourDetailChangeId,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TourDetail);
