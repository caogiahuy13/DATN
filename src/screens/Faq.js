import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Card, Icon, Divider } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

import localized from '../localization/index';

class Faq extends Component {
  static navigationOptions = {
    title: localized.faq,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card
          containerStyle = {styles.card}
        >
          <Text style={{fontWeight: 'bold'}}>Thông tin thực tế.</Text>
          <Text>
              1. Những giờ được cho biết?
          </Text>
          <Text>
              Tất cả giờ bay đã cho biết là theo giờ địa phương. Ví dụ như, nếu nó cho biết là chuyến bay khởi hành lúc 15:00 từ Arlanda và đến Luân Đôn lúc 16:30, thời gian bay là 2,5 giờ, vì giờ tại Anh Quốc trễ hơn giờ Thụy Điển 1 giờ. Ví dụ như, nếu bạn bay từ Hoa Kỳ, bạn thường rời khỏi Hoa Kỳ vào buổi tối và đến Châu Âu vào ngày hôm sau. Thông tin này được cho biết với một ngày mới cùng với các thời điểm.
          </Text>

          <Space/>

          <Text>
              2. Khi tôi đặt chuyến đi của mình tôi đã không nhận được các giấy tờ đi lại qua email, tôi phải làm gì?
          </Text>
          <Text>
              Giấy tờ đi lại của bạn được tự động gửi đến địa chỉ email bạn đã cung cấp khi thực hiện yêu cầu đặt tour. Nếu bạn chưa nhận được giấy tờ đi lại, có thể là bạn đã cung cấp địa chỉ email không chính xác. Giấy tờ đi lại chứa mọi chi tiết về yêu cầu đặt trư của bạn. Một số máy chủ email đôi khi cũng có thể phân loại các email này là "thư rác". Đảm bảo rằng email đã không bị phân loại là thư rác. Bạn luôn có thể liên hệ với chúng tôi và chúng tôi sẽ gửi cho bạn các giấy tờ đi lại mới. Lưu ý rằng điều rất quan trọng là phải cung cấp cho chúng tôi địa chỉ email chính xác, vì chúng tôi cũng sẽ sử dụng địa chỉ này để gửi cho bạn bất kỳ thông tin thay đổi lịch nào hoặc những thay đổi khác đối với yêu cầu đặt tour của bạn.
          </Text>

          <Space/>
          <Space/>

          <Text style={{fontWeight: 'bold'}}>MOST FREQUENT QUESTION - CUSTOMER</Text>

          <Space/>

          <Answer
              question="Các mức giá được cho biết như thế nào trong kết quả tìm kiếm khi tôi muốn thực hiện một yêu cầu đặt tour?"
              answer="Các mức giá luôn được cho biết là giá mỗi người. Nếu bạn có cả trẻ em và người lớn trong yêu cầu tìm kiếm, tổng số cho tất cả hành khách sẽ được hiển thị cũng như giá mỗi người lớn. Khi bạn chọn một lựa chọn và tiếp tục, giá sẽ được cho biết dưới dạng người lớn và trẻ em. Tổng giá luôn được hiển thị."
          />
          <CustomDivider/>
          <Answer
              question="Tôi có thể đặt tour trước bao lâu?"
              answer="Bạn có thể đặt tour ngay khi công ty có tour cho đến 3 ngày trước ngày khởi hành nếu tour cón chỗ trống."
          />
          <CustomDivider/>
          <Answer
              question="Giá trên trang web có thể thay đổi hay không?"
              answer="Giá trên trang web của chúng tôi là Công ty đã ước tính từ trước, các chi phí được tính toán một cách chính xác, vì thế giá không thay đổi trong quy trình đặt tour, một khi bạn đã chọn lựa chọn bạn muốn."
          />
          <CustomDivider/>
          <Answer
              question="Có bất kỳ khoản phí nào khi tôi thanh toán bằng thẻ hay không?"
              answer="Bất kỳ khoản phí nào có thể áp dụng cũng sẽ được hiển thị tại thời điểm thực hiện yêu cầu đặt tour."
          />
          <CustomDivider/>
          <Answer
              question="Tôi có thể nhận được thông tin về bất kỳ sự thay đổi lịch nào bằng cách nào?"
              answer="Giờ khởi hành cót thể được thay đổi trong thời gian ngắn. Điều quan trọng là bạn phải kiểm tra địa chỉ email mà bạn đã cung cấp khi đặt tour vì bất kỳ thay đổi lịch nào cũng sẽ được gửi vào đó. Bạn phải sử dụng địa chỉ email mà bạn cũng có thể kiểm tra trong khi đi xa, vì những thay đổi lịch đôi khi có thể xuất hiện sau khi bạn đã bắt đầu đi. Bạn luôn có thể kiểm tra giờ khởi hành dùng liên kết chúng tôi cung cấp cho bạn trong các giấy tờ đi lại của bạn."
          />
          <CustomDivider/>
          <Answer
              question="Tôi sẽ đi với một trẻ sơ sinh. Tôi có cần bất kỳ thông tin đặc biệt nào hay không?"
              answer="Nếu bạn đã mua một tour và bạn đi đường dài, chúng tôi có thể yêu cầu nôi cho bé. Để thực hiện việc này, chúng tôi cần thông tin sau đây: ngày sinh và chiều cao và cân nặng ước tính của trẻ vào ngày khởi hành. Trong một số trường hợp chúng tôi cũng có thể đặt thức ăn cho trẻ sơ sinh và ghế đặc biệt cho các hành khách có con sơ sinh. Tuy nhiên, chúng tôi không bao giờ có thể đảm bảo các ghế ngồi này, vì các hãng hàng không đôi khi có những thay đổi (thay đổi loại máy bay, thay đổi lịch bay, v.v.) có thể dẫn đến việc không thể đáp ứng yêu cầu của bạn."
          />
          <CustomDivider/>
          <Answer
              question="Trẻ em có phải có hộ chiếu riêng hay không?"
              answer="Có, tất cả trẻ em phải có hộ chiếu riêng. Không thể chỉ liệt kê trẻ em trong hộ chiếu của cha mẹ."
          />
          <CustomDivider/>
          <Answer
              question="Tại sao tôi không thể truy cập thông tin đặt tour trong tài khoản của tôi; tôi có thể đăng nhập bằng cách nào?"
              answer="Để đăng ký chuyến đi khi bạn đặt tour trên trang web của chúng tôi bạn phải đăng nhập vào tài khoản của mình khi bạn thực hiện yêu cầu đặt tour."
          />
          <CustomDivider/>
          <Answer
              question="Mật khẩu vào tài khoản của tôi không có hiệu lực; tôi có thể đổi mật khẩu bằng cách nào?"
              answer="Nhấp vào nút Đăng nhập trên trang chủ của chúng tôi ở đó bạn sẽ tìm thấy một liên kết, bạn có thể mở liên kết này để lấy mật khẩu mới. Nhấp vào liên kết Quên mật khẩu và nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn các hướng dẫn cách cài đặt mật khẩu mới."
          />
          <CustomDivider/>
          <Answer
              question="Tôi gặp vấn đề khi kích hoạt tài khoản của mình; có vấn đề gì?"
              answer="Có thể có thiết lập bảo mật trong email của bạn khiến cho bạn không thể nhận email xác minh. Trước tiên hãy kiểm tra thiết lập bảo mật của bạn. Nếu cách này không có tác dụng, hãy liên hệ lại với chúng tôi để chúng tôi có thể kích hoạt tài khoản của bạn lại."
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
                  <Text style={{flex: 1}}>{question}</Text>
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
