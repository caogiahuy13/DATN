import React, { Component } from 'react';
import { View, Text, StyleSheet,
        Animated, Dimensions, 
        Easing, PanResponder, 
        ScrollView, } from 'react-native';

export default class History extends Component {
  state = {
    tags: [
      {'id': '1', 'bookingDay': '08/03/2019 10:04', 'title': 'Sai Gon', 'price': 1},
      {'id': '2', 'bookingDay': '08/03/2019 10:04', 'title': 'Sai Gon', 'price': 1},
      {'id': '3', 'bookingDay': '08/03/2019 10:04', 'title': 'Sai Gon', 'price': 1},
      {'id': '4', 'bookingDay': '08/03/2019 10:04', 'title': 'Sai Gon', 'price': 1},
      {'id': '5', 'bookingDay': '08/03/2019 10:04', 'title': 'Sai Gon', 'price': 1},
    ]
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.textTitle}> HISTORY </Text>
        </View>
        <Text style={styles.titleNotice}> Click to see details. </Text>

        <ScrollView style={styles.tagsContainer} ref="scrollView"
             onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}>
          <View style={styles.tagPadding}></View>
          {
            this.state.tags.map((tag, index) => (
                <View key = {tag.id} style = {[styles.tag, ]}>
                  <Text style = {styles.titleTag}>{tag.title}</Text>
                </View>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      //justifyContent: 'center',
      //backgroundColor: '#CFCFCF',
      backgroundColor: '#292929',
    },
    title: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      backgroundColor: '#fff',
      width: '100%',
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
    },
    textTitle: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#324A5E',
    },
    titleNotice: {
      position: 'absolute',
      zIndex: 0,
      marginTop: 68,
      color: '#fff',
      fontSize: 20,
    },
    tagsContainer: {
      position: 'absolute',
      zIndex: 0,
      //backgroundColor: '#292929',
      width: '100%',
      height: '100%',
    },
    tagPadding: {
      height: 250,
      width: '100%',
      //backgroundColor: '#292929',
    },
    tag: {
      marginTop: -150,
      marginLeft: '12.5%',
      height: 300,
      width: '75%',
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'rgba(0,0,0,0.05)',
      transform: [
        { perspective: 1000 },
        //{ translateY: 10},
        { rotateX: '-40deg'},
      ],
      elevation: 3,
    },
    titleTag: {
      textAlign: 'center',
      fontSize: 25,
    },
})
