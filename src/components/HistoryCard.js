import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';

import { } from '../actions/index.js';
import { COLOR_MAIN, COLOR_GREEN } from '../constants/index';

class HistoryCard extends Component{
  render(){
    return(
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
                <Text style={styles.code}>009522</Text>
                <InfoText firstTxt="Booking Day:" secondTxt="08/03/2019 10:44"/>
                <InfoText firstTxt="Total Slot:" secondTxt="1"/>
                <InfoText firstTxt="Total Money:" secondTxt="2,179,000 VNĐ"/>
                <InfoText firstTxt="Status:" secondTxt="New"/>
            </View>
            <View style={{justifyContent: 'center', }}>
                <Icon
                  name='chevron-right'
                  type='feather'
                  color='gray'
                />
            </View>
        </View>
      </TouchableOpacity>
    );
  }
}

class InfoText extends Component {
  render(){
    const {firstTxt, secondTxt} = this.props;
    return(
      <View style={{flexDirection: 'row'}}>
          <Text style={styles.firstTxt}>{firstTxt}</Text>
          <Text> </Text>
          <Text style={styles.secondTxt}>{secondTxt}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  code : {
    color: 'orange',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 6,
  },
  card: {
    padding: 0,
    margin: 0,
    borderRadius: 4,
    elevation: 2,
  },
  title: {
    alignSelf: 'flex-start',
    marginHorizontal: 10
  },
})

export default HistoryCard;
