import Moment from 'moment';
import { View, Text } from 'react-native';;
import NumberFormat from 'react-number-format';
import React, { Component } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import localized from '../localization/index';

// Viết hoa chữ cái đầu tiên
export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Lấy chuỗi hiển thị giới tính
export function getGenderShow(string){
  if (string == 'male'){
    return localized.male;
  } else if (string == 'female'){
    return localized.female;
  } else if (string == 'other'){
    return localized.other;
  }
}

// Lấy chuỗi hiển thị Age
export function getAgeShow(string){
  if (string == 'adults'){
    return localized.adult;
  } else if (string == 'children'){
    return localized.children;
  }
}

// Lấy chuỗi hiển thị giá theo Age
export function getAgePriceShow(string){
  if (string == 'adults'){
    return localized.adultPrice;
  } else if (string == 'children'){
    return localized.childrenPrice;
  }
}

// Lấy mã tour
export function getTourCode(id){
  let str = '';
  let zeroSize = 5-id.toString().length;
  for (let i=0; i<zeroSize; i++){
    str += '0';
  }
  str += id;
  return str;
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

// Định dạng ngày DD/MM/YYYY
export function dateFormat(date){
  return Moment(date).format('DD/MM/YYYY');
}

// Định dạng ngày DD/MM/YYYY
export function bookedDateFormat(date){
  return Moment(date).format('DD/MM/YYYY h:mm');
}

// Hiển thị giá tiền định dạng 100,000 VNĐ
export function priceFormat(price){
  return (
    <NumberFormat
      value={price}
      displayType={'text'}
      thousandSeparator={true}
      suffix={' VNĐ'}
      renderText={value => <Text>{value}</Text>}
    />
  );
}

export function getDiscountPrice(price, discount){
  return price - (price * discount);
}

export function shortenString(str, length){
  let ret = '';
  if (str.length > length){
    ret = str.substring(0,length-3) + ' ...';
  } else {
    ret = str;
  }
  return ret;
}

export function getTourTypeLocalize(id){
  if (id == 1){
    return localized.domestic;
  } else if (id == 2){
    return localized.international;
  }
}

export function slugify(str) {
  if (!str || str == '') {
    return 'unknown'
  }
  str = str
    .toLowerCase()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '')
  if (!str || str == '') {
    return 'u';
  }
  return str;
}

export function caculateRefund(money, startDay, isHoliday){
  let numDay = distanceFromDays(new Date(), new Date(startDay))
  return money * percentMoneyRefund(numDay, isHoliday) / 100
}

function distanceFromDays(dateEarlier, dateLater){
	return differenceInCalendarDays(dateLater, new Date(dateEarlier))
}

function percentMoneyRefund(numDay, holiday) {
    if (!holiday) {
        if (numDay >= 20) {
            return 100;
        } else if (15 <= numDay && numDay <= 19) {
            return 85;
        } else if (12 <= numDay && numDay <= 14) {
            return 70;
        } else if (8 <= numDay && numDay <= 11) {
            return 50;
        } else if (5 <= numDay && numDay <= 7) {
            return 30;
        } else if (2 <= numDay && numDay <= 4) {
            return 10;
        } else {
            return 0;
        }
    } else {
        if (numDay >= 30) {
            return 100;
        } else if (25 <= numDay && numDay <= 29) {
            return 85;
        } else if (22 <= numDay && numDay <= 24) {
            return 70;
        } else if (17 <= numDay && numDay <= 19) {
            return 50;
        } else if (8 <= numDay && numDay <= 16) {
            return 30;
        } else if (2 <= numDay && numDay <= 7) {
            return 10;
        } else {
            return 0;
        }
    }
}
