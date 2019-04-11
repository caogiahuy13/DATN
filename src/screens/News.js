import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { COLOR_GRAY_BACKGROUND } from '../constants/index';
import { getBlogs } from '../services/apiWordpress';

import NewsCard from '../components/NewsCard';

class News extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      nextPage: 1,
      news: [],
      isFirstLoad: false,
      keyword: ''
    }
  }

  onLoadMore(){
    this.setState({isLoading: true});
    getBlogs(this.state.nextPage, 3).then((res) => {
      this.setState({
        news: [...this.state.news, ...res.data],
        nextPage: res.nextPage,
        isLoading: false,
      })
    })
  }

  componentDidMount() {
    this.setState({isFirstLoad: true});
    getBlogs(this.state.nextPage, 3).then((res) => {
      this.setState({
        news: [...this.state.news, ...res.data],
        nextPage: res.nextPage,
        isFirstLoad: false,
      })
    })
  }

  render(){
    let news = this.state.news.map((val,key)=>{
      return(
        <View key={key}>
            <NewsCard data={val}/>
            <View style={{height: 16}}></View>
        </View>
      )
    })
    return(
      <ScrollView style={styles.container}>
          {news}
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

export default News;
