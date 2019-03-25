import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Image, AsyncStorage } from 'react-native';
import {Input, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import SvgUri from 'react-native-svg-uri';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { changeProfile } from '../actions/index.js';
import { userUpdate } from '../services/api';
import { COLOR_MAIN } from '../constants/index';
import localized from '../localization/index';

class ChangeAvatar extends Component {
  static navigationOptions = {
    title: localized.changeAvatar,
  };

  constructor(props){
    super(props);
    this.state = {
      photo: null,
    }
  }

  _onButtonPress(){
    this.updateAvatar().then(()=>{
      this.props.navigation.goBack();
    })
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({ photo: response});
      }
    });
  };

  async updateAvatar(){
    const data = new FormData();
    data.append('avatar', {
       uri: this.state.photo.uri,
       type: 'image/jpeg',
       name: this.state.photo.fileName,
    });
    return userUpdate(data)
          .then((response) => {
              status = response.status;
              return response.json();
            })
           .then((responseJson) => {
              if (status != 200){
                Alert.alert(responseJson.msg);
              } else {
                this.props.changeProfile(responseJson.profile);
              }
           })
           .catch((error) => console.error(error));
  }

  render() {
    const { photo } = this.state;
    const { profile } = this.props.access;

    return (
      <View style={styles.container}>
          <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
              {!photo && !profile.avatar && (
                <Image
                  source={require('../assets/images/default_user.jpg')}
                  style={{ width: 240, height: 240 }}
                />
              )}
              {!photo && profile.avatar && (
                <Image
                  source={{ uri: profile.avatar }}
                  style={{ width: 240, height: 240 }}
                />
              )}

              {photo && (
                <Image
                  source={{ uri: photo.uri }}
                  style={{ width: 240, height: 240 }}
                />
              )}
              <View style={{margin: 10}}></View>
              <Button title={localized.choosePhoto} onPress={this.handleChoosePhoto} />
          </View>

          <Button
            title={localized.changeAvatar.toUpperCase()}
            onPress={()=>{this._onButtonPress()}}
            type="solid"
            buttonStyle={{backgroundColor: COLOR_MAIN}}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
})

function mapStateToProps(state){
  return{
    access: state.access,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changeProfile: changeProfile,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAvatar);
