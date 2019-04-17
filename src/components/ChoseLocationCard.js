import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { recommendTourNewLocations } from '../actions/index.js';
import { COLOR_MAIN } from '../constants/index';
import localized from '../localization/index';

class ChoseLocationCard extends Component {
  onDelete(id){
    const {locations} = this.props.recommendTour;
    let newLocations = [];

    for (let i=0; i<locations.length; i++){
      if (locations[i].id != id){
        newLocations.push(locations[i]);
      }
    }

    this.props.recommendTourNewLocations(newLocations);
  }


  render() {
    const {data} = this.props;

    return (
        <View style={styles.container}>
            <View style={{padding: 12, flex: 0.4}}>
                { data.featured_img &&
                  <Image style={styles.image} source={{uri: data.featured_img}}/>
                }
                { !data.featured_img &&
                  <Image style={styles.image} source={require('../assets/images/no_image.jpg')}/>
                }
            </View>
            <View style={{flex: 0.5, paddingVertical: 12}}>
                <Text style={styles.name}>{data.name}</Text>
                <Text>{data.address}</Text>
            </View>
            <View style={styles.delete}>
              <TouchableOpacity onPress={()=>{this.onDelete(data.id)}}>
                  <Icon
                    name='close'
                    type='font-awesome'
                    color='gray'
                  />
              </TouchableOpacity>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  delete: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold'
  }
})

function mapStateToProps(state){
  return{
    recommendTour: state.recommendTour,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    recommendTourNewLocations: recommendTourNewLocations,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoseLocationCard);
