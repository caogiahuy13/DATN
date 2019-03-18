import React, { Component } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';

import { COLOR_GREEN } from '../constants/index';

class Contact extends Component {
  static navigationOptions = {
    title: 'Contact',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card
          containerStyle = {styles.card}
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
          <TextInput style={styles.input} autoCorrect={false}/>
          <Text style={styles.inputText}>Email:</Text>
          <TextInput style={styles.input} autoCorrect={false}/>
          <Text style={styles.inputText}>Message:</Text>
          <TextInput style={styles.input} autoCorrect={false}/>

          <TouchableOpacity style={styles.buttonLogin} onPress={() => {}}>
               <Text style={styles.buttonText}>SEND NOW</Text>
          </TouchableOpacity>

        </Card>
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
})

export default Contact;
