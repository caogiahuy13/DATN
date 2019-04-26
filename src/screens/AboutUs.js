import React, { Component } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

import localized from '../localization/index';

class AboutUs extends Component {
  static navigationOptions = {
    title: localized.aboutUs,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card
          containerStyle = {styles.card}
        >
          <Text>
              <Text style={{fontWeight: 'bold'}}>{localized.about.part_1}</Text>
              {localized.about.sub_part_1}
          </Text>

          <Space/>

          <Text>
              <Text style={{fontWeight: 'bold'}}>{localized.about.part_2}</Text>
              {localized.about.sub_part_2}
          </Text>

          <Space/>

          <Text>
              <Text style={{fontWeight: 'bold'}}>{localized.about.part_3}</Text>
              {localized.about.sub_part_3}
          </Text>

          <Space/>

          <View>
              <Text style={{fontWeight: 'bold'}}>{localized.about.part_4}</Text>
              <Text>{localized.about.sub_part_4}</Text>
          </View>

          <Space/>

          <View>
              <Text style={{fontWeight: 'bold'}}>{localized.about.part_5}</Text>
              <Text>{localized.about.sub_part_5}</Text>
          </View>

          <Space/>

          <View>
              <Text style={{fontWeight: 'bold'}}>{localized.about.part_6}</Text>
              <Text>{localized.about.sub_part_6}</Text>
          </View>

          <Space/>

          <View>
              <Text style={{fontWeight: 'bold'}}>{localized.about.part_7}</Text>
              <Text>- {localized.about.sub_part_7_1}</Text>
              <Text>- {localized.about.sub_part_7_2}</Text>
              <Text>- {localized.about.sub_part_7_3}</Text>
          </View>

        </Card>
      </ScrollView>
    );
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

export default AboutUs;
