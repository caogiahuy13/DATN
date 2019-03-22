import React, { Component } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';

import { COLOR_GREEN } from '../constants/index';
import { ERR_NAME, ERR_EMAIL, ERR_MESSAGE, ERR_EMAIL_VALIDATE } from '../constants/index';
import { createRequest } from '../services/api';
import { validateEmail } from '../services/function';

class Contact extends Component {
  static navigationOptions = {
    title: 'Contact',
  };

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
    }
  }

  // Thay đổi state của error
  setError(err, isError){
    this.setState({err: err, isError: isError});
  }

  // Kiểm tra thông tin
  checkUser(){
    if (this.state.name == ''){
      this.setError(ERR_NAME, true);
      return false;
    }
    if (this.state.email == ''){
      this.setError(ERR_EMAIL, true);
      return false;
    }
    if (!validateEmail(this.state.email)){
      this.setError(ERR_EMAIL_VALIDATE, true);
      return false;
    }
    if (this.state.message == ''){
      this.setError(ERR_MESSAGE, true);
      return false;
    }
    this.setError('', false);
    return true;
  }

  // Gọi create request API
  async callCreateRequest(){
    let status;
    return createRequest(this.state.name, this.state.email, this.state.message)
          .then((response) => {
              status = response.status;
              return response.json();
            })
          .then((responseJson) => {
            if (status == 400){
              this.setError(responseJson.msg,true);
            } else {
              this.setError('',false);
            }
          })
          .catch((error) => {
            console.error(error);
          });
  }

  sendPress(){
    let validate = this.checkUser();
    if (validate){
      this.callCreateRequest().then(()=>{
          if (this.state.isError == false){
            Alert.alert(
              'Congratulations',
              'You message has been sent to our email!',
              [
                {text: 'OK', onPress: () => {}},
              ],
              {cancelable: false},
            );
          }
      })
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style = {styles.card}
        >
          <View style={{height: 300, marginBottom: 10}}>
              <MapView style={styles.map}
                  showsUserLocation = {true}
                  initialRegion={{
                    latitude: 10.7720248,
                    longitude: 106.6754241,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
              >
                  <Marker coordinate={{latitude: 10.7720248, longitude: 106.6754241 }} />
              </MapView>
          </View>

          <Text>Address: 162 Ba Tháng Hai, Phường 12, Quận 10</Text>
          <Text>City: Hồ Chí Minh - Việt Nam</Text>
          <Info firstText="Phone:" secondText="0963186896"/>
          <Info firstText="Email:" secondText="traveltour@gmail.com"/>
          <Info firstText="Opening:" secondText="9:00 AM"/>
          <Info firstText="Closing:" secondText="18:00 PM"/>

          <Space/>
          <Space/>

          <View>
            <Text style={{fontWeight: 'bold'}}>DROP US A LINE</Text>
            <Text>
                Hãy liên hệ với chúng tôi để được tư vấn, giải đáp thắc mắc và đạt được những gì bạn mong đợi về một kì nghỉ mơ ước.
            </Text>
          </View>

          <Space/>

          <View>
            <Text style={{fontWeight: 'bold'}}>LIÊN HỆ TRỰC TIẾP</Text>
            <Text>
                Nếu bạn có vấn đề cần được giải đáp hãy liên hệ trực tiếp với chúng tôi, vui lòng xem thông tin bên dưới:
            </Text>
          </View>

          <Space/>

          <View>
            <Text style={{fontWeight: 'bold'}}>LIÊN HỆ QUA HỆ THỐNG WEBSITE</Text>
            <Text>
                Chúng tôi luôn đón nhận mọi sự góp ý, những vấn đề của quý khách cần được giải đáp.
            </Text>
            <Text>
                Vui lòng sử dụng diễn đàn để đặt câu hỏi khi quý khách có vấn đề không giải quyết được. Đội ngũ nhân viên của chúng tôi sẽ giải đáp vấn đề của quý khách một cách nhanh chóng.
            </Text>
            <Text>
                Để thực hiện việc liên hệ các bạn vui lòng điền vào theo form bên dưới
            </Text>
          </View>

          <Space/>

          <Text style={styles.inputText}>Name:</Text>
          <TextInput
              style={styles.input}
              autoCorrect={false}
              returnKeyType='next'
              autoCorrect={false}
              onChangeText={(value)=> this.setState({name: value})}
          />
          <Text style={styles.inputText}>Email:</Text>
          <TextInput
              style={styles.input}
              autoCorrect={false}
              returnKeyType='next'
              keyboardType='email-address'
              autoCorrect={false}
              onChangeText={(value)=> this.setState({email: value})}
          />
          <Text style={styles.inputText}>Message:</Text>
          <TextInput
              style={styles.input}
              autoCorrect={false}
              keyboardType='email-address'
              autoCorrect={false}
              onChangeText={(value)=> this.setState({message: value})}
          />

          { this.state.isError && <Text style={styles.errorText}>{this.state.err}</Text> }

          <TouchableOpacity style={styles.buttonLogin} onPress={() => {this.sendPress()}}>
               <Text style={styles.buttonText}>SEND NOW</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );
  }
}

class Space extends Component {
  render(){
    return(
      <View style={{margin: 6}}></View>
    )
  }
}

class Info extends Component {
  render(){
    return(
      <View style={{flexDirection: 'row'}}>
        <Text style={{flex: 0.4}}>{this.props.firstText}</Text>
        <Text style={{flex: 0.6}}>{this.props.secondText}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
      margin: 0,
      padding: 12,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    inputText:
    {
        fontSize: 14,
        marginTop: 10,
    },
    input: {
        fontSize: 14,
        height: 40,
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        color: 'gray',
    },
    buttonLogin: {
        backgroundColor: COLOR_GREEN,
        paddingVertical: 10,
        marginTop: 20,
    },
    buttonText: {
        textAlign: 'center',
        color :'#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: 10,
    },
})

export default Contact;
