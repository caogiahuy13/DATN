import React, { Component } from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Button, Icon } from 'react-native-elements';

import {handleModalLocation, handleTourCarousel, handleCurrentRoute} from '../actions/index.js';

class LocationDetail extends Component {

  //Khi người dùng nhấn close Handle Modal
  _onCloseHandleModal(){
    this.props.handleModalLocation(false);
    this.props.handleTourCarousel(false);
    this.props.handleCurrentRoute(false);
  }

  render(){
    const {location} = this.props.modalLocation;
    let link = "";
    let tourStr = '' + location.tours.length + ' tour đi qua';

    if (location.featured_img != null){
      link = location.featured_img;
      // link = "http://10.0.3.2:5000/" + link.split("/").slice(1).join("/");
    }


    return(
      <View style={styles.detail}>
        <View style={{flexDirection: 'row'}}>
            {/*Nếu có ảnh thì hiển thị ảnh*/}
            {(location.featured_img != null) && <Image style={styles.image} source={{uri: link}}/>}

            <View style={styles.text}>
              {/*Hiển thị thông tin địa điểm*/}
              <View style={{marginBottom: 4}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.name}>{location.name}</Text>
                  <Icon name="close" type="antdesign" color="gray" size={16} onPress={()=>{this._onCloseHandleModal()}}/>
                </View>
                <Text>{location.address}</Text>
              </View>

              {/*Hiển thị số lượng tour đi qua nếu có*/}
              {
                (location.tours.length > 0) &&
                <Button
                  icon={<Icon name="eye" type="feather" size={18} color="white" iconStyle={{marginRight: 4}}/>}
                  type="solid"
                  title= {tourStr}
                  titleStyle={{fontSize: 14}}
                  buttonStyle={styles.button}
                  onPress={()=>{this.props.handleTourCarousel(true)}}
                />
              }
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detail: {
    backgroundColor: 'white',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 16,
    padding: 8,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    marginRight: 6,
    borderRadius: 5
  },
  text: {
    flex: 1.2,
    marginLeft: 2
  },
  button: {
    borderRadius: 10,
    paddingVertical: 2,
    margin: 1,
    alignSelf: 'flex-end'
  },
  name: {
    fontWeight: 'bold',
    flex: 1,
  }
})

function mapStateToProps(state){
  return{
    modalLocation: state.modalLocation,
    tourCarousel: state.tourCarousel,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    handleModalLocation: handleModalLocation,
    handleTourCarousel: handleTourCarousel,
    handleCurrentRoute: handleCurrentRoute,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetail);
