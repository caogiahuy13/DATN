import Moment from 'moment';

// Viết hoa chữ cái đầu tiên
export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Kiểm tra email
export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Kiểm tra phone numberPicker
export function validatePhone(string){
  let re = /^\d{10}$/;
  return re.test(string);
}

// Lấy khoảng cách giữa 2 ngày
export function getDaysDiff(startDate, endDate){
  let day1 = Moment(startDate);
  let day2 = Moment(endDate);
  let duration = Moment.duration(day2.diff(day1));
  let days = Math.ceil(duration.asDays());
  return days + 1;
}

// Lấy khoảng cách ngày đến hiện tại
export function getDaysLeft(startDate){
  let day1 = Moment(new Date());
  let day2 = Moment(startDate);
  let duration = Moment.duration(day2.diff(day1));
  let days = Math.floor(duration.asDays());
  return days;
}
