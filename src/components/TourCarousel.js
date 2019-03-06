import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { Button, Icon } from 'react-native-elements';

const window = Dimensions.get('window');
const { width, height }  = window;

class TourCarousel extends Component {
  constructor(props){
    super(props);
    this.state = {
      entries: [
        {
            title: 'Beautiful and dramatic Antelope Canyon',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
            illustration: 'https://i.imgur.com/UYiroysl.jpg'
        },
        {
            title: 'Earlier this morning, NYC',
            subtitle: 'Lorem ipsum dolor sit amet',
            illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
        },
        {
            title: 'White Pocket Sunset',
            subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
            illustration: 'https://i.imgur.com/MABUbpDl.jpg'
        },
      ],
    }
  }

  _renderItem ({item, index}) {
      return (
          <View style={styles.container}>
            <Image source={require("../assets/images/tour-card-img.jpg")} style={styles.image}/>
            <View style={{paddingHorizontal: 6, paddingBottom: 6}}>
              <Text style={styles.text}>{item.title}</Text>
              <View style={{flexDirection: 'row'}}>
                <Button
                  icon={<Icon name="directions" type="materialicons" size={18} color="white" iconStyle={{marginRight: 4}}/>}
                  type="solid"
                  title="Direction"
                  titleStyle={{fontSize: 14}}
                  buttonStyle={styles.button}
                  onPress={()=>{}}
                />
                <Button
                  icon={<Icon name="rightcircle" type="antdesign" size={16} color="#2089DC" iconStyle={{marginRight: 4}}/>}
                  type="outline"
                  title="Detail"
                  titleStyle={{fontSize: 14}}
                  buttonStyle={styles.button}
                  onPress={()=>{}}
                />
              </View>
            </View>
          </View>
      );
  }

  render(){
    return(
      <View style={{marginTop: 10}}>
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={this.state.entries}
        renderItem={this._renderItem}
        sliderWidth={width}
        itemWidth={width/1.2}
        layout={'stack'}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 16,
  },
  image: {
    width: undefined,
    height: 64,
    justifyContent: 'flex-end',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  text: {
    padding: 4,
    fontWeight: 'bold',
    shadowColor: 'black',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 2,
    margin: 1,
    alignSelf: 'flex-start'
  },
});



export default TourCarousel;
