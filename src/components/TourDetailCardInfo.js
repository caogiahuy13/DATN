import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Divider } from 'react-native-elements';

import { getDaysDiff, getDaysLeft, priceFormat, getDiscountPrice, dateFormat, getTourCode } from '../services/function';
import { COLOR_MAIN, COLOR_HARD_RED } from '../constants/index';
import localized from '../localization/index';

class TourDetailCardInfo extends Component {
  render(){
    const {currentTourTurn} = this.props;

    return(
      <View style={{paddingHorizontal: 12}}>
          <View style={{marginBottom: 8}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{flex: 0.36}}>{localized.code}</Text>
              <Text style={{flex: 0.64}}>{typeof(currentTourTurn.id) != 'undefined' ? getTourCode(currentTourTurn.id) : ''}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={{flex: 0.36}}>{localized.startDate}:</Text>
              <Text style={{flex: 0.32}}>{dateFormat(currentTourTurn.start_date)}</Text>
              <View style={{flexDirection: 'row', flex: 0.32}}>
                  <Icon name='calendar' type='antdesign' color={COLOR_MAIN} size={18}/>
                  <TouchableOpacity onPress={()=>{this.props.onOtherDayPress(currentTourTurn.tour.name)}}>
                      <Text style={{color: 'orange'}}> {localized.otherDay}</Text>
                  </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={{flex: 0.36}}>
                  {localized.lastIn} {getDaysDiff(currentTourTurn.start_date, currentTourTurn.end_date)} {localized.days.toLowerCase()}
              </Text>
              <Text style={{flex: 0.32}}>
                  {getDaysLeft(currentTourTurn.start_date)} {localized.daysLeft.toLowerCase()}
              </Text>
              <Text style={{flex: 0.32}}>
                  {currentTourTurn.num_max_people - currentTourTurn.num_current_people} {localized.slotsLeft.toLowerCase()}
              </Text>
            </View>
          </View>

          <Divider style={{height: 1}}/>

          <TourPrice price={currentTourTurn.price} discount={currentTourTurn.discount}/>
      </View>
    )
  }
}

class TourPrice extends Component {
  render(){
    const {price, discount} = this.props;
    let newPrice = getDiscountPrice(price, discount);
    return(
      <View style={{marginVertical: 8, alignItems: 'center'}}>
        { discount > 0 &&
          <Text style={styles.oldPrice}>
            {priceFormat(this.props.price)}
          </Text>
        }
        <Text style={styles.newPrice}>
            {priceFormat(newPrice)}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  oldPrice: {
    color:'gray',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  newPrice: {
    color: COLOR_HARD_RED,
    fontWeight: 'bold',
    fontSize: 24,
  }
});

export default TourDetailCardInfo;
