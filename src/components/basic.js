import React, {Component} from "react";
import {Dimensions, Image} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Right,
  Thumbnail
} from "native-base";
import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;
const cardImage = require("../assets/images/tour-card-img.jpg");


class Basic extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Body>
                  <Text>Tour tham quan Sài Gòn (nửa ngày)</Text>
                  <Text note>30/3/2019</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image
                  style={{
                    alignSelf: "center",
                    height: 150,
                    resizeMode: "cover",
                    width: deviceWidth / 1.18,
                    marginVertical: 5
                  }}
                  source={cardImage}
                />
              </Body>
            </CardItem>
            <CardItem style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon name="thumbs-up" />
                  <Text>4,923 likes</Text>
                </Button>
                <Button transparent>
                  <Icon name="chatbubbles" />
                  <Text>15</Text>
                </Button>
                <Button>
                  <Text>DETAIL</Text>
                </Button>

              </Left>
            </CardItem>
          </Card>


        </Content>
      </Container>
    );
  }
}

export default Basic;
