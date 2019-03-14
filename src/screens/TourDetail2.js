import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import Moment from 'moment';

import { getTourById } from '../services/api';
import { COLOR_MAIN } from '../constants/index';

class TourDetail extends Component{
  static navigationOptions = ({navigation}) => ({
    title: 'Thông tin tour',
  });

  constructor(props){
    super(props);
    this.state = {
      tour: {},
      currentTurn: {},
      dayDiff: 0,
    }
  }

  async callGetTourByIdAPI(id){
    return getTourById(id)
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              this.setState({tour: responseJson.data})
              this.setState({currentTurn: responseJson.data.tour_turns[0]});
              this.setState({dayDiff: responseJson.data.routes[responseJson.data.routes.length-1].day})
            })
            .catch((error) => {
              console.error(error);
            });
  }

  componentWillMount() {
    // const id = this.props.navigation.getParam("id");
    // this.callGetTourByIdAPI(id);
  }

  componentWillUnmount() {
    this.state = false;
  }

  render(){
    Moment.locale('en');
    const {tour, currentTurn, dayDiff} = this.state;

    return(
      <View style={{flex: 1}}>
        <ScrollView>
          <Card
            containerStyle = {{margin: 0}}
            title="{tour.name}"
            titleStyle={{alignSelf: 'flex-start', marginHorizontal: 8}}
            image={require("../assets/images/tour-card-img.jpg")}>
            <View style={{marginBottom: 8}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 0.36}}>Tour code:</Text>
                <Text style={{flex: 0.64}}>00002</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 0.36}}>Start date:</Text>
                <Text style={{flex: 0.32}}>14/03/1997</Text>
                <View style={{flexDirection: 'row', flex: 0.32}}>
                    <Icon name='calendar' type='antdesign' color={COLOR_MAIN} size={20}/>
                    <Text>Other day</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 0.36}}>Last in -25 days</Text>
                <Text style={{flex: 0.32}}>12 days left</Text>
                <Text style={{flex: 0.32}}>15 slot left</Text>
              </View>
            </View>

            <Divider style={{height: 1}}/>

            <TourPrice price={500000}/>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {{margin: 0}}
            title='GIỚI THIỆU'
            titleStyle={{alignSelf: 'flex-start', marginHorizontal: 8}}
          >
            <Text style={{marginBottom: 10}}>tourdescription</Text>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {{margin: 0}}
            title='CHƯƠNG TRÌNH TOUR'
            titleStyle={{alignSelf: 'flex-start', marginHorizontal: 8}}
          >
            <Text style={{marginBottom: 10}}>tourdetail</Text>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {{margin: 0}}
            title='GHI CHÚ'
            titleStyle={{alignSelf: 'flex-start', marginHorizontal: 8}}
          >
            <Text style={{marginBottom: 10}}>tourpolicty</Text>
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

class TourInfo extends Component{
  render(){
    return(
      <View style={{flexDirection: 'row'}}>
        <Text style={{flex: 0.4}}>{this.props.firstText}</Text>
        <Text style={{flex: 0.3}}>{this.props.secondText}</Text>
        <Text style={{flex: 0.3}}>{this.props.thirdText}</Text>
      </View>
    );
  }
}
class Info extends Component{
  remainSlot = () => {return this.props.max - this.props.current};
  render(){
    return(
      <View style={{flexDirection: 'row'}}>
        <Text style={{flex: 0.5}}>{this.props.firstText}</Text>
        {this.props.type !== "slot" && <Text style={{flex: 0.5}}>{this.props.secondText}</Text>}
        {this.props.type === "slot" && <Text style={{flex: 0.5}}>{this.remainSlot()}/{this.props.max}</Text>}
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
            suffix={' VNĐ'}
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
