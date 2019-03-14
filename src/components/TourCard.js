import React, { Component } from 'react';
import {Text, View, Alert, Image, StyleSheet} from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import NumberFormat from 'react-number-format';

export default class TourCard extends Component{
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
                          <Icon name='calendar' type='antdesign' color='#324a5e' size={20} containerStyle={{marginRight: 6}}/>
                          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{data.start_date}</Text>
                      </View>
                      <StarRating
                        emptyStar={'ios-star'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        maxStars={5}
                        rating={3}
                        fullStarColor={'#434A54'}
                        containerStyle={{justifyContent: 'flex-start', marginBottom: 4}}
                        starStyle={{marginRight: 4}}
                        starSize={18}
                      />
                  </View>
                  <View style={{alignContent: 'flex-end'}}>
                      <TourPrice value={data.price}/>
                      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                          <Button buttonStyle={styles.button} title='BOOK NOW'/>
                          <Button buttonStyle={styles.button} title='DETAIL'/>
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
    color: '#324a5e',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priceContainer: {
    flex: 1,
    paddingLeft: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#324a5e',
    borderRadius: 0,
    marginLeft: 10,
    marginBottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  title: {
    alignSelf: 'flex-start',
    marginHorizontal: 10
  }
})
