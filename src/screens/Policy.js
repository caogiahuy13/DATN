import React, { Component } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import localized from '../localization/index';

let content = {
  content1: {
    title: 'GIÁ VÉ DÀNH CHO TRẺ EM:',
    text1: 'Trẻ em dưới 5 tuổi: không thu phí dịch vụ, bố mẹ tự lo cho bé và thanh toán các chi phí phát sinh (đối với các dịch vụ tính phí theo chiều cao…). Hai người lớn chỉ được kèm 1 trẻ em dưới 5 tuổi, trẻ em thứ 2 sẽ đóng phí theo quy định dành cho độ tuổi từ 5 đến dưới 12 tuổi và phụ thu phòng đơn. Vé máy bay, tàu hỏa, phương tiện vận chuyển công cộng mua vé theo quy định của các đơn vị vận chuyển.',
    text2: 'Trẻ em từ 5 tuổi đến dưới 12 tuổi: 75% giá tour người lớn (không có chế độ giường riêng). Hai người lớn chỉ được kèm 1 trẻ em từ 5 - dưới 12 tuổi, em thứ hai trở lên phải mua 1 suất giường đơn.',
    text3: 'Từ 11 tuổi trở lên: 100% giá tour và tiêu chuẩn như người lớn.',
  },
  content2: {
    title: 'ĐIỀU KIỆN THANH TOÁN:',
    text1: 'THANH TOÁN HẾT TRƯỚC NGÀY KHỞI HÀNH 2 NGÀY',
  },
  content3: {
    title: 'CÁC ĐIỀU KIỆN KHI ĐĂNG KÝ TOUR:',
    text1: 'Khi đăng ký vui lòng cung cấp giấy tờ tùy thân tất cả người đi: Chứng minh nhân dân/Hộ chiếu (Passport)/Giấy khai sinh (trẻ em dưới 14 tuổi). Trong trường hợp đăng ký trực tuyến qua www.travel-tour.com vui lòng nhập tên chính xác theo thứ tự: Họ/tên lót/tên xuất vé máy bay. Quý khách khi đăng ký cung cấp tên theo giấy tờ tùy thân nào, khi đi tour mang theo giấy tờ tùy thân đó.',
    text2: `Quy định giấy tờ tùy thân khi đi tour :
Khách quốc tịch Việt Nam: Trẻ em dưới 14 tuổi Giấy khai sinh bản chính/Hộ chiếu bản chính còn giá trị sử dụng. Trẻ em từ 14 tuổi trở lên và Người lớn CMND/ Hộ chiếu bản chính còn giá trị sử dụng. Lưu ý trẻ em trên 14 tuổi bắt buộc phải có CMND/Hộ chiếu làm thủ tục lên máy bay hoặc Giấy xác nhận nhân thân theo mẫu quy định và chỉ có giá trị trong vòng 30 ngày kể từ ngày xác nhận. Khách quốc tịch nước ngoài hoặc là Việt kiều: Khi đi tour vui lòng mang theo hộ chiếu bản chính (Passport) hoặc thẻ xanh kèm thị thực nhập cảnh (visa dán vào hộ chiếu hoặc tờ rời hoặc cuốn miễn thị thực, các loại giấy tờ này phải có dấu nhập cảnh Việt Nam và còn giá trị sử dụng theo quy định khi đi tour).`,
    text3: 'Thông tin tập trung: Tại sân bay Tân Sơn Nhất, Ga đi trong nước, trước giờ bay 2 tiếng (áp dụng ngày thường), trước 2 tiếng 30 phút (áp dụng lễ tết). Trong trường hợp bay hãng hàng không Vietjet cột 5, trong trường hợp bay hãng hàng không Vietnam, Jetstar cột 12 Quầy TravelTour',
    text4: 'Thông tin hành lý khi đi tour, xách tay dưới 7kg/1khách - kích thước không quá: 56cm x 36cm x 23 cm, chất lỏng với thể tích không quá 100ml. Ký gửi 20kg/1khách - kích thước không quá: 119cm x 119cm x 81cm. Các vật phẩm không được chấp nhận dưới dạng hành lý ký gởi hoặc vận chuyển trong hành lý theo quy định hàng không',
    text5: 'Do các chuyến bay phụ thuộc vào các hãng Hàng Không (Vietnam, Vietjet, Jetstar,..) nên trong một số trường hợp giá vé, chuyến bay, giờ bay có thể thay đổi mà không được báo trước. Tùy vào tình hình thực tế, chương trình và điểm tham quan có thể linh động thay đổi thứ tự các điểm phù hợp điều kiện giờ bay và thời tiết thực tế. TravelTour sẽ không chịu trách nhiệm bảo đảm các điểm tham quan trong trường hợp:',
    text5_1: 'Xảy ra thiên tai: bão lụt, hạn hán, động đất...',
    text5_2: 'Sự cố về an ninh: khủng bố, biểu tình',
    text5_3: 'Sự cố về hàng không: trục trặc kỹ thuật, an ninh, dời, hủy, hoãn chuyến bay.',
    title2: 'NẾU NHỮNG TRƯỜNG HỢP TRÊN XẢY RA, TRAVELTOUR SẼ XEM XÉT ĐỂ HOÀN TRẢ CHI PHÍ KHÔNG THAM QUAN CHO KHÁCH TRONG ĐIỀU KIỆN CÓ THỂ (SAU KHI ĐÃ TRỪ LẠI CÁC DỊCH VỤ ĐÃ THỰC HIỆN... .VÀ KHÔNG CHỊU TRÁCH NHIỆM BỒI THƯỜNG THÊM BẤT KỲ CHI PHÍ NÀO KHÁC).',
    text6: 'Sau khi Quý khách đã làm thủ tục Hàng Không và nhận thẻ lên máy bay, đề nghị Quý khách giữ cẩn thận và lưu ý lên máy bay đúng giờ. TravelTour không chịu trách nhiệm trong trường hợp khách làm mất thẻ lên máy bay và không lên máy bay đúng theo giờ quy định của Hàng Không.',
    text7: 'Đối với các chương trình tham quan biển đảo, trong trường hợp Quý khách không khỏe, có tiền sử bệnh hoặc có chất kích thích trong người (rượu, bia…) thì không nên tắm & lặn biển để đảm bảo sự an toàn.',
    text8: 'Cam kết đã được tư vấn hiểu rõ và đồng ý các quy định liên quan về điều kiện sức khỏe khi tham gia chương trình du lịch. Khách nữ từ 55 tuổi trở lên và khách nam từ 60 trở lên: nên có người thân dưới 55 tuổi (đầy đủ sức khỏe) đi cùng. Riêng khách từ 70 tuổi trở lên: Bắt buộc phải có người thân dưới 55 tuổi (đầy đủ sức khỏe) đi cùng. Hạn chế nhận khách từ 80 tuổi trở lên. Khách từ 80 tuổi không có chế độ bảo hiểm. Quý khách mang thai vui lòng báo cho nhân viên bán tour ngay tại thời điểm đăng ký. Phải có ý kiến của bác sĩ trước khi đi tour, tự chịu trách nhiệm về sức khỏe của mình và thai nhi trong suốt thời gian tham gia chương trình du lịch. Khi đi tour phải mang theo sổ khám thai và giấy tờ tùy thân theo quy định hãng hàng không. Tuần thai từ 28 tuần trở đi phải mang theo giấy khám thai trong vòng 7 ngày trở lại. Cam kết bản thân và người thân hoàn toàn có đủ sức khỏe để đi du lịch theo chương trình. Đồng ý miễn trừ toàn bộ trách nhiệm pháp lý, không khiếu nại, không yêu cầu bồi thường đối với TravelTour nói chung và nhân viên TravelTour nói riêng về tất cả các vấn đề xảy ra liên quan đến tình trạng sức khỏe của khách hàng khi tham gia tour hoặc sử dụng các dịch vụ do TravelTour cung cấp. Quý khách cam kết tự chịu mọi chi phí phát sinh ngoài chương trình tour liên quan đến việc giải quyết các rủi ro về sức khỏe (lưu trú, vận chuyển, chi phí khám chữa bệnh...)',
    text9: 'Quý khách có nhu cầu cần xuất hóa đơn vui lòng cung cấp thông tin xuất hóa đơn cho nhân viên bán tour khi ngay khi đăng ký hoặc trước khi thanh toán hết, không nhận xuất hóa đơn sau khi tour đã kết thúc.',
    text10: 'Quý khách vui lòng đọc kỹ chương trình, giá tour, các khoản bao gồm cũng như không bao gồm trong chương trình, các điều kiện hủy tour trên biên nhận đóng tiền. Tùy thời điểm đăng ký, kênh bán, giá tour có thể thay đổi. Trong trường hợp Quý khách không trực tiếp đến đăng ký tour mà do người khác đến đăng ký thì Quý khách vui lòng tìm hiểu kỹ chương trình từ người đăng ký cho mình.',
  },
  content4: {
    title: 'LƯU Ý KHI HỦY TOUR:',
    text1: 'SAU KHI THANH TOÁN TIỀN, NẾU QUÝ KHÁCH MUỐN HỦY TOUR XIN VUI LÒNG MANG VÉ DU LỊCH ĐẾN VĂN PHÒNG ĐĂNG KÝ TOUR ĐỂ LÀM THỦ TỤC HỦY TOUR VÀ CHỊU CHI PHÍ THEO QUY ĐỊNH CỦA TRAVELTOUR. KHÔNG GIẢI QUYẾT CÁC TRƯỜNG HỢP LIÊN HỆ HỦY TOUR QUA ĐIỆN THOẠI.',
  },
  content5: {
    title: 'CÁC ĐIỀU KIỆN HỦY TOUR: (ĐỐI VỚI NGÀY THƯỜNG)',
    text1: 'Nếu hủy chuyến du lịch trong vòng từ 15-19 ngày trước ngày khởi hành: Chi phí hủy tour: 15% trên giá tour du lịch.',
    text2: 'Nếu hủy chuyến du lịch trong vòng từ 12-14 ngày trước ngày khởi hành: Chi phí hủy tour: 30% trên giá tour du lịch.',
    text3: 'Nếu hủy chuyến du lịch trong vòng từ 08-11 ngày trước ngày khởi hành: Chi phí hủy tour: 50% trên giá tour du lịch.',
    text4: 'Nếu hủy chuyến du lịch trong vòng từ 05-07 ngày trước ngày khởi hành: Chi phí hủy tour: 70% trên giá tour du lịch.',
    text5: 'Nếu hủy chuyến du lịch trong vòng từ 02-04 ngày trước ngày khởi hành: Chi phí hủy tour: 90% trên giá vé du lịch.',
    text6: 'Nếu hủy chuyến du lịch trong vòng 1 ngày trước ngày khởi hành : Chi phí hủy tour: 100% trên giá vé du lịch.',
  },
  content6: {
    title: 'CÁC ĐIỀU KIỆN HỦY TOUR: (ĐỐI VỚI NGÀY LỄ, TẾT)',
    text1: 'Nếu hủy chuyến du lịch trong vòng từ 25-29 ngày trước ngày khởi hành: Chi phí hủy tour: 15% trên giá tour du lịch.',
    text2: 'Nếu hủy chuyến du lịch trong vòng từ 20-24 ngày trước ngày khởi hành: Chi phí hủy tour: 30% trên giá tour du lịch.',
    text3: 'Nếu hủy chuyến du lịch trong vòng từ 17-19 ngày trước ngày khởi hành: Chi phí hủy tour: 50% trên giá tour du lịch.',
    text4: 'Nếu hủy chuyến du lịch trong vòng từ 08-16 ngày trước ngày khởi hành: Chi phí hủy tour: 70% trên giá tour du lịch.',
    text5: 'Nếu hủy chuyến du lịch trong vòng từ 02-07 ngày trước ngày khởi hành: Chi phí hủy tour: 90% trên giá vé du lịch.',
    text6: 'Nếu hủy chuyến du lịch trong vòng 1 ngày trước ngày khởi hành : Chi phí hủy tour: 100% trên giá vé du lịch.',
  },
  content7: {
    title: 'CÁC TOUR LỄ, TẾT LÀ TOUR CÓ THỜI GIAN DIỄN RA RƠI VÀO MỘT TRONG CÁC NGÀY LỄ, TẾT THEO QUY ĐỊNH',

  },
  content8: {
    title: 'THỜI GIAN HỦY ĐƯỢC TÍNH CHO NGÀY LÀM VIỆC, KHÔNG TÍNH THỨ 7, CHỦ NHẬT VÀ CÁC NGÀY LỄ, TẾT.',
  }
};

