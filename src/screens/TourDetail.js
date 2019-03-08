import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating } from 'react-native-elements';

import NumberFormat from 'react-number-format';

class TourDetail extends Component{
  static navigationOptions = ({navigation}) => ({
    title: 'Thông tin tour',
    headerStyle: {
      backgroundColor: '#324a5e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    tabBarVisible: false,
  });

  constructor(props){
    super(props);
    this.state = {
      tour: {},
    }
  }

  _getTourById(id){
    let link = 'http://10.0.3.2:5000/tour/getById/' + id;
    return fetch(link).then((response) => response.json())
                      .then((responseJson) => {
                        this.setState({tour: responseJson.data})
                      })
                      .catch((error) => {
                        console.error(error);
                      });
  }

  componentDidMount() {
    const id = this.props.navigation.getParam("id");
    this._getTourById(id);
  }

  componentWillUnmount() {
    this.state = false;
  }

  render(){
    const {tour} = this.state;

    return(
      <View style={{flex: 1}}>
        <ScrollView>
          <Card
            containerStyle = {{margin: 0}}
            title={tour.name}
            titleStyle={{alignSelf: 'flex-start', marginHorizontal: 8}}
            image={require("../assets/images/tour-card-img.jpg")}>
            <View style={{marginBottom: 8}}>
              <Info firstText="Ngày khởi hành" secondText="24/02/2019"/>
              <Info firstText="Ngày kết thúc" secondText="24/02/2019"/>
              <Info firstText="Thời gian" secondText="1 ngày"/>
              <Info firstText="Số chỗ còn lại" secondText="3/20"/>
            </View>

            <Divider style={{height: 1}}/>

            <View style={{marginVertical: 8}}>
              <TourRating/>
              <View style={{flexDirection: 'row'}}>
                <TourIcon name="star" type="font-awesome" text="100"/>
                <TourIcon name="comments" type="font-awesome" text="10"/>
              </View>
            </View>

            <Divider style={{height: 1}}/>

            <TourPrice price={tour.price}/>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {{margin: 0}}
            title='GIỚI THIỆU'
            titleStyle={{alignSelf: 'flex-start', marginHorizontal: 8}}
          >
            <Text style={{marginBottom: 10}}>{tour.description}</Text>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {{margin: 0}}
            title='CHƯƠNG TRÌNH TOUR'
            titleStyle={{alignSelf: 'flex-start', marginHorizontal: 8}}
          >
            <Text style={{marginBottom: 10}}>{tour.detail}</Text>
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
        <Text style={{color:'#C50000', fontWeight: 'bold', fontSize: 24}}>
          <NumberFormat
            value={this.props.price}
            displayType={'text'}
            thousandSeparator={true}
            suffix={' đ'}
            renderText={value => <Text>{value}</Text>}
          />
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default TourDetail;
