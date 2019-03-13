import React, { Component } from 'react';
import { View, Text, StyleSheet,
        Animated, Dimensions, 
        Easing, PanResponder, 
        ScrollView, TouchableOpacity, 
        TouchableHighlight, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Display from 'react-native-display';
export default class History extends Component {
  constructor() {
    super();
    this.state = { 
      //startButtonVisible: true,
      tags: [
        {'choose': 'false', 'show': 'true', 'id': '1', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '1', 'totalMoney': '2.179.000 VND', 'status': 'New',  'title': 'Sai Gon'},
        {'choose': 'false', 'show': 'true', 'id': '2', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '12', 'totalMoney': '2.179.000 VND', 'status': 'New',  'title': 'Ha Noi'},
        {'choose': 'false', 'show': 'true', 'id': '3', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '6', 'totalMoney': '2.179.000 VND', 'status': 'New',  'title': 'Vung Tau'},
        {'choose': 'false', 'show': 'true', 'id': '4', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '11', 'totalMoney': '2.179.000 VND', 'status': 'New',  'title': 'Da Nang'},
        {'choose': 'false', 'show': 'true', 'id': '5', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '1', 'totalMoney': '2.179.000 VND', 'status': 'New',  'title': 'Vinh Ha Long'},
      ], };
  }
  removeTag(id){
    let newArray = [...this.state.tags];
    newArray[id-1].show = false;
    this.setState({tags: newArray});
  }
  chooseTag(id){
    let newArray = [...this.state.tags];
    newArray[id-1].choose = !this.state.tags[id-1].choose;
    this.setState({tags: newArray});
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
            this.state.tags.map((tag, index) => {
              return (
                <Display key = {tag.id} 
                enable={tag.show}
                enterDuration={500} 
                exitDuration={250}
                exit="fadeOutDown"
                enter="fadeInUp">
                  <TouchableOpacity key = {tag.id} 
                  style = {[tag.choose ? styles.tag : styles.tagChoose]} 
                  onPress={() => this.chooseTag(tag.id)}>
                    <View  style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style = {styles.bookingDayTag}>{tag.bookingDay}</Text>
                      <TouchableOpacity style={styles.deleteTourTag} onPress={() => this.removeTag(tag.id)}>
                        <Foundation name="x" size={35} color={"tomato"}/>
                      </TouchableOpacity>
                    </View>
                    <Text style = {styles.titleTag}>{tag.title}</Text>
                    <View  style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <MaterialCommunityIcons name="new-box" size={35} color={"tomato"}/>
                    </View>
                  </TouchableOpacity>
                </Display>
              );
            })
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
    tagChoose: {
      marginTop: -150,
      marginLeft: '12.5%',
      height: 300,
      width: '75%',
      backgroundColor: '#292929',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'rgba(0,0,0,0.05)',
      transform: [
        { perspective: 1000 },
        //{ translateY: 10},
        //{ rotateX: '-40deg'},
      ],
      elevation: 3,
    },
    bookingDayTag: {
      marginLeft: 10,
      marginTop: 10,
      fontSize: 15,
    },
    deleteTourTag: {
      marginTop: 3,
      marginRight: 5,
      //paddingTop: 5,
      //paddingLeft: 5,
      //height: 35,
      //width: 35,
      //backgroundColor: 'tomato',
    },
    titleTag: {
      textAlign: 'center',
      fontSize: 25,
    },
})
