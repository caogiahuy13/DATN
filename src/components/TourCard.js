import React, { Component } from 'react';
import {Text, View, Alert, Image, StyleSheet} from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { tourDetailChangeId, tourDetailShowMarker, bookingChangeTourTurn } from '../actions/index.js';
import { getTourTurnById } from '../services/api';
import { priceFormat } from '../services/function';
import { COLOR_MAIN, COLOR_GREEN } from '../constants/index';

class TourCard extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentTurn: {},
    }
  }

  _onDetailPress = () => {
    this.props.onPress(this.props.data.id);
    this.props.tourDetailChangeId(this.props.data.tour.id);
    this.props.tourDetailShowMarker(true);
  }

  _onBookNowPress = () => {
    this.callGetTourTurnById(this.props.data.id)
        .then(()=>{
          this.props.bookingChangeTourTurn(this.state.currentTurn);
          this.props.onBookNowPress();
        })
  }

  async callGetTourTurnById(id){
    return getTourTurnById(id)
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({currentTurn: responseJson.data});
            })
            .catch((error) => console.error(error));
  }

  render(){
    const {data} = this.props;

    return(
      <View>
        <Card
          title={data.tour.name}
          image={{uri: data.tour.featured_img}}
          titleStyle={styles.title}
          containerStyle={styles.card}
        >

          <View style={{justifyContent: 'flex-start'}}>
              <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                      <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
                          <Icon name='calendar' type='antdesign' color={COLOR_MAIN} size={20} containerStyle={{marginRight: 6}}/>
                          <Text style={styles.calendarText}>{data.start_date}</Text>
                      </View>
                      <Rating
                        type='custom'
                        ratingCount={5}
                        imageSize={18}
                        ratingColor = {COLOR_MAIN}
                        readonly
                        ratingBackgroundColor='#c8c7c8'
                        startingValue={2.5}
                        style={{ alignSelf: 'flex-start', marginTop: 4}}
                      />
                      { data.discount > 0 &&
                        <View style={{width: 70, flex: 1, justifyContent: 'flex-end'}}>
                          <Button buttonStyle={styles.sale} title='SALE!'/>
                        </View>
                      }
                  </View>
                  <View style={{alignContent: 'flex-end'}}>
                      <TourPrice price={data.price} discount={data.discount}/>
                      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                          <Button buttonStyle={styles.button} title='BOOK NOW' onPress={this._onBookNowPress}/>
                          <Button buttonStyle={styles.button} title='DETAIL'onPress={this._onDetailPress}/>
                      </View>
                  </View>
              </View>
          </View>

        </Card>
      </View>
    );
  }
}

class TourPrice extends Component {
  render(){
    const { price, discount } = this.props;
    let newPrice = price - (price * discount)/100;

    return(
      <View style={styles.priceContainer}>
          { discount > 0 &&
            <Text style={{color:'gray', fontWeight: 'bold', fontSize: 14, textDecorationLine: 'line-through'}}>
              {priceFormat(price)}
            </Text>
          }
          <Text style={styles.price}>
              {priceFormat(newPrice)}
          </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {

    borderRadius: 4,
    elevation: 2,
  },
  price: {
    fontSize: 24,
    // color: 'rgb(178,34,34)',
    color: COLOR_MAIN,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priceContainer: {
    flex: 1,
    paddingLeft: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  button: {
    backgroundColor: COLOR_MAIN,
    borderRadius: 1,
    marginLeft: 10,
    marginBottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  sale: {
    backgroundColor: COLOR_GREEN,
    borderRadius: 1,
    padding: 0,
  },
  title: {
    alignSelf: 'flex-start',
    marginHorizontal: 10
  },
  calendarText: {
    color: COLOR_MAIN,
    fontSize: 15,
    fontWeight: '100',
  }
})

function mapStateToProps(state){
  return{

  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    tourDetailChangeId: tourDetailChangeId,
    tourDetailShowMarker: tourDetailShowMarker,
    bookingChangeTourTurn: bookingChangeTourTurn,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TourCard);
