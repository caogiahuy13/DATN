import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Card, Icon, Divider } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

import localized from '../localization/index';

class Faq extends Component {
  static navigationOptions = {
    title: localized.faqScreen,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card containerStyle = {styles.card}>
          <Text style={{fontWeight: 'bold'}}>{localized.faq.question}</Text>

          <Space/>

          <Answer
              question={localized.faq.question_1}
              answer={localized.faq.answer_1}
          />
          <CustomDivider/>
          <Answer
              question={localized.faq.question_2}
              answer={localized.faq.answer_2}
          />
          <CustomDivider/>
          <Answer
              question={localized.faq.question_3}
              answer={localized.faq.answer_3}
          />
          <CustomDivider/>
          <Answer
              question={localized.faq.question_4}
              answer={localized.faq.answer_4}
          />
          <CustomDivider/>
          <Answer
              question={localized.faq.question_5}
              answer={localized.faq.answer_5}
          />
          <CustomDivider/>
          <Answer
              question={localized.faq.question_6}
              answer={localized.faq.answer_6}
          />
          <CustomDivider/>
          <Answer
              question={localized.faq.question_7}
              answer={localized.faq.answer_7}
          />
          <CustomDivider/>
          <Answer
              question={localized.faq.question_8}
              answer={localized.faq.answer_8}
          />
          <CustomDivider/>
          <Answer
              question={localized.faq.question_9}
              answer={localized.faq.answer_9}
          />
          <CustomDivider/>
          <Answer
              question={localized.faq.question_10}
              answer={localized.faq.answer_10}
          />

        </Card>
      </ScrollView>
    );
  }
}

class Answer extends Component {
  state = {
    isCollapsed: true,
  }
  render(){
    const {question, answer} = this.props;
    const {isCollapsed} = this.state;

    return(
      <View style={{marginVertical: 4}}>
          <TouchableOpacity onPress={()=>this.setState({isCollapsed: !isCollapsed})}>
              <View style={{flexDirection: 'row'}}>
                  <Text style={{flex: 1, paddingRight: 4}}>{question}</Text>
                  <Icon
                      name={isCollapsed ? 'caretleft' : 'caretdown'}
                      type='antdesign'
                      color="gray"
                      size={14}
                      containerStyle={{justifyContent: 'center'}}
                  />
              </View>
          </TouchableOpacity>
          <Collapsible style={{padding: 6}} collapsed={isCollapsed}>
              <Text style={{color: 'rgba(0,0,0,0.8)'}}>{answer}</Text>
          </Collapsible>
      </View>
    )
  }
}

class CustomDivider extends Component {
  render(){
    return(
      <Divider style={{height: 0.5, marginVertical: 6, marginLeft: 6, marginRight: 12}}/>
    )
  }
}
class Space extends Component {
  render(){
    return(
      <View style={{margin: 6}}></View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
      margin: 0,
    }
})

export default Faq;
