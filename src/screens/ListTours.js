import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { COLOR_GRAY_BACKGROUND, COLOR_MAIN } from '../constants/index';
import { getBlogs } from '../services/apiWordpress';
import localized from '../localization/index';

import NewsCard from '../components/NewsCard';

class ListTours extends Component {
  static navigationOptions = ({navigation}) => ({
    title: "LIST TOURS",
  });

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      nextPage: 1,
      news: [],
      isFirstLoad: false,
      keyword: '',
    }
  }

  callGetBlogs(){
    const {keyword, nextPage} = this.state;

    let params = {};
    if (keyword != ''){
      params['keyword']=keyword;
    }

    getBlogs(nextPage, 3, params).then((res) => {
      if (nextPage == 1){
        this.setState({
          news: [...res.data],
          nextPage: res.nextPage,
          isLoading: false,
        })
      }
      else {
        this.setState({
          news: [...this.state.news, ...res.data],
          nextPage: res.nextPage,
          isLoading: false,
        })
      }
    })
  }

  onLoadMore(){
    this.setState({isLoading: true});
    this.callGetBlogs();
  }

  onDetailPress = (id) => {
    this.props.navigation.navigate("NewsDetail",{id: id});
  }

  getNewsCard(){
    const {news} = this.state;
    let index = 0;

    let newsCard = news.map((val,key)=>{
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
    return newsCard;
  }

  componentDidMount() {
    this.setState({isFirstLoad: true});
    this.callGetBlogs();
  }

  render(){
    const {isLoading, isFirstLoad, news, nextPage, keyword} = this.state;

    let newsCard = this.getNewsCard();

    return(
      <ScrollView style={styles.container}>
          <View style={styles.content}>
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
          </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_GRAY_BACKGROUND,
  },
  content: {
    padding: 12,
  }
})

export default ListTours;
