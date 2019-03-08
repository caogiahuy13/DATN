import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating } from 'react-native-elements';

class TourDetail extends Component{
  render(){
    return(
      <View>
      <Card
        containerStyle = {{margin: 0}}
        title='Tour tham quan Sài Gòn (nửa ngày)'
        titleStyle={{alignSelf: 'flex-start', marginHorizontal: 8}}
        image={require("../assets/images/tour-card-img.jpg")}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 0.5}}>Ngày khởi hành:</Text>
          <Text style={{flex: 0.5}}>24/02/2019</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 0.5}}>Ngày kết thúc:</Text>
          <Text style={{flex: 0.5}}>24/02/2019</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 0.5}}>Thời gian:</Text>
          <Text style={{flex: 0.5}}>1 ngày</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 0.5}}>Số chỗ còn lại:</Text>
          <Text style={{flex: 0.5}}>3/20</Text>
        </View>
        <Divider/>
        <View style={{flexDirection: 'row'}}>
          <Rating
            imageSize={20}
            readonly
            startingValue={4.5}
          />
          <Text style={{marginLeft: 5}}>4.5/5 trong 10 đánh giá</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', marginRight: 10}}>
            <Icon
              name='star'
              type='font-awesome'
              size={20}
              color='gray'
              containerStyle={{marginRight: 5}}
            />
            <Text>1000</Text>
          </View>
          <View style={{flexDirection: 'row', marginRight: 10}}>
            <Icon
              name='comments'
              type='font-awesome'
              size={20}
              color='gray'
              containerStyle={{marginRight: 5}}
            />
            <Text>10</Text>
          </View>
        </View>
        <Divider/>
        <View>
          <Text style={{color: 'rgb(178,34,34)', fontWeight: 'bold', fontSize: 24}}>200,000 đ</Text>
        </View>
      </Card>

      <Divider style={{ backgroundColor: 'blue' }} />
      <Card
        containerStyle = {{margin: 0}}
        title='HELLO WORLD'
        image={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'}}>
        <Text style={{marginBottom: 10}}>
          The idea with React Native Elements is more about component structure than actual design.
        </Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW'
        />
      </Card>
      </View>
    );
  }
}


const styles = StyleSheet.create({

})

export default TourDetail;
