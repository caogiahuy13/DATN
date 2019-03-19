import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Icon } from 'react-native-elements';

import { COLOR_LIGHT_BLACK, COLOR_GREEN, COLOR_HARD_RED } from '../constants/index';

import TourCardTitle from './TourCardTitle';

class BookingTourCard extends Component{
  render(){
    return(
      <Card
        containerStyle = {{margin: 0, padding: 0}}
        title=<TourCardTitle title="TOUR NAME TEST"/>
        titleStyle={styles.cardTitle}
        image={require('../assets/images/tour-card-img.jpg')}
      >
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
                <TourInfo firstText="Code:" secondText="00001"/>
                <TourInfo firstText="Start date:" secondText="01/01/2019"/>
                <TourInfo firstText="End date:" secondText="05/01/2019"/>
                <TourInfo firstText="Lasting:" secondText="1 days"/>
            </View>
            <View style={styles.priceContainer}>
                <Text>TOTAL PRICE:</Text>
                <Text style={{fontWeight: 'bold', fontSize: 26, color: COLOR_HARD_RED }}>100,000,00 VNĐ</Text>
            </View>



        </View>

      </Card>
    );
  }
}

class TourInfo extends Component {
  render(){
    return(
      <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 0.4}}>{this.props.firstText}</Text>
          <Text style={{flex: 0.6, fontWeight: 'bold'}}>{this.props.secondText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardTitle: {
    alignSelf: 'flex-start',
    marginHorizontal: 8,
  },
  priceContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default BookingTourCard;
