import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { COLOR_LIGHT_BLACK, COLOR_GREEN, COLOR_HARD_RED } from '../constants/index';
import localized from '../localization/index';

class CancelTourCondition extends Component{
  render(){
    return(
      <View>
          <Text>{localized.cancel_tour.domestic}</Text>
          <Text></Text>

          <Text>{localized.cancel_tour.domestic_week_day}</Text>
          <Text>- {localized.cancel_tour.domestic_week_day_1}</Text>
          <Text>- {localized.cancel_tour.domestic_week_day_2}</Text>
          <Text>- {localized.cancel_tour.domestic_week_day_3}</Text>
          <Text>- {localized.cancel_tour.domestic_week_day_4}</Text>
          <Text>- {localized.cancel_tour.domestic_week_day_5}</Text>
          <Text></Text>

          <Text>{localized.cancel_tour.holiday}</Text>
          <Text>- {localized.cancel_tour.domestic_holiday_1}</Text>
          <Text>- {localized.cancel_tour.domestic_holiday_2}</Text>
          <Text>- {localized.cancel_tour.domestic_holiday_3}</Text>
          <Text>- {localized.cancel_tour.domestic_holiday_4}</Text>
          <Text>- {localized.cancel_tour.domestic_holiday_5}</Text>
          <Text></Text>

          <Text>{localized.cancel_tour.note}</Text>
          <Text>{localized.cancel_tour.note_content}</Text>
          <Text></Text>

          <Text>{localized.cancel_tour.foreign}</Text>
          <Text></Text>

          <Text>{localized.cancel_tour.foreign_week_day}</Text>
          <Text>- {localized.cancel_tour.foreign_week_day_1}</Text>
          <Text>- {localized.cancel_tour.foreign_week_day_2}</Text>
          <Text>- {localized.cancel_tour.foreign_week_day_3}</Text>
          <Text>- {localized.cancel_tour.foreign_week_day_4}</Text>
          <Text>- {localized.cancel_tour.foreign_week_day_5}</Text>
          <Text>- {localized.cancel_tour.foreign_week_day_6}</Text>
          <Text>- {localized.cancel_tour.foreign_week_day_7}</Text>
          <Text>- {localized.cancel_tour.foreign_week_day_8}</Text>
          <Text></Text>

          <Text>{localized.cancel_tour.foreign_holiday}</Text>
          <Text>- {localized.cancel_tour.foreign_holiday_1}</Text>
          <Text>- {localized.cancel_tour.foreign_holiday_2}</Text>
          <Text>- {localized.cancel_tour.foreign_holiday_3}</Text>
          <Text>- {localized.cancel_tour.foreign_holiday_4}</Text>
          <Text>- {localized.cancel_tour.foreign_holiday_5}</Text>
          <Text>- {localized.cancel_tour.foreign_holiday_6}</Text>
          <Text></Text>

          <Text>{localized.cancel_tour.note}</Text>
          <Text>{localized.cancel_tour.note_content}</Text>
          <Text></Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({

})

export default CancelTourCondition;
