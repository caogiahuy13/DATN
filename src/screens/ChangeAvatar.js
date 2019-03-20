import React, { Component } from 'react';
import { View, StyleSheet, Alert, Image, AsyncStorage } from 'react-native';
import {Input, Text, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { changeProfile } from '../actions/index.js';
import { userUpdate } from '../services/api';
import { COLOR_MAIN } from '../constants/index';

class ChangeAvatar extends Component {
  static navigationOptions = {
    title: 'Change Avatar',
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

    return (
      <View style={styles.container}>

            <Image
              source={require('../assets/images/svg/upload-photo.svg')}
              style={{ width: 300, height: 300 }}
            />

          {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
          )}
          <Button title="Choose Photo" onPress={this.handleChoosePhoto} />

          <Button
            title="CHANGE PASSWORD"
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
        padding: 10,
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
