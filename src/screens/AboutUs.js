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
              <Text style={{fontWeight: 'bold'}}>Lời đầu tiên,</Text> công ty chúng tôi xin gửi lời chào thân ái đến Quý khách hàng và đối tác. Kính chúc Quý khách hàng và đối tác luôn dồi dào sức khỏe và thành đạt.
          </Text>

          <Space/>

          <Text>
              <Text style={{fontWeight: 'bold'}}>Lĩnh vực hoạt động:</Text> Kinh doanh lữ hành nội địa và quốc tế.
          </Text>

          <Space/>

          <Text>
              <Text style={{fontWeight: 'bold'}}>Công ty</Text> được thành lập 25/03/2017 với hoạt động kinh doanh ban đầu là tổ chức các chương trình du lịch cho du khách nước ngoài vào tham quan Việt Nam, đến nay trải qua 2 năm xây dựng và phát triển (2017–2019), công ty chúng tôi đã không ngừng lớn mạnh, lĩnh vực kinh doanh ngày càng được mở rộng: kinh doanh du lịch trong và ngoài nước. Công ty cũng đã xây dựng được một hệ thống chi nhánh ở Hà Nội, Đà Nẵng, Tp. Hồ Chí Minh và Cần Thơ và mạng lưới đại lý ở nhiều tỉnh thành của cả nước. Là một công ty đã thành lập cách đây 26 năm, uy tín cực cao trong lĩnh vực du lịch, lữ hành.
Công ty chúng tôi cung cấp không chỉ những thông tin hữu ích cho người có nhu cầu du lịch mà còn là nơi cung cấp các dịch vụ du lịch chuyên nghiệp, được đánh giá cao bởi khách hàng. Sau nhiều năm cạnh tranh, phấn đấu và chứng minh, chúng tôi đã được ving danh trong top các công ty du lịch nổi tiếng nhất Việt Nam. Với tiêu chí tour chất lượng cao, an toàn, không thay đổi lịch trình, gía cả tốt nhất thị trường hơn hết đảm bảo cho du khách có những trải nghiệm thú vị nhất, dịch vụ chuyên nghiệp nhất khi mua tour tại đây. Chúng tôi phục vụ du khách đi tham quan du lịch trên cả 5 châu, du lịch ra nước ngoài tại đây rất được khách hàng tin tưởng và đánh giá cao. Dịch vụ đặt tour nhanh chóng và dễ dàng, thao tác nhanh lẹ là công ty hàng đầu về chất lượng và phong cách phục vụ chuyên nghiệp.
          </Text>

          <Space/>

          <View>
            <Text style={{fontWeight: 'bold'}}>Đội ngũ nhân viên chuyên nghiệp.</Text>
            <Text>
                Công Ty tự hào tạo là một văn hóa doanh nghiệp tốt môi trường làm việc thân thiện, các thành viên làm việc gắn kết, giúp đỡ và hỗ trợ nhau khi cần,là môi trường làm việc chuyên nghiệp từ nhân viên văn phòng đến hướng dẫn viên du lịch, luôn đưa ra lời tư vấn và thông tin du lịch chính xác cho khách hàng. Đội ngũ hướng dẫn viên được đào tạo bài bản, chuyên nghiệp và thân thiện am hiểu văn hóa nước ngoài, có thể giới thiệu cho du khách Việt những thông tin hữu ích, cũng nhằm mục đích tạo cảm tình tốt đẹp giữa người Việt Nam và bạn bè quốc tế.
            </Text>
          </View>

          <Space/>

          <View>
            <Text style={{fontWeight: 'bold'}}>Tầm nhìn và sứ mệnh.</Text>
            <Text>
                Công ty phấn đấu để luôn giữ vị trí là một trong những công ty du lịch hàng đầu của Việt Nam và khu vực về qui mô, chất lượng và uy tín. Với các nguồn lực dồi dào, tài chính vững mạnh, kinh nghiệm và uy tín trong lĩnh vực dịch vụ du lịch, mối quan hệ bền vững với các đối tác lớn khắp nơi trên thế giới, đội ngũ nhân viên năng động và chuyên nghiệp, chúng tôi luôn nỗ lực mang đến cho khách hàng những sản phẩm du lịch giá trị nhất.
            </Text>
          </View>

          <Space/>

          <View>
            <Text style={{fontWeight: 'bold'}}>Triết lý kinh doanh.</Text>
            <Text>
                Công ty luôn coi trọng ý thức trách nhiệm của doanh nghiệp đối với cộng đồng và môi trường, phát triển hoạt động kinh doanh trên tiêu chí hài hòa lợi ích doanh nghiệp với cộng đồng xã hội, thân thiện môi trường thiên nhiên.
            </Text>
          </View>

          <Space/>

          <View>
            <Text style={{fontWeight: 'bold'}}>Giá trị cốt lõi.</Text>
            <Text>
                Luôn tuân thủ các quy chuẩn và cam kết chất lượng đã công bố với khách hàng.
            </Text>
            <Text>
                Xem chất lượng dịch vụ và sự tiện ích của khách hàng là tiêu chí hàng đầu trong các định hướng và hoạt động kinh doanh của công ty.
            </Text>
            <Text>
                Tiên phong trong việc gợi mở những cảm hứng, mong đợi tiềm ẩn của khách hàng để mang đến cho khách những sản phẩm du lịch độc đáo, mới lạ mà khách chỉ có thể tìm thấy ở công ty chúng tôi.
            </Text>
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
