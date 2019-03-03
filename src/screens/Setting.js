import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { ListItem, Divider, Avatar, Icon } from 'react-native-elements'

export default class Setting extends Component {
  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>Cao Gia Huy</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 14,
              }}
            >
              "caogiahuy13@gmail.com"
            </Text>
          </View>
        </View>

        <InfoText text="Account"/>

        <ListItem
            // chevron
            title="Currency"
            rightTitleStyle={{ fontSize: 15 }}
            onPress={() => {Alert.alert("ABC")}}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <Icon
                name='log-out'
                type='entypo'
                color='#00aced' />
            }
            rightIcon={<Chevron />}
          />
      </ScrollView>
    );
  }
}

const InfoText = ({ text }) => (
  <View style={styles.containerInfoText}>
    <Text style={styles.infoText}>{text}</Text>
  </View>
)

const Chevron = () => (
  <Icon
    name="chevron-right"
    type="entypo"
    containerStyle={{ marginLeft: -15, width: 20 }}
    color='#D1D1D6'
  />
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
      fontSize: 20,
    },
    containerInfoText: {
      paddingTop: 20,
      paddingBottom: 12,
      backgroundColor: '#F4F5F4',
    },
    infoText: {
      fontSize: 16,
      marginLeft: 20,
      color: 'gray',
      fontWeight: '500',
    },
    userRow: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: 8,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 6,
    },
    userImage: {
      marginRight: 12,
    },
    listItemContainer: {
      height: 55,
      borderWidth: 0.5,
      borderColor: '#ECECEC',
    },
    scroll: {
      backgroundColor: 'white',
    },
})
