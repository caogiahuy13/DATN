import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { COLOR_GRAY_BACKGROUND} from '../constants/index';
import { getBlogsDetail } from '../services/apiWordpress';
import localized from '../localization/index';

class NewsDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "News Detail",
  });

  componentDidMount(){
    const id = this.props.navigation.getParam("id");
    getBlogsDetail(id).then((res)=>{
      console.log(res);
    })
  }

  render(){
    return(
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_GRAY_BACKGROUND,
    padding: 12,
  },
})

export default NewsDetail;
