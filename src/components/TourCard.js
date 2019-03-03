import React, { Component } from 'react';
import {Text, Button, View, Alert, Image, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const cardImage = require("../assets/images/tour-card-img.jpg");
const deviceWidth = Dimensions.get("window").width;

export default class TourCard extends Component{
  render(){
    return(
      <View style={styles.container}>
          <View style={{margin: 5}}>
              {/*Tên tour*/}
              <View style={{marginBottom: 2}}>
                  <Text style={styles.text}>Tour tham quan Sài Gòn (nửa ngày)</Text>
              </View>

              {/*Ảnh tour*/}
              <Image style={styles.image} source={cardImage}/>

              {/*Icon comment, rating, chỗ*/}
              <View style={{flexDirection: 'row', padding: 5, marginVertical: 2}}>
                  <View style={{flex: 0.8, flexDirection: 'row'}}>
                    <CardIcon name="comments" size={20} text="100"/>
                    <CardIcon name="star" size={20} text="5"/>
                  </View>
                  <View style={{alignItems: 'flex-end', flex: 0.2}}>
                    <CardIcon name="user" size={20} text="10 chỗ"/>
                  </View>
              </View>

              {/*Bottom line*/}
              <View style={styles.bottomLine}></View>

              {/*Ngày, giá, nút xem chi tiết*/}
              <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.25, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 18, color: 'rgb(178,34,34)', fontWeight: 'bold'}}>1</Text>
                      <Text style={{fontSize: 8, color: 'rgb(178,34,34)'}}>NGÀY</Text>
                  </View>
                  <View style={{borderRightColor: 'black', borderRightWidth: 0.3, opacity: 0.3, marginVertical: 4,}}></View>
                  <View style={{flex: 0.55, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 18, color: 'rgb(178,34,34)', fontWeight: 'bold'}}>200,000 VNĐ</Text>
                  </View>
                  <View style={{flex: 0.2}}>
                      <Button
                        title="DETAIL"
                        color="#324a5e"
                      />
                  </View>
              </View>
          </View>
      </View>
    );
  }
}

class CardIcon extends Component{
  render(){
    return(
      <View style={{marginRight: 5, flexDirection: 'row'}}>
          <Icon name={this.props.name} size={this.props.size}/>
          <Text style={{marginHorizontal: 5}}>{this.props.text}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius:5,
        elevation: 5,
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      padding: 6,
      color: 'black',
    },
    image: {
      alignSelf: "center",
      height: 150,
      resizeMode: "cover",
      width: deviceWidth / 1.1,
    },
    bottomLine: {
      borderBottomColor: 'black',
      borderBottomWidth: 0.3,
      opacity: 0.3,
    },
    tourDays: {

    }
})
