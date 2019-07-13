import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import { COLOR_GRAY_BACKGROUND } from '../constants/index';

class NewsCard extends Component {

  onPress = () => {
    this.props.onPress(this.props.data.id);
  }

  render(){
    const {data} = this.props;

    return(
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
          <View style={{flex: 1}}>
              <Image
                  style={{flex: 1, width: undefined, height: 200}}
                  source={{uri: data.thumnail}}
              />
          </View>
          <View style={{padding: 10}}>
              <Text style={styles.title}>
                  {data.metatitle.replace(" - travel.blog.api", "")}
              </Text>
              <Text style={styles.content}>
                  {data.metadesc}
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
