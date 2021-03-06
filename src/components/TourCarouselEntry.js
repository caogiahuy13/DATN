import React, { Component } from 'react';
import {Text, View, Image, StyleSheet } from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import {changeCurrentRoute, handleCurrentRoute, handleCurrentRouteZoom } from '../actions/index.js';
import { getRouteByTour } from '../services/api';
import localized from '../localization/index';

class TourCarouselEntry extends Component {
  async callGetRouteByTourAPI(id){
    return getRouteByTour(id)
              .then((response) => response.json())
              .then((responseJson) => {
                  this.props.changeCurrentRoute(responseJson.data);
              })
              .catch((error) => {
                console.error(error);
              });
  }

  _onDirectionPress(e){
    this.callGetRouteByTourAPI(this.props.item.id).then(()=>{
      this.props.handleCurrentRoute(true);
      this.props.handleCurrentRouteZoom(true);
    })
    // console.log(this.props.currentRoute);
  }

  render () {
    const {item} = this.props;

    return (
      <View style={styles.container}>
        <Image source={{uri: item.featured_img}} style={styles.image}/>
        <View style={{paddingHorizontal: 6, paddingBottom: 7}}>
          <Text style={styles.text}>{item.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Button
              icon={<Icon name="directions" type="materialicons" size={18} color="white" iconStyle={{marginRight: 4}}/>}
              type="solid"
              title={localized.direction}
              titleStyle={{fontSize: 14}}
              buttonStyle={styles.button}
              onPress={()=>{this._onDirectionPress()}}
            />
            <Button
              icon={<Icon name="rightcircle" type="antdesign" size={16} color="#2089DC" iconStyle={{marginRight: 4}}/>}
              type="outline"
              title={localized.detail}
              titleStyle={{fontSize: 14}}
              buttonStyle={styles.button}
              onPress={()=>{this.props.navigation.navigate("TourDetail",{id: item.tour_turns.id})}}
            />
          </View>
        </View>
      </View>
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

  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changeCurrentRoute: changeCurrentRoute,
    handleCurrentRoute: handleCurrentRoute,
    handleCurrentRouteZoom: handleCurrentRouteZoom,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(TourCarouselEntry));
