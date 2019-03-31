import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating, Avatar } from 'react-native-elements';
import Slideshow from 'react-native-image-slider-show';
import Collapsible from 'react-native-collapsible';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { bookingChangeTourTurn } from '../actions/index.js';
import { getImageByTourId } from '../services/api';
import { getDaysDiff, getDaysLeft, priceFormat, getAgeShow, dateFormat } from '../services/function';
import { COLOR_GRAY_BACKGROUND, COLOR_MAIN } from '../constants/index';
import localized from '../localization/index';

import TourCardTitle from '../components/TourCardTitle';
import TourDetailCardInfo from '../components/TourDetailCardInfo';
import CollapsibleCardTitle from '../components/CollapsibleCardTitle';
import TourDetailMap from '../components/TourDetailMap';
import TourDetailReview from '../components/TourDetailReview';

class TourDetail2 extends Component{
  static navigationOptions = ({navigation}) => ({
    title: localized.tourDetail,
  });

  constructor(props){
    super(props);
    this.state = {
      images: [],

      isDescriptionCollapsed: true,
      isDetailCollapsed: true,
      isReviewCollapsed: true,
      isAdditionCollapsed: true,
    }
  }

  toggleDescription(){
    this.setState({isDescriptionCollapsed: !this.state.isDescriptionCollapsed});
  }
  toggleDetail(){
    this.setState({isDetailCollapsed: !this.state.isDetailCollapsed});
  }
  toggleReview(){
    this.setState({isReviewCollapsed: !this.state.isReviewCollapsed});
  }
  toggleAddition(){
    this.setState({isAdditionCollapsed: !this.state.isAdditionCollapsed});
  }

  async callGetImageByTourId(id){
    return getImageByTourId(id)
            .then((response) => response.json())
            .then((responseJson) => responseJson)
            .catch((error) => console.error(error))
  }

  getImage(){
    const {currentTourTurn} = this.props;

    this.callGetImageByTourId(currentTourTurn.tour.id)
        .then((res)=>{
          let source = res.data.map((val,key)=>{
            return {url: val.name}
          });
          this.setState({images: source});
        })
  }

  componentWillMount(){
    const {currentTourTurn} = this.props;

    this.getImage();
  }



  render(){
    const {currentTourTurn} = this.props;
    const {tour} = this.props.currentTourTurn;
    const {
      images,
      isDescriptionCollapsed, isDetailCollapsed, isReviewCollapsed, isAdditionCollapsed,
    } = this.state;

    return(
      <View style={{flex: 1, backgroundColor: COLOR_GRAY_BACKGROUND}}>
        <ScrollView>
            <Card
              containerStyle = {{margin: 0, padding: 0}}
              title=<TourCardTitle title={currentTourTurn.tour.name} isSale={currentTourTurn.discount > 0} rating={3} view={currentTourTurn.view}/>
              titleStyle={styles.cardTitle}
            >
                <Slideshow dataSource={images} containerStyle={{marginBottom: 8}}/>
                <TourDetailCardInfo currentTourTurn={currentTourTurn}/>
            </Card>

            <TourDetailDivider/>

            <Card
              containerStyle = {styles.cardContainer}
              title=<CollapsibleCardTitle title={localized.description} status={isDescriptionCollapsed} onPress={()=>this.toggleDescription()}/>
              titleStyle={styles.cardTitle}
            >
                <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={isDescriptionCollapsed}>
                  <Text>{tour.description}</Text>
                </Collapsible>
            </Card>

            <TourDetailDivider/>

            <Card
              containerStyle = {styles.cardContainer}
              title=<CollapsibleCardTitle title={localized.detail} status={isDetailCollapsed} onPress={()=>this.toggleDetail()}/>
              titleStyle={styles.cardTitle}
            >
                <Collapsible style={{flex: 1, paddingVertical: 10}} collapsed={isDetailCollapsed}>
                  { !isDetailCollapsed &&
                    <View style={{height: 400, marginBottom: 10}}>
                        <TourDetailMap/>
                    </View>
                  }
                  <Text>{tour.detail}</Text>
                </Collapsible>

            </Card>

        </ScrollView>
      </View>
    )
  }
}

const TourDetailDivider = () => {
  return(
    <Divider style={{height: 10, backgroundColor: COLOR_GRAY_BACKGROUND}}/>
  )
}

const styles = StyleSheet.create({
  cardTitle: {
    alignSelf: 'flex-start',
    marginHorizontal: 8,
  },
  cardContainer: {
    margin: 0,
    flex: 1,
    paddingVertical: 0,
  },
});

function mapStateToProps(state){
  return{
    currentTourTurn: state.currentTourTurn,
  };
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    bookingChangeTourTurn: bookingChangeTourTurn,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TourDetail2);
