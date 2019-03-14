import React, { Component } from 'react';
import { View, Text, StyleSheet,
        Animated, Dimensions, 
        Easing, PanResponder, 
        ScrollView, TouchableOpacity, 
        TouchableHighlight, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Display from 'react-native-display';
import AwesomeAlert from 'react-native-awesome-alerts';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class History extends Component {
  constructor() {
    super();
    this.state = { 
      showAlertDeleteTag: false,
      idToDeleteTag: '0',
      tags: [
        {'choose': 'false', 'show': 'true', 'id': '1', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '1', 'totalMoney': '2.179.000 VND', 'status': 'Old',  'title': 'Sai Gon'},
        {'choose': 'false', 'show': 'true', 'id': '2', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '12', 'totalMoney': '2.179.000 VND', 'status': 'Old',  'title': 'Ha Noi'},
        {'choose': 'false', 'show': 'true', 'id': '3', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '6', 'totalMoney': '2.179.000 VND', 'status': 'Old',  'title': 'Vung Tau'},
        {'choose': 'false', 'show': 'true', 'id': '4', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '11', 'totalMoney': '2.179.000 VND', 'status': 'New',  'title': 'Da Nang'},
        {'choose': 'false', 'show': 'true', 'id': '5', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '1', 'totalMoney': '2.179.000 VND', 'status': 'New',  'title': 'Vinh Ha Long'},
      ], };
  }
  removeTag (id){
    let newArray = [...this.state.tags];
    newArray[id-1].show = false;
    this.setState({tags: newArray});
  }
  chooseTag (id){
    let newArray = [...this.state.tags];
    newArray[id-1].choose = !this.state.tags[id-1].choose;
    this.setState({tags: newArray});
  }
  backTag (id){
    let newArray = [...this.state.tags];
    newArray[id-1].choose = !this.state.tags[id-1].choose;
    this.setState({tags: newArray});
  }
  showAlert (id){
    this.setState({showAlertDeleteTag: true, idToDeleteTag: id});
  }
  hideAlert (){
    this.setState({showAlertDeleteTag: false});
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
                      <View style={[tag.status === 'New' ? styles.flex : styles.none ]}>
                        <MaterialCommunityIcons name="new-box" size={40} color={"tomato"}/>
                      </View>
                      <TouchableOpacity style={[tag.status === 'New' ? styles.deleteTourTag2 : styles.none]} onPress={() => this.showAlert(tag.id)}>
                        <Foundation name="x" size={35} color={"tomato"}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={[tag.status === 'New' ? styles.none : styles.deleteTourTag2]} onPress={() => {}}>
                        <Foundation name="x" size={35} color={"#31495D"}/>
                      </TouchableOpacity>
                    </View>
                    <Text style = {styles.titleTag}>{tag.title}</Text>
                    <View  style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      
                    </View>
                  </TouchableOpacity>
                </Display>
              );
            })
          }
        </ScrollView>
        <View>
          {
            this.state.tags.map((tag, index) => {
              return (
                <Display key = {tag.id} 
                enable={!tag.choose && tag.show}
                enterDuration={500} 
                exitDuration={250}
                exit="fadeOutDown"
                enter="fadeInUp">
                  <View style = {[styles.tagDetail, ]} >
                    <View  style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <TouchableOpacity style={styles.backTourTag} onPress={() => this.backTag(tag.id)}>
                        <Ionicons name="md-arrow-round-back" size={35} color={"tomato"} fontWeight={"bold"}/>
                      </TouchableOpacity>
                      <Text style = {styles.bookingDayTag}>{tag.bookingDay}</Text>
                      <TouchableOpacity style={[tag.status === 'New' ? styles.deleteTourTag2 : styles.none]} onPress={() => this.showAlert(tag.id)}>
                        <Foundation name="x" size={35} color={"tomato"}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={[tag.status === 'New' ? styles.none : styles.deleteTourTag2]} onPress={() => {}}>
                        <Foundation name="x" size={35} color={"#DEE1E6"}/>
                      </TouchableOpacity>
                    </View>
                    <Text style = {styles.titleTag}>{tag.title}</Text>
                  </View>
                </Display>
              );
            })
          }
        </View>
        <AwesomeAlert
          show={this.state.showAlertDeleteTag}
          showProgress={false}
          title="Delete Tour"
          message="Do you want to delete this tour?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.removeTag(this.state.idToDeleteTag);
            this.hideAlert();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
  },
  none: {
    display: 'none',
  },
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
    width: width,
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
    width: width,
    height: height,
  },
  tagPadding: {
    height: 250,
    width: width,
    //backgroundColor: '#292929',
  },
  tag: {
    marginTop: -200,
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
    backgroundColor: '#fff',
  },
  tagDetail: {
    paddingTop: 66,
    backgroundColor: '#fff',
    height: height,
    width: width,
  },
  bookingDayTag: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 15,
  },
  deleteTourTag1: {
    marginTop: 3,
    marginRight: 5,
  },
  backTourTag: {
    marginTop: 3,
    marginLeft: 10,
  },
  deleteTourTag2: {
    marginTop: 3,
    marginRight: 10,
  },
  titleTag: {
    textAlign: 'center',
    fontSize: 25,
  },

})
