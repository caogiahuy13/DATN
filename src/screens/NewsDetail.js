import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import HTML from 'react-native-render-html';

import { COLOR_GRAY_BACKGROUND} from '../constants/index';
import { getBlogsDetail, getTagsBlog } from '../services/apiWordpress';
import localized from '../localization/index';

class NewsDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "News Detail",
  });

  constructor(props){
    super(props);
    this.state = {
      blog: '',
      tags: '',

    }
  }
  componentDidMount(){
    const id = this.props.navigation.getParam("id");
    getBlogsDetail(id).then((res)=>{
      this.setState({blog: res});
    })
    getTagsBlog(id).then((res)=>{
      console.log(res);
      this.setState({tags: res});
    })
  }

  render(){
    const {blog, tags} = this.state;

    if (blog == '' || tags == ''){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    let tagsCard = tags.map((val,key)=>{
      return(
        <Button
          key={key}
          title={val.name}
          type="outline"
          buttonStyle={{borderWidth: 1, borderColor: 'gray'}}
          containerStyle={{margin: 4}}
          titleStyle={{color: 'gray'}}
        />
      )
    })

    return(
      <ScrollView style={styles.container}>
          <HTML html={blog.content}/>
          <View>
                <Text>Tags</Text>
          </View>
          <View style={{flexDirection: 'row'}}>{tagsCard}</View>
      </ScrollView>
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
