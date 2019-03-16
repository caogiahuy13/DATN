import React, { Component } from 'react';
import {Text, View, Alert, Image, StyleSheet} from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating } from 'react-native-elements';
import NumberFormat from 'react-number-format';

import { COLOR_MAIN } from '../constants/index';

export default class TourCard extends Component{

  _onPress = () => {
    console.log(this.props.data);
    this.props.onPress(this.props.data.id)
  }

  render(){
    const {data} = this.props;

    return(
      <View>
        <Card
          title={data.tour.name}
          image={{uri: data.tour.featured_img}}
          titleStyle={styles.title}
          containerStyle={{padding: 0}}
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
                  </View>
                  <View style={{alignContent: 'flex-end'}}>
                      <TourPrice value={data.price}/>
                      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                          <Button buttonStyle={styles.button} title='BOOK NOW'/>
                          <Button buttonStyle={styles.button} title='DETAIL'onPress={this._onPress}/>
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
    return(
      <View style={styles.priceContainer}>
          <Text style={styles.price}>
              <NumberFormat
                value={this.props.value}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' đ'}
                renderText={value => <Text>{value}</Text>}
              />
          </Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
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
    borderRadius: 0,
    marginLeft: 10,
    marginBottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 6,
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
