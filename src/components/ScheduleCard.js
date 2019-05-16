import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLOR_LIGHT_BLUE } from '../constants/index';
import localized from '../localization/index';

class ScheduleCard extends Component {
  render() {
    const {location, arrive_time, leave_time} = this.props.data;
    const {active} = this.props;

    return (
      <View style={styles.card}>
          <View style={styles.time}>
              <Text style={active ? styles.active : null}>{arrive_time ? arrive_time.substring(0, 5) : '...'}</Text>
              <Text style={active ? styles.active : null}>{leave_time ? leave_time.substring(0, 5) : '...'}</Text>
          </View>
          <View style={styles.locationInfo}>
              <Text style={active ? [styles.text,styles.active] : styles.text}>{location.name}</Text>
              <Text style={active ? styles.active : null}>{this.props.data.detail}</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  time: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  locationInfo: {
    flex: 0.8,
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  active: {
    color: COLOR_LIGHT_BLUE,
  }
})

export default ScheduleCard;
