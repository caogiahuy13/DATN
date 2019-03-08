import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Card, Button, Icon, Divider } from 'react-native-elements';

class TourDetail extends Component{
  render(){
    return(
      <View>
      <Card
        containerStyle = {{margin: 0}}
        title='HELLO WORLD'
        titleStyle={{alignSelf: 'flex-start'}}
        image={require("../assets/images/tour-card-img.jpg")}>
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
