import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Divider } from 'react-native-elements';

import { COLOR_LIGHT_BLACK } from '../constants/index';

class CollapsibleCardTitle extends Component{
  render(){
    return(
      <View>
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={this.props.onPress}>
          <Text style={styles.title}>
              {this.props.title}
          </Text>

          <Icon
              name={this.props.status ? 'caretleft' : 'caretdown'}
              type='antdesign'
              color={COLOR_LIGHT_BLACK}
              size={17}
              containerStyle={{justifyContent: 'center'}}
          />
        </TouchableOpacity>

        { !this.props.status &&
          <Divider style={{height: 1, backgroundColor: '#F4F5F4'}}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 10,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    color: COLOR_LIGHT_BLACK,
  },
})

export default CollapsibleCardTitle ;
