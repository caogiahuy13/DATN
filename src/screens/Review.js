import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Alert, AsyncStorage } from 'react-native';
import { Button, AirbnbRating } from 'react-native-elements';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { createReviewNotLogedIn, createReviewLogedIn } from '../services/api';
import { COLOR_MAIN, COLOR_PLACEHOLDER,
         ERR_RATING, ERR_COMMENT } from '../constants/index';
import { validateEmail } from '../services/function';
import localized from '../localization/index';

class Review extends Component {
  static navigationOptions = {
    title: localized.review,
  };

  constructor(props){
    super(props);
    this.state = {
      rating: 0,
      comment: '',
      idTour: null,
      name: '',
      email: '',

      err: '',
      isError: false,
      isLogedIn: false,
    }
  }

  async callCreateReviewLogedIn(){
    let status;
    let data = {
      rate: this.state.rating,
      comment: this.state.comment,
      idTour: this.state.idTour,
    }
    if (this.state.isLogedIn){
      return createReviewLogedIn(data)
            .then((response) => {
                status = response.status;
                return response.json();
              })
            .then((responseJson) => {
              if (status != 200){
                this.setError(responseJson.msg,true);
              } else if (status == 200){
                this.setError('',false);
              }
            })
            .catch((error) => console.error(error));
    } else {
      data["name"] = this.state.name;
      data["email"] = this.state.email;
      return createReviewNotLogedIn(data)
            .then((response) => {
                status = response.status;
                return response.json();
              })
            .then((responseJson) => {
              if (status != 200){
                this.setError(responseJson.msg,true);
              } else if (status == 200){
                this.setError('',false);
              }
            })
            .catch((error) => console.error(error));
    }
  }

  onFinishRating(value){
    this.setState({
      rating: value,
    })
  }

  setError(err, isError){
    this.setState({err: err, isError: isError});
  }

  checkEmpty(){
    if (!this.state.isLogedIn){
      if (this.state.name == ''){
        this.setError(localized.ERR_NAME, true);
        return false;
      }
      if (this.state.email == ''){
        this.setError(localized.ERR_EMAIL, true);
        return false;
      }
      if (!validateEmail(this.state.email)){
        this.setError(localized.ERR_EMAIL_VALIDATE, true);
        return false;
      }
    }
    if (this.state.rating == 0){
      this.setError(localized.ERR_RATING, true);
      return false;
    }
    if (this.state.comment == ''){
      this.setError(localized.ERR_COMMENT, true);
      return false;
    }
    this.setError('', false);
    return true;
  }

  onSendPress(){
    let validate = this.checkEmpty();
    if (validate){
      this.callCreateReviewLogedIn()
          .then(()=>{
            if (this.state.isError == false){
              Alert.alert(
                localized.congratulation,
                localized.reviewSuccess,
                [
                  {text: localized.ok, onPress: () => this.props.navigation.goBack()},
                ],
                {cancelable: false},
              );
            }
          })
    }
  }

  // Kiểm tra đã đăng nhập
  async CheckLogedIn(){
    await AsyncStorage.getItem('userToken')
                      .then((data)=>{
                        if (data != null){
                          this.setState({isLogedIn: true})
                        }
                      });
  }

  componentWillMount(){
    const id = this.props.navigation.getParam("id");
    this.setState({idTour: id});
    this.CheckLogedIn();
  }

  render(){
    const {rating, comment, isLogedIn} = this.state;

    return(
      <ScrollView style={styles.container}>
          <View style={styles.card}>
              { !isLogedIn &&
                <View>
                    <Text style={styles.inputText}>{localized.name} *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        placeholderTextColor={COLOR_PLACEHOLDER}
                        returnKeyType='next'
                        autoCorrect={false}
                        onChangeText={(value)=> this.setState({name: value})}
                    />

                    <Text style={styles.inputText}>{localized.email} *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        placeholderTextColor={COLOR_PLACEHOLDER}
                        returnKeyType='next'
                        autoCorrect={false}
                        keyboardType='email-address'
                        onChangeText={(value)=> this.setState({email: value})}
                    />
                </View>
              }

              <Text style={styles.inputText}>{localized.rating}</Text>
              <View style={{alignItems: 'flex-start'}}>
                  <AirbnbRating
                    size={36}
                    showRating={false}
                    defaultRating={rating}
                    onFinishRating={(value)=>{this.onFinishRating(value)}}
                  />
              </View>

              <Text style={styles.inputText}>{localized.comment}</Text>
              <TextInput
                  style={styles.inputMultiline}
                  multiline={true}
                  placeholder={localized.writeComment + " ..."}
                  placeholderTextColor='rgba(0,0,0,0.2)'
                  autoCorrect={false}
                  onChangeText={(value)=> this.setState({comment: value})}
                  value={comment}
              />
          </View>

          { this.state.isError && <Text style={styles.errorText}>{this.state.err}</Text> }

          <Button
            title={localized.send.toUpperCase()}
            type="solid"
            buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
            containerStyle={{paddingHorizontal: 16, paddingVertical: 20, borderRadius: 0}}
            titleStyle={{fontSize: 16}}
            onPress={()=>{this.onSendPress()}}
          />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F4',
  },
  card: {
    backgroundColor: 'white',
    padding: 14,
  },
  inputMultiline: {
    fontSize: 18,
    height: 40,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 6,
    marginHorizontal: 4,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    color: 'gray',
    minHeight: 200,
    height: 'auto',
  },
  label: {
    fontSize: 18,
    alignSelf: 'center',
    padding: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    padding: 16,
  },
  input: {
    fontSize: 16,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderColor: 'rgba(0,0,0,0.05)',
    color: 'gray',
    marginBottom: 10,
    padding: 10,
  },
  inputText:
  {
    fontSize: 18,
    paddingVertical: 6,
  },

})

export default Review;
