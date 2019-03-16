import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating, Avatar } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import Moment from 'moment';
import Collapsible from 'react-native-collapsible';
import Slideshow from 'react-native-image-slider-show';
import MapView, {Marker} from 'react-native-maps';

import { getImageByTourId, getTourTurnById, getNearMe } from '../services/api';
import { COLOR_MAIN, COLOR_LIGHT_BLACK, COLOR_HARD_RED } from '../constants/index';

class TourDetail extends Component{
  static navigationOptions = ({navigation}) => ({
    title: 'Tour information',
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

      isDescriptionCollapsed: true,
      isDetailCollapsed: true,
      isReviewCollapsed: true,
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

  getDaysLeft(startDate){
    let day1 = Moment(new Date());
    let day2 = Moment(startDate);
    let duration = Moment.duration(day2.diff(day1));
    let days = Math.floor(duration.asDays());
    return days;
  }

  getDaysDiff(startDate, endDate){
    let day1 = Moment(startDate);
    let day2 = Moment(endDate);
    let duration = Moment.duration(day2.diff(day1));
    let days = Math.ceil(duration.asDays());
    return days;
  }

  setMultipleState(){
    const {tour, currentTurn} = this.state;
    this.setState({dayDiff: this.getDaysDiff(currentTurn.start_date, currentTurn.end_date)});
    this.setState({slotLeft: currentTurn.num_max_people - currentTurn.num_current_people});
    this.setState({daysLeft: this.getDaysLeft(currentTurn.start_date)});
  }

  componentWillMount(){
    const id = this.props.navigation.getParam("id");
    this.callGetTourTurnById(id)
        .then(()=>{
          this.callGetImageByTourId(this.state.tour.id);
          this.setMultipleState();
        });
  }

  componentWillUnmount() {
    this.state = false;
  }

  render(){
    Moment.locale('en');
    const {tour, currentTurn, dayDiff, slotLeft, daysLeft} = this.state;

    return(
      <View style={{flex: 1, backgroundColor: '#F4F5F4'}}>
        <ScrollView>
          <Card
            containerStyle = {{margin: 0, padding: 0}}
            title=<TourTitle title={tour.name}/>
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

                <TourPrice price={currentTurn.price}/>
            </View>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CardTitle title="Description" status={this.state.isDescriptionCollapsed} onPress={()=>this.toggleDescription()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={this.state.isDescriptionCollapsed}>
                <Text>{tour.description}</Text>
              </Collapsible>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CardTitle title="Detail" status={this.state.isDetailCollapsed} onPress={()=>this.toggleDetail()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={this.state.isDetailCollapsed}>
                <View style={{height: 400}}>
                    <TourMap id={tour.id}/>
                </View>
                <Text>{tour.detail}</Text>
              </Collapsible>

          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {styles.cardContainer}
            title=<CardTitle title="Reviews" status={this.state.isReviewCollapsed} onPress={()=>this.toggleReview()}/>
            titleStyle={styles.cardTitle}
          >
              <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={this.state.isReviewCollapsed}>
                  <Review/>
                  <Review/>
              </Collapsible>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

        </ScrollView>
        <Button
          buttonStyle={{backgroundColor: COLOR_HARD_RED, borderRadius: 0}}
          title='BOOK TOUR'
          onPress={()=>{}}
          titleStyle={{fontSize: 18, fontWeight: 'bold'}}
        />
      </View>
    );
  }
}

class CardTitle extends Component{
  render(){
    return(
      <View>
        <TouchableOpacity style={{flexDirection: 'row', flex: 1, paddingVertical: 10}} activeOpacity={0.7} onPress={this.props.onPress}>
          <Text style={{flex: 1, fontWeight: 'bold', fontSize: 18, color: COLOR_LIGHT_BLACK}}>
              {this.props.title}
          </Text>
          <Icon
              name={this.props.status ? 'caretleft' : 'caretdown'}
              type='antdesign'
              color={COLOR_LIGHT_BLACK}
              size={17}
              containerStyle={{justifyContent: 'center'}}
          />
        </TouchableOpacity>
        { !this.props.status && <Divider style={{height: 1, backgroundColor: '#F4F5F4'}}/> }
      </View>
    );
  }
}

class TourTitle extends Component{
  render(){
    return(
      <View style={{flex: 1, padding: 10}}>
          <Text style={{flex: 1, fontWeight: 'bold', fontSize: 18, color: COLOR_LIGHT_BLACK}}>
              {this.props.title}
          </Text>
      </View>
    );
  }
}

class TourPrice extends Component {
  render(){
    return(
      <View style={{marginVertical: 8, alignItems: 'center'}}>
        <Text style={{color:'#C50000', fontWeight: 'bold', fontSize: 24}}>
          <NumberFormat
            value={this.props.price}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' VNĐ'}
            renderText={value => <Text>{value}</Text>}
          />
        </Text>
      </View>
    )
  }
}

class Review extends Component {
  render(){
    return(
      <View style={{paddingHorizontal: 4}}>
        <View style={{flexDirection: 'row', paddingTop: 6}}>
          <Avatar rounded source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} containerStyle={{marginRight: 8}}/>
          <Text style={{alignSelf: 'center', flex: 1, color: COLOR_LIGHT_BLACK}}>ABC</Text>
          <Rating
            type='custom'
            ratingCount={5}
            imageSize={14}
            ratingColor = {COLOR_MAIN}
            readonly
            ratingBackgroundColor='#c8c7c8'
            startingValue={2.5}
            style={{alignSelf: 'center'}}
          />
        </View>
        <View style={{paddingVertical: 8}}>
            <Text>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
        </View>
        <Divider style={{height: 1, backgroundColor: '#F4F5F4'}}/>
      </View>
    )
  }
}

class TourMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: [],
      count: 0,
      region: {
        latitude:  10.762864,
        longitude: 106.682229,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    }
  }

  callGetNearMeAPI(){
      // Lay ban kinh tuong ung voi chieu doc man hinh
      let {latitudeDelta, longitudeDelta } = this.state.region;
      let distance = 1.0;
      if (latitudeDelta !== 0.01){
        distance = latitudeDelta * 70;
      }

      return getNearMe(this.state.region.latitude, this.state.region.longitude, distance)
              .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                      dataSource: responseJson.data,
                      count: responseJson.itemCount,
                    });
                })
                .catch((error) => console.error(error));
  }

  _onRegionChange(e){
    this.setState({
      region: {
        latitude: e.latitude,
        longitude: e.longitude,
        latitudeDelta: e.latitudeDelta,
        longitudeDelta: e.longitudeDelta,
      }
    });

    this.callGetNearMeAPI();
  }

  componentDidMount(){
    return this.callGetNearMeAPI();
  }

  render(){
    const {region} = this.state;

    return(
      <MapView style={styles.map}
          onRegionChange={e => {this._onRegionChange(e)}}
          showsUserLocation = {true}
          moveOnMarkerPress = {true}
          initialRegion={region}
          ref={c => this.mapView = c}
      >
      </MapView>
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
})

export default TourDetail;
