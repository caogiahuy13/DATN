import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { Button, Icon } from 'react-native-elements';

import {handleModalLocation, handleTourCarousel, changeCurrentRoute} from '../actions/index.js';

const window = Dimensions.get('window');
const { width, height }  = window;

class TourCarousel extends Component {

  _onDirectionPress(){
    
  }

  // render tour carousel tương ứng với tour đi qua địa điểm
  _renderItem ({item, index}) {
      return (
          <View style={styles.container}>
            <Image source={require("../assets/images/tour-card-img.jpg")} style={styles.image}/>
            <View style={{paddingHorizontal: 6, paddingBottom: 7}}>
              <Text style={styles.text}>{item.name}</Text>
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
    const {tours} = this.props.modalLocation.location;

    return(
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={tours}
        renderItem={this._renderItem}
        sliderWidth={width}
        itemWidth={width/1.2}
        layout={'default'}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 16,
    borderWidth: 0.1,
    borderColor: 'black',
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

function mapStateToProps(state){
  return{
    modalLocation: state.modalLocation,
    currentRoute: state.currentRoute,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    handleModalLocation: handleModalLocation,
    handleTourCarousel: handleTourCarousel,
    changeCurrentRoute: changeCurrentRoute,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TourCarousel);
