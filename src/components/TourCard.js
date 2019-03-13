import React, { Component } from 'react';
import {Text, View, Alert, Image, StyleSheet} from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import NumberFormat from 'react-number-format';

const cardImage = require("../assets/images/tour-card-img.jpg");

export default class TourCard extends Component{
  render(){
    return(
      <View>
        <Card
          title='Tour tham quan Sài Gòn (nửa ngày)'
          image={cardImage}
          titleStyle={styles.title}
          containerStyle={{padding: 0}}
        >
          <View style={{justifyContent: 'flex-start'}}>
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
                starSize={24}
              />
              <Text style={styles.price}>
                  <NumberFormat
                    value={500000}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={' đ'}
                    renderText={value => <Text>{value}</Text>}
                  />
              </Text>
          </View>


          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button
              buttonStyle={styles.button}
              title='BOOK NOW'
            />
            <Button
              backgroundColor='#324a5e'
              buttonStyle={styles.button}
              title='DETAIL' />
          </View>
        </Card>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  price: {
    fontSize: 24,
    color: 'rgb(178,34,34)',
    fontWeight: 'bold',
    marginBottom: 4,
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
