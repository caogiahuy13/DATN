import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {Input, Text, Button} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { } from '../actions/index.js';
import { } from '../services/api';
import { COLOR_MAIN } from '../constants/index';

class ChangeAvatar extends Component {
  static navigationOptions = {
    title: 'Change Avatar',
  };

  constructor(props){
    super(props);
    this.state = {

    }
  }

  // Hàm gọi khi nhán nút thay đổi mật khẩu
  _onButtonPress(){
    // let validate = this.checkUser();
    // if (validate){
    //   this.callUpdatePasswordAPI().then(()=>{
    //     if (this.state.isError == false){
    //       Alert.alert(SUCCESS_CHANGE_PASSWORD);
    //       this.props.navigation.goBack();
    //     }
    //   });
    // }
  }

  render() {
    return (
      <View style={styles.container}>

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
        paddingHorizontal: 8,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
})

function mapStateToProps(state){
  return{
    access: state.access,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAvatar);
