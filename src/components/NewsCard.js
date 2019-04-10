import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import { COLOR_GRAY_BACKGROUND } from '../constants/index';

const str = 'Ho Chi Minh City (commonly known as Saigon) is a city in southern Vietnam famous for the pivotal role it played in the Vietnam War. Its also known for its French colonial landmarks, including Notre-Dame Cathedral, made entirely of materials imported from France, and the 19th-century Central Post Office. Food stalls line the city’s streets, especially around bustling Bến Thành Market.';

class NewsCard extends Component {
  render(){
    return(
      <TouchableOpacity style={styles.container} onPress={()=>{}}>
          <View>
              <Image style={{flex: 1, width: undefined, height: 200}} source={require('../assets/images/tour-card-img.jpg')}/>
          </View>
          <View style={{padding: 10}}>
              <Text style={styles.title}>Lorem ipsum</Text>
              <Text style={styles.content}>
                  {str}
              </Text>
          </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
  },
  content: {
    paddingVertical: 6,
  }
})

export default NewsCard;
