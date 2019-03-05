import React, { Component } from 'react';
import {Text, Button, View, Alert, Image, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';

import {handleModalLocation} from '../actions/index.js';

class LocationDetail extends Component {
  render(){
    return(
      <Animatable.View animation="slideInDown" style={styles.detail}>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.image} source={{uri:'http://10.0.3.2:5000/assets/images/locationFeatured/SorrentoCafeHoaHung.jpg'}}/>
          <View style={styles.text}>
            <Text style={{fontWeight: 'bold'}}>Đại học Khoa Học Tự Nhiên Đại Học Quốc Gia, TPHCM</Text>
            <Text>227 đường Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh, Việt Nam</Text>
          </View>
        </View>
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  detail: {
    backgroundColor: 'white',
    justifyContent: 'center',
    margin: 10,
    elevation: 2,
    borderRadius: 5,
    padding: 8,
  },
  image: {
    flex: 0.4,
    width: undefined,
    height: undefined,
    marginRight: 6,
    borderRadius: 5
  },
  text: {
    flex: 0.6,
    marginLeft: 2
  }
})

function mapStateToProps(state){
  return{
    modalLocation: state.modalLocation,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    handleModalLocation: handleModalLocation,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetail);