class Policy extends Component {
  static navigationOptions = {
    title: localized.policy,
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Card
          containerStyle = {styles.card}
        >

          <Text style={{fontWeight: 'bold'}}>{content.content1.title}</Text>
          <Text>- {content.content1.text1}</Text>
          <Text>- {content.content1.text2}</Text>
          <Text>- {content.content1.text3}</Text>

          <Space/>

          <Text style={{fontWeight: 'bold'}}>{content.content2.title}</Text>
          <Text>{content.content2.text1}</Text>

          <Space/>

          <Text style={{fontWeight: 'bold'}}>{content.content3.title}</Text>
          <Text>- {content.content3.text1}</Text>
          <Text>- {content.content3.text2}</Text>
          <Text>- {content.content3.text3}</Text>
          <Text>- {content.content3.text4}</Text>
          <Text>- {content.content3.text5}</Text>
          <Text style={{paddingLeft: 8}}>+ {content.content3.text5_1}</Text>
          <Text style={{paddingLeft: 8}}>+ {content.content3.text5_2}</Text>
          <Text style={{paddingLeft: 8}}>+ {content.content3.text5_3}</Text>

          <Space/>

          <Text>{content.content3.title2}</Text>
          <Text>- {content.content3.text6}</Text>
          <Text>- {content.content3.text7}</Text>
          <Text>- {content.content3.text8}</Text>
          <Text>- {content.content3.text9}</Text>
          <Text>- {content.content3.text10}</Text>

          <Space/>

          <Text style={{fontWeight: 'bold'}}>{content.content4.title}</Text>
          <Text>{content.content4.text1}</Text>

          <Space/>

          <Text style={{fontWeight: 'bold'}}>{content.content5.title}</Text>
          <Text>- {content.content5.text1}</Text>
          <Text>- {content.content5.text2}</Text>
          <Text>- {content.content5.text3}</Text>
          <Text>- {content.content5.text4}</Text>
          <Text>- {content.content5.text5}</Text>
          <Text>- {content.content5.text6}</Text>

          <Space/>

          <Text style={{fontWeight: 'bold'}}>{content.content6.title}</Text>
          <Text>- {content.content6.text1}</Text>
          <Text>- {content.content6.text2}</Text>
          <Text>- {content.content6.text3}</Text>
          <Text>- {content.content6.text4}</Text>
          <Text>- {content.content6.text5}</Text>
          <Text>- {content.content6.text6}</Text>

          <Space/>

          <Text style={{fontWeight: 'bold'}}>{content.content7.title}</Text>

          <Space/>

          <Text style={{fontWeight: 'bold'}}>{content.content8.title}</Text>
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

export default Policy;
