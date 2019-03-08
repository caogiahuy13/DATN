import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { Card, Button, Icon, Divider, Rating, AirbnbRating } from 'react-native-elements';

class TourDetail extends Component{
  render(){
    return(
      <View style={{flex: 1}}>
        <ScrollView>
          <Card
            containerStyle = {{margin: 0}}
            title='Tour tham quan Sài Gòn (nửa ngày)'
            titleStyle={{alignSelf: 'flex-start', marginHorizontal: 8}}
            image={require("../assets/images/tour-card-img.jpg")}>
            <View style={{marginBottom: 8}}>
              <Info firstText="Ngày khởi hành" secondText="24/02/2019"/>
              <Info firstText="Ngày kết thúc" secondText="24/02/2019"/>
              <Info firstText="Thời gian" secondText="1 ngày"/>
              <Info firstText="Số chỗ còn lại" secondText="3/20"/>
            </View>

            <Divider style={{height: 1}}/>

            <View style={{marginVertical: 8}}>
              <TourRating/>
              <View style={{flexDirection: 'row'}}>
                <TourIcon name="star" type="font-awesome" text="100"/>
                <TourIcon name="comments" type="font-awesome" text="10"/>
              </View>
            </View>

            <Divider style={{height: 1}}/>

            <TourPrice/>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {{margin: 0}}
            title='GIỚI THIỆU'
            titleStyle={{alignSelf: 'flex-start', marginHorizontal: 8}}
          >
            <Text style={{marginBottom: 10}}>
            Tham quan những địa danh mang đậm dấu ấn lịch sử như Bảo tàng chứng tích chiến tranh, Dinh Độc Lập.
Tìm hiểu nét văn hóa và một số kiến trúc độc đáo - điều tạo nên một phần linh hồn mảnh đất Sài Gòn: Nhà thờ Đức Bà, Bưu điện thành phố.

Bạn được trải nghiệm những gì?
Hành trình bắt đầu với chuyến thăm Bảo tàng chứng tích chiến tranh - top 5 trong số 25 bảo tàng hấp dẫn nhất châu Á. Đến với bảo tàng, bạn sẽ giật mình nhận ra đằng sau một cuộc sống hòa bình, yên ổn - mà bạn tưởng chừng như hiển nhiên này - là cả một chặng đường lịch sử thấm đẫm máu và nước mắt của dân tộc. Bảo tàng chứng tích chiến tranh như một nốt lặng tĩnh tâm giữa chốn phồn hoa đô hội, giúp bạn thêm yêu, thêm trân trọng cuộc sống thanh bình này.

Điểm dừng chân tiếp theo của Tour tham quan Sài Gòn chính là Dinh Độc Lập - một di tích quốc gia đặc biệt, dấu son quyền lực của của quá khứ. Dinh Độc Lập còn cuốn hút bạn bởi những câu chuyện lịch sử thú vị về sự hình thành, sự tồn tại, ý nghĩa văn hóa trong lối kiến trúc độc đáo và những dấu mốc lịch sử của đất nước mà nó đã mang trong mình hàng trăm năm qua. Chỉ vài giờ tham quan ngắn ngủi nhưng đủ giúp bạn hình dung về một giai đoạn lịch sử đầy biến động, và thêm tự hào về chiến thắng lịch sử vẻ vang của dân tộc Việt Nam.

Cuối hành trình, hãy trở về trung tâm thành phố để thăm Nhà thờ Đức Bà. Nơi giao hòa giữa nét cổ xưa và hiện đại, giữa kiến trúc phương Tây và văn hóa phương Đông. Bạn sẽ không khỏi trầm trồ thán phục trước màu gạch nơi đây vẫn giữ nguyên vẹn màu hồng tươi, chẳng bám chút bụi rêu, dẫu trải qua bao nắng mưa, thử thách. Nếu muốn tận hưởng hết vẻ đẹp của Nhà thờ Đức Bà, hãy dành chút thời gian ngồi lại, thưởng thức thú vui cà phê bệt trong ánh đèn lung linh phản chiếu từ các tòa cao ốc, cùng hòa nhịp sống với người Sài Gòn khi đêm về. Lúc đó bạn sẽ nhận ra Nhà thờ Đức Bà tựa như một nốt nhạc bình yên giữa bản nhạc xô bồ, vội vã của đất Sài Gòn này.
            </Text>
          </Card>

          <Divider style={{height: 10, backgroundColor: '#F4F5F4'}}/>

          <Card
            containerStyle = {{margin: 0}}
            title='CHƯƠNG TRÌNH TOUR'
            titleStyle={{alignSelf: 'flex-start', marginHorizontal: 8}}
          >
            <Text style={{marginBottom: 10}}>
            Ngày 1: Vũng Tàu - Đà Lạt - Khách sạn. (Ăn sáng, trưa chiều).
            Ngày 2: Khách sạn - Nhà thờ Con Gà - Thiền viện Trúc Lâm - Dinh Bảo Đại - Showroom hoa nghệ thuật  - Khách sạn. (Ăn sáng, trưa).
            Ngày 3: Khách sạn - Ga xe lửa cổ - Làng hoa Vạn Thành - Khách sạn (Đà lạt) - Vũng Tàu (Ăn sáng, trưa ,chiều).
            </Text>
          </Card>

        </ScrollView>
        <Button
          buttonStyle={{backgroundColor: '#C50000', borderRadius: 0}}
          title='ĐẶT TOUR'
          onPress={()=>{}}
        />
      </View>
    );
  }
}

class Info extends Component{
  render(){
    return(
      <View style={{flexDirection: 'row'}}>
        <Text style={{flex: 0.5}}>{this.props.firstText}</Text>
        <Text style={{flex: 0.5}}>{this.props.secondText}</Text>
      </View>
    );
  }
}
class TourRating extends Component {
  render(){
    return(
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <Rating
          imageSize={20}
          readonly
          startingValue={4.5}
          style={{marginRight: 10}}
        />
        <Text>4.5/5 trong 10 đánh giá</Text>
      </View>
    )
  }
}
class TourIcon extends Component {
  render(){
    return(
      <View style={{flexDirection: 'row', marginRight: 10}}>
        <Icon
          name={this.props.name}
          type={this.props.type}
          size={20}
          color='gray'
          containerStyle={{marginRight: 5}}
        />
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}
class TourPrice extends Component {
  render(){
    return(
      <View style={{marginVertical: 8, alignItems: 'center'}}>
        <Text style={{color:'#C50000', fontWeight: 'bold', fontSize: 24}}>200,000 đ</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default TourDetail;
