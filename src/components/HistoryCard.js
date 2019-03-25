import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';

import { } from '../actions/index.js';
import { COLOR_MAIN, COLOR_GREEN } from '../constants/index';
import { capitalize, bookedDateFormat, priceFormat } from '../services/function';
import localized from '../localization/index';

class HistoryCard extends Component{
  render(){
    const {data} = this.props;

    return(
      <TouchableOpacity style={styles.container} onPress={()=>this.props.onPress(data)}>
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
                <Text style={styles.code}>{'0000'+data.id}</Text>
                <InfoText firstTxt={localized.bookingDay+":"} secondTxt={bookedDateFormat(data.book_time)}/>
                <InfoText firstTxt={localized.totalSlot+":"} secondTxt={data.num_passenger}/>
                <InfoText firstTxt={localized.totalPrice+":"} secondTxt={priceFormat(data.total_pay)}/>
                <InfoText firstTxt={localized.status+":"} secondTxt={capitalize(data.status)}/>
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
