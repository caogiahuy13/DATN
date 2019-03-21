import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import Moment from 'moment';

import { COLOR_LIGHT_BLACK, COLOR_GREEN, COLOR_HARD_RED } from '../constants/index';

import TourCardTitle from './TourCardTitle';

class BookingTourCard extends Component{
  getTotalPrice(){
    const {data,number} = this.props;
    let adultPrice = data.price_passengers[0].price * number.adult;
    let childrenPrice = data.price_passengers[1].price * number.children;
    return adultPrice + childrenPrice;
  }

  getDaysDiff(startDate, endDate){
    let day1 = Moment(startDate);
    let day2 = Moment(endDate);
    let duration = Moment.duration(day2.diff(day1));
    let days = Math.ceil(duration.asDays());
    return days + 1;
  }

  render(){
    const {data,number} = this.props;

    return(
      <Card
        containerStyle = {{margin: 0, padding: 0}}
        title=<TourCardTitle title={data.tour.name}/>
        titleStyle={styles.cardTitle}
        image={{uri: data.tour.featured_img}}
      >
        <View style={{flex: 1, paddingHorizontal: 4, paddingBottom: 10}}>
            <TourInfo firstText="Code:" secondText={"000" + data.id}/>
            <TourInfo firstText="Start date:" secondText={Moment(data.start_date).format('DD/MM/YYYY')}/>
            <TourInfo firstText="End date:" secondText={Moment(data.end_date).format('DD/MM/YYYY')}/>
            <TourInfo firstText="Lasting:" secondText={this.getDaysDiff(data.start_date, data.end_date)}/>
            <TourPrice firstText="Adult price:" price={data.price_passengers[0].price} number={number.adult}/>
            <TourPrice firstText="Adult price:" price={data.price_passengers[1].price} number={number.children}/>
        </View>
        <View style={styles.priceContainer}>
            <Text>TOTAL PRICE:</Text>
            <Text style={styles.price}>
                <NumberFormat
                  value={this.getTotalPrice()}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={' VNĐ'}
                  renderText={value => <Text>{value}</Text>}
                />
            </Text>
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

class TourPrice extends Component {
  render(){
    return(
      <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 0.4}}>{this.props.firstText}</Text>
          <Text style={{flex: 0.6, fontWeight: 'bold', flexDirection: 'row'}}>
              <NumberFormat
                value={this.props.price}
                displayType={'text'}
                thousandSeparator={true}
                renderText={value => <Text>{value}</Text>}
              />
              <Text> x </Text>
              <Text>{this.props.number}</Text>
          </Text>
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
  },
  price: {
    fontWeight: 'bold',
    fontSize: 26,
    color: COLOR_HARD_RED,
  }
})

export default BookingTourCard;
