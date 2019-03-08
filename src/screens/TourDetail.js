import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating } from 'react-native-elements';

class TourDetail extends Component{
  render(){
    return(
      <View style={{flex: 1}}>
        <ScrollView>
          <Card
            containerStyle = {{margin: 0}}
            title='Tour tham quan Sài Gòn (nửa ngày)'
            titleStyle={{alignSelf: 'flex-start', marginHorizontal: 8}}
            image={require("../assets/images/tour-card-img.jpg")}>
            <View style={{marginBottom: 8}}>
              <Info firstText="Ngày khởi hành" secondText="24/02/2019"/>
              <Info firstText="Ngày kết thúc" secondText="24/02/2019"/>
              <Info firstText="Thời gian" secondText="1 ngày"/>
              <Info firstText="Số chỗ còn lại" secondText="3/20"/>
            </View>

            <Divider/>

            <View style={{marginVertical: 8}}>
              <TourRating/>
              <View style={{flexDirection: 'row'}}>
                <TourIcon name="star" type="font-awesome" text="100"/>
                <TourIcon name="comments" type="font-awesome" text="10"/>
              </View>
            </View>

            <Divider/>
            <Divider/>

            <TourPrice/>
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
        </ScrollView>
        <Button
          buttonStyle={{backgroundColor: '#C50000', borderRadius: 0}}
          title='ĐẶT TOUR'
          onPress={()=>{}}
        />
      </View>
    );
  }
}

class Info extends Component{
  render(){
    return(
      <View style={{flexDirection: 'row'}}>
        <Text style={{flex: 0.5}}>{this.props.firstText}</Text>
        <Text style={{flex: 0.5}}>{this.props.secondText}</Text>
      </View>
    );
  }
}
class TourRating extends Component {
  render(){
    return(
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <Rating
          imageSize={20}
          readonly
          startingValue={4.5}
          style={{marginRight: 10}}
        />
        <Text>4.5/5 trong 10 đánh giá</Text>
      </View>
    )
  }
}
class TourIcon extends Component {
  render(){
    return(
      <View style={{flexDirection: 'row', marginRight: 10}}>
        <Icon
          name={this.props.name}
          type={this.props.type}
          size={20}
          color='gray'
          containerStyle={{marginRight: 5}}
        />
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}
class TourPrice extends Component {
  render(){
    return(
      <View style={{marginVertical: 8, alignItems: 'center'}}>
        <Text style={{color:'#C50000', fontWeight: 'bold', fontSize: 24}}>200,000 đ</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default TourDetail;
