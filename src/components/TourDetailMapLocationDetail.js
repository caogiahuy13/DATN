import React, { Component } from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { tourDetailShowLocation } from '../actions/index.js';

class TourDetailMapLocationDetail extends Component {

  //Khi người dùng nhấn close Handle Modal
  _onCloseHandleModal(){
    this.props.tourDetailShowLocation(false);
  }

  render(){
    const {location} = this.props.tourDetail;
    let link = "";

    if (location.featured_img != null){
      link = location.featured_img;
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
    tourDetail: state.tourDetail,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    tourDetailShowLocation: tourDetailShowLocation,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TourDetailMapLocationDetail);
