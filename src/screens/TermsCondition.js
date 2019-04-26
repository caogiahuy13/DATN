import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

import localized from '../localization/index';

class TermsCondition extends Component {
  static navigationOptions = {
    title: localized.termsCondition,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card containerStyle = {styles.card}>
          <Text>{localized.terms.sub_title}</Text>

          <Space/>

          <Text style={{fontWeight: 'bold'}}>{localized.terms.part_1}</Text>
          <Text>- {localized.terms.sub_part_1_1}</Text>
          <Text>- {localized.terms.sub_part_1_2}</Text>
          <Text>- {localized.terms.sub_part_1_3}</Text>
          <Text>- {localized.terms.sub_part_1_4}</Text>

          <Space/>

          <Text style={{fontWeight: 'bold'}}>{localized.terms.part_2}</Text>
          <Text>- {localized.terms.sub_part_2_1}</Text>
          <Text>- {localized.terms.sub_part_2_2}</Text>
          <Text>- {localized.terms.sub_part_2_3}</Text>
          <Text>- {localized.terms.sub_part_2_4}</Text>

          <Space/>

          <Text style={{fontWeight: 'bold'}}>{localized.terms.part_3}</Text>
          <Text>{localized.terms.sub_part_3_1}</Text>
          <Text>- {localized.terms.sub_part_3_1_1}</Text>
          <Text>- {localized.terms.sub_part_3_1_2}</Text>
          <Text>- {localized.terms.sub_part_3_1_3}</Text>
          <Text></Text>
          <Text>{localized.terms.sub_part_3_2}</Text>
          <Text>- {localized.terms.sub_part_3_2_1}</Text>
          <Text>- {localized.terms.sub_part_3_2_2}</Text>
          <Text>- {localized.terms.sub_part_3_2_3}</Text>
          <Text>- {localized.terms.sub_part_3_2_4}</Text>
          <Text>  + {localized.terms.sub_part_3_2_4_1}</Text>
          <Text>  + {localized.terms.sub_part_3_2_4_2}</Text>
          <Text></Text>
          <Text>{localized.terms.sub_part_3_3}</Text>
          <Text>- {localized.terms.sub_part_3_3_1}</Text>
          <Text>- {localized.terms.sub_part_3_3_2}</Text>
          <Text>  + {localized.terms.sub_part_3_3_2_1}</Text>
          <Text>  + {localized.terms.sub_part_3_3_2_2}</Text>
          <Text>  + {localized.terms.sub_part_3_3_2_3}</Text>
          <Text>  + {localized.terms.sub_part_3_3_2_4}</Text>
          <Text>  + {localized.terms.sub_part_3_3_2_5}</Text>
          <Text>- {localized.terms.sub_part_3_3_3}</Text>

          <Text></Text>

          <Text>{localized.terms.sub_part_3_4}</Text>
          <Text>- {localized.terms.sub_part_3_4_1}</Text>
          <Text>- {localized.terms.sub_part_3_4_2}</Text>

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

export default TermsCondition;
