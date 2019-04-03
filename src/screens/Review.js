import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Alert } from 'react-native';
import { Button, AirbnbRating } from 'react-native-elements';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { createComment } from '../services/api';
import { COLOR_MAIN,
         ERR_RATING, ERR_COMMENT } from '../constants/index';
import { } from '../services/function';
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

      err: '',
      isError: false,
    }
  }

  async callCreateComment(){
    let status;
    return createComment(this.state.idTour,this.state.comment)
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

  onFinishRating(value){
    this.setState({
      rating: value,
    })
  }

  setError(err, isError){
    this.setState({err: err, isError: isError});
  }

  checkEmpty(){
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
      this.callCreateComment().then(()=>{
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

  componentWillMount(){
    const id = this.props.navigation.getParam("id");
    this.setState({idTour: id});
  }

  render(){
    const {rating, comment} = this.state;
    return(
      <ScrollView style={styles.container}>
          <View style={styles.card}>
              <Text style={styles.label}>Rating</Text>
              <AirbnbRating
                size={36}
                showRating={false}
                defaultRating={rating}
                onFinishRating={(value)=>{this.onFinishRating(value)}}
              />

              <TextInput
                  style={styles.input}
                  multiline={true}
                  placeholder="Write your comment ..."
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
  input: {
    fontSize: 18,
    height: 40,
    paddingHorizontal: 10,
    marginTop: 20,
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

})

export default Review;