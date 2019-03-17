import React, { Component } from 'react';
import { View, Text, StyleSheet,
        Animated, Dimensions, 
        Easing, PanResponder, 
        ScrollView, TouchableOpacity, 
        TouchableHighlight, Image, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Display from 'react-native-display';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class History extends Component {
  constructor() {
    super();
    this.state = { 
      showAlertDeleteTag: false,
      idToDeleteTag: '0',
      hiddenFeature: false,
      tags: [
        {'choose': 'false', 'show': 'true', 'id': '1', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '1', 'totalMoney': '2.179.000 VND', 'status': 'Old',  'title': 'Sai Gon'},
        {'choose': 'false', 'show': 'true', 'id': '2', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '12', 'totalMoney': '2.179.000 VND', 'status': 'Old',  'title': 'Ha Noi'},
        {'choose': 'false', 'show': 'true', 'id': '3', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '6', 'totalMoney': '2.179.000 VND', 'status': 'Old',  'title': 'Vung Tau'},
        {'choose': 'false', 'show': 'true', 'id': '4', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '1', 'totalMoney': '2.179.000 VND', 'status': 'Old',  'title': 'Sai Gon'},
        {'choose': 'false', 'show': 'true', 'id': '5', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '12', 'totalMoney': '2.179.000 VND', 'status': 'Old',  'title': 'Ha Noi'},
        {'choose': 'false', 'show': 'true', 'id': '6', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '6', 'totalMoney': '2.179.000 VND', 'status': 'Old',  'title': 'Vung Tau'},
        {'choose': 'false', 'show': 'true', 'id': '7', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '11', 'totalMoney': '2.179.000 VND', 'status': 'New',  'title': 'Da Nang'},
        {'choose': 'false', 'show': 'true', 'id': '8', 'code': '0009522', 'bookingDay': '08/03/2019 10:04', 'totalSlot': '1', 'totalMoney': '2.179.000 VND', 'status': 'New',  'title': 'Vinh Ha Long'},
      ], 
      tableHeadCheckout: ['', 'Price', 'Count'],
      tableTitleCheckout: ['Adult', 'Children', 'Total'],
      tableDataCheckout: [
        ['2.179.000', '1'],
        ['1.089.500', '0'],
        ['2.179.000', '']
      ],
      infoContacts: [
        {'id': '1', 'fullName': 'Thomas Wilson', 'phoneNumber': '(+555) 555 555', 'email': 'thomaswilson@gmail.com'},
        {'id': '2', 'fullName': 'William King', 'phoneNumber': '(+555) 555 555', 'email': 'williamking@gmail.com'},
        {'id': '3', 'fullName': 'Captain Marvel', 'phoneNumber': '(+555) 555 555', 'email': 'captainmarvel@gmail.com'},
        {'id': '4', 'fullName': 'Noh Varr', 'phoneNumber': '(+555) 555 555', 'email': 'nohvarr@gmail.com'},
        {'id': '5', 'fullName': 'ABC XYZ', 'phoneNumber': '(+555) 555 555', 'email': 'abcxyz@gmail.com'},
      ], 
      tableHeadPassenger: ['ID', 'Full Name', 'Phone Number', 'Birthdate', 'Gender', 'Address', 'Identity Card/ Passport'],
      widthArrPassenger: [40, 180, 120, 100, 70, 200, 100],
    };
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
    const tableDataPassenger = [];
    for (let i = 1; i <= 10; i += 1) {
      const rowDataPassenger = [];
      rowDataPassenger.push(`${i}`);
      rowDataPassenger.push(`Thomas Wilson`);
      rowDataPassenger.push(`(+555) 555 555`);
      rowDataPassenger.push(`07/11/1997`);
      rowDataPassenger.push(`Male`);
      rowDataPassenger.push(`123 ABC XYZ Street, P.6, Q.10, TP Ho Chi Minh.`);
      rowDataPassenger.push(`123456789`);
      /*
      for (let j = 1; j < 7; j += 1) {
        rowDataPassenger.push(`${i}${j}`);
      }
      */
      tableDataPassenger.push(rowDataPassenger);
    }
    return (
      <View style={styles.container}>
        <View style={styles.titleStack}>
          <Text style={styles.textTitle}> HISTORY </Text>
        </View>
        <Text style={styles.titleNotice}> Click to see details. </Text>

        <ScrollView style={styles.tagsContainer} ref="scrollView"
             onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}>
          <View style={[this.state.hiddenFeature ? styles.tagPadding : styles.tagPadding_HiddenFeature]}></View>
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
                      <Text style = {styles.bookingDayTag1}>
                        {tag.bookingDay}
                        <Text style={{fontSize: 12, color: 'tomato'}}>{"\n"}{tag.code}</Text>
                      </Text>
                      <View style={[tag.status === 'New' ? styles.flex : styles.none ]}>
                        <MaterialCommunityIcons name="new-box" size={40} color={"tomato"}/>
                      </View>
                      <TouchableOpacity style={[tag.status === 'New' ? styles.deleteTourTag1 : styles.none]} onPress={() => this.showAlert(tag.id)}>
                        <Foundation name="x" size={35} color={"tomato"}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={[tag.status === 'New' ? styles.none : styles.deleteTourTag1]} onPress={() => {}}>
                        <Foundation name="x" size={35} color={"#31495D"}/>
                      </TouchableOpacity>
                    </View>
                    <Text style = {styles.titleTag}>{tag.title}</Text>
                    <View style={styles.infoTag}>
                      <Text style={{fontSize: 20, }}><MaterialCommunityIcons name="human-male" size={25}/>{tag.totalSlot}</Text>
                      <Text style={{fontSize: 20, }}>{tag.totalMoney} <MaterialCommunityIcons name="credit-card" size={25}/></Text>
                    </View>
                    {/* <Image source={{uri: './../assets/images/logo.png'}} style={{resizeMode: 'contain', width: '100%', height: '66%', backgroundColor: '#292929'}} /> */}
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
                        <Ionicons name="md-arrow-round-back" size={45} color={"tomato"} fontWeight={"bold"}/>
                      </TouchableOpacity>
                      <Text style = {styles.bookingDayTag2}>
                        {tag.bookingDay}
                        <Text style={{fontSize: 12, color: 'tomato'}}>{"\n"}{tag.code}</Text>
                      </Text>
                      <TouchableOpacity style={[tag.status === 'New' ? styles.deleteTourTag2 : styles.none]} onPress={() => this.showAlert(tag.id)}>
                        <Foundation name="x" size={45} color={"tomato"}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={[tag.status === 'New' ? styles.none : styles.deleteTourTag2]} onPress={() => {}}>
                        <Foundation name="x" size={45} color={"#DEE1E6"}/>
                      </TouchableOpacity>
                    </View>
                    <Text style = {styles.titleTag}>{tag.title}</Text>
        {/* Checkout Information:  */}
                    <Text style = {styles.titleTagDetail}>Checkout Information: </Text>
                    <Table style = {styles.tableCheckout}>
                      <Row data={this.state.tableHeadCheckout} flexArr={[1, 2, 1]} style={styles.headCheckout} textStyle={styles.textHeadCheckout}/>
                      <TableWrapper style={styles.wrapperCheckout}>
                        <Col data={this.state.tableTitleCheckout} heightArr={[28,28]} style={styles.titleCheckout} textStyle={styles.textTitleCheckout}/>
                        <Rows data={this.state.tableDataCheckout} flexArr={[2, 1]} style={styles.rowCheckout} textStyle={styles.textDataCheckout}/>
                      </TableWrapper>
                    </Table>
        {/* Contact Information:  */}
                    <Text style = {styles.titleTagDetail}>Contact Information: </Text>
                    <Text style = {styles.tableTitleContact}>Full Name: {"           "}
                      <Text style = {styles.tableDataContact}>
                        {this.state.infoContacts[tag.id-1].fullName}
                      </Text>
                    </Text>
                    <Text style = {styles.tableTitleContact}>Phone number: {"  "}
                      <Text style = {styles.tableDataContact}>
                        {this.state.infoContacts[tag.id-1].phoneNumber}
                      </Text>
                    </Text>
                    <Text style = {styles.tableTitleContact}>Email: {"                   "}
                      <Text style = {styles.tableDataContact}>
                        {this.state.infoContacts[tag.id-1].email}
                      </Text>
                    </Text>
        {/* Passenger Information:  */}
                    <Text style = {styles.titleTagDetail}>Passenger Information: </Text>
                    <View style={styles.tablePassenger}>
                      <ScrollView horizontal={true}>
                        <View>
                          <Table borderStyle={{borderColor: '#C1C0B9'}}>
                            <Row data={this.state.tableHeadPassenger} widthArr={this.state.widthArrPassenger} style={styles.headerPassenger} textStyle={styles.textPassenger}/>
                          </Table>
                          <ScrollView style={styles.dataWrapperPassenger}>
                            <Table borderStyle={{borderColor: '#C1C0B9'}}>
                              {
                                tableDataPassenger.map((rowDataPassenger, index) => (
                                  <Row
                                    key={index}
                                    data={rowDataPassenger}
                                    widthArr={this.state.widthArrPassenger}
                                    style={[styles.rowPassenger, index%2 && {backgroundColor: '#F7F6E7'}]}
                                    textStyle={styles.textPassenger}
                                  />
                                ))
                              }
                            </Table>
                          </ScrollView>
                        </View>
                      </ScrollView>
                    </View>
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
  flex: { display: 'flex', },
  none: { display: 'none', },
  container: { flex: 1, alignItems: 'center', backgroundColor: '#F4F5F4', },
  titleStack: {
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
  infoTag: {
    width: '100%', 
    height: 30, 
    backgroundColor: '#fff', 
    paddingHorizontal: 20,
    display: 'flex', 
    flexDirection:'row', 
    justifyContent:'space-between',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    borderRadius: 5,
  },
  tagsContainer: {
    position: 'absolute',
    zIndex: 0,
    //backgroundColor: '#292929',
    width: width,
    height: '100%',
  },
  tagPadding: {
    height: 285,
    width: width,
    //backgroundColor: '#292929',
  },
  tag: {
    margin: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    borderRadius: 5,
    elevation: 5,
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
  bookingDayTag1: { marginLeft: 10, marginTop: 4, fontSize: 15, },
  bookingDayTag2: { fontSize: 18, marginTop: 4, textAlign: 'center', },
  deleteTourTag1: { marginTop: 3, marginRight: 5, },
  deleteTourTag2: { marginTop: 1, marginRight: 15, },
  backTourTag: { marginTop: 1, marginLeft: 15, },
  titleTag: { textAlign: 'center', fontSize: 25, fontWeight: 'bold'},
  titleTagDetail: { marginLeft: 10, fontSize: 20, },
  // Table
  tableCheckout: { marginHorizontal: 10, marginTop: 5, },
  headCheckout: { height: 40,  backgroundColor: '#f1f8ff'  },
  wrapperCheckout: { flexDirection: 'row', },
  titleCheckout: { flex: 1, backgroundColor: '#f6f8fa' },
  rowCheckout: {  height: 28  },
  textHeadCheckout: { textAlign: 'center',  fontSize: 15, fontWeight: 'bold' },
  textTitleCheckout: { textAlign: 'left', paddingLeft: 10, fontSize: 15, fontWeight: 'bold' },
  textDataCheckout: { textAlign: 'center',  fontSize: 15, },
  //
  tableTitleContact: { textAlign: 'left', paddingLeft: 10, fontSize: 15, fontWeight: 'bold' },
  tableDataContact: { fontWeight: 'normal' },
  //
  tablePassenger: { marginHorizontal: 10, marginTop: 5, backgroundColor: '#fff', height: '37%', },
  headerPassenger: { height: 50, backgroundColor: '#537791' },
  textPassenger: { textAlign: 'center', fontWeight: '100' },
  dataWrapperPassenger: { marginTop: -1 },
  rowPassenger: { height: 40, backgroundColor: '#E7E6E1' },
  // Hidden feature
  container_HiddenFeature: { flex: 1, alignItems: 'center', backgroundColor: '#292929', },
  tagPadding_HiddenFeature: {
    height: 100,
    width: width,
    //backgroundColor: '#292929',
  },
  tag_HiddenFeature: {
    marginTop: -190,
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
  infoTag_HiddenFeature: {
    width: '100%', 
    height: 30, 
    backgroundColor: '#cfcfcf', 
    marginTop: 5,
    display: 'flex', 
    flexDirection:'row', 
    justifyContent:'space-between',
  },
})
