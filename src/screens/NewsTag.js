import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { COLOR_GRAY_BACKGROUND, COLOR_MAIN } from '../constants/index';
import { getBlogs } from '../services/apiWordpress';
import localized from '../localization/index';

import NewsCard from '../components/NewsCard';

class NewsTag extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: localized.newsWithTag + navigation.getParam("tagName"),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      nextPage: 1,
      news: [],
      isFirstLoad: false,
      tags: '',
    }
  }

  callGetBlogs(){
    let params = {
      tags: this.state.tags
    }
    getBlogs(this.state.nextPage, 3, params).then((res) => {
      this.setState({
        news: [...this.state.news, ...res.data],
        nextPage: res.nextPage,
        isLoading: false,
      })
    })
  }

  onLoadMore(){
    this.setState({isLoading: true});
    this.callGetBlogs();
  }

  onDetailPress = (id) => {
    this.props.navigation.navigate({
      routeName: 'NewsDetail',
  		params: {
  			id: id
  		},
  		key: Math.random () * 10000,
    });
  }

  componentDidMount() {
    const tag = this.props.navigation.getParam("tag");
    this.setState({
      isFirstLoad: true,
      tags: tag,
    },()=>{
      this.callGetBlogs();
    });
  }

  render(){
    const {isLoading, news, nextPage} = this.state;

    if (news.length == 0){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    let index = 0;
    let newsCard = this.state.news.map((val,key)=>{
      index += 1;
      return(
        <View key={key}>
            <NewsCard data={val} onPress={this.onDetailPress}/>
            { index != news.length &&
              <View style={{height: 16}}></View>
            }
        </View>
      )
    })

    return(
      <ScrollView style={styles.container}>
          <View>
              {newsCard}
          </View>

          { isLoading && !!nextPage &&
            <View style={{alignItems: 'center', padding: 16}}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../assets/images/svg/Rolling-1.9s-106px.gif')} />
            </View>
          }

          { news.length > 0 && !!nextPage &&
            <Button
              title={localized.showMore.toUpperCase()}
              type="solid"
              buttonStyle={{backgroundColor: COLOR_MAIN, borderRadius: 0}}
              containerStyle={{padding: 16, borderRadius: 0}}
              titleStyle={{fontSize: 16}}
              onPress={()=>{this.onLoadMore()}}
            />
          }

          <View style={{height: 12}}></View>
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

export default NewsTag;
