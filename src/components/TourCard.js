import React, { Component } from 'react';
import {Text, View, Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { tourDetailChangeId, tourDetailShowMarker, bookingChangeTourTurn } from '../actions/index.js';
import { getTourTurnById } from '../services/api';
import { priceFormat, dateFormat, getDiscountPrice } from '../services/function';
import { COLOR_MAIN, COLOR_GREEN } from '../constants/index';

import TourRating from './TourRating';
import Sale from './Sale';

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
      <TouchableOpacity style={styles.container} onPress={this._onDetailPress}>
        <View style={{flex: 0.4, justifyContent: 'flex-end'}}>
            <Image style={{flex: 1, width: undefined, height: undefined}} source={{uri: data.tour.featured_img}}/>
            { data.discount > 0 &&
              <View style={{padding: 6, position: 'absolute'}}>
                  <Sale/>
              </View>
            }
        </View>

        <View style={{flex: 0.6, paddingHorizontal: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>{data.tour.name}</Text>

            <View style={{justifyContent: 'flex-start', flexDirection: 'row', paddingVertical: 2}}>
                <Icon name='calendar' type='antdesign' color='gray' size={18} containerStyle={{marginRight: 6}}/>
                <Text style={styles.calendarText}>{dateFormat(data.start_date)}</Text>
            </View>

            <View style={{alignItems: 'flex-start'}}>
                <TourRating rating={3} size={14}/>
            </View>

            <TourPrice price={data.original_price} discount={data.discount}/>
        </View>
      </TouchableOpacity>
    );
  }
}

class TourPrice extends Component {
  render(){
    const { price, discount } = this.props;
    let newPrice = getDiscountPrice(price,discount);

    return(
      <View style={styles.priceContainer}>
          { discount > 0 &&
            <Text style={styles.oldPrice}>
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
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12
  },
  price: {
    fontSize: 20,
    color: COLOR_MAIN,
    fontWeight: 'bold',
  },
  oldPrice: {
    color:'gray',
    fontSize: 12,
    fontWeight: '300',
    textDecorationLine: 'line-through'
  },
  priceContainer: {
    flex: 1,
    padding: 4,
    alignItems: 'center',
  },
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
