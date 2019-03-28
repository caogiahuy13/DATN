import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { HOST } from '../constants/index';

export async function login(username, password){
  let URL = HOST + 'user/login';
  return await fetch(URL, {
                            method: 'POST',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              username: username,
                              password: password,
                            }),
                          });
}

export async function loginWithFacebook(userData){
  let URL = HOST + 'user/loginWithFacebook';
  return await fetch(URL, {
                            method: 'POST',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              userData: userData,
                            }),
                          });
}

export async function register(fullname, password, phone, email){
  let URL = HOST + 'user/register';
  return await fetch(URL, {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        fullname: fullname,
                        password: password,
                        phone: phone,
                        email: email,
                      }),
                    });
}

export async function me(){
  let URL = HOST + 'user/me';
  return await AsyncStorage.getItem('userToken')
                            .then((data) => {
                              return fetch(URL, {
                                method: 'GET',
                                headers: {
                                  'Accept': 'application/json',
                                  'authorization': data,
                                  'Content-Type': 'application/json',
                                },
                              });
                            })

}

export async function logout(){
  let URL = HOST + 'user/logout';
  return await AsyncStorage.getItem('userToken')
                            .then((data) => {
                              return fetch(URL, {
                                method: 'GET',
                                headers: {
                                  'Accept': 'application/json',
                                  'authorization': data,
                                  'Content-Type': 'application/json',
                                },
                              });
                            })
}

export async function forgetPassword(email){
  let URL = HOST + 'user/forgetPassword';
  return await fetch(URL, {
                            method: 'POST',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              email: email,
                            }),
                          })
}

export async function updatePassword(old_password, new_password){
  let URL = HOST + 'user/updatePassword';
  return await AsyncStorage.getItem('userToken')
                            .then((data) => {
                              return fetch(URL, {
                                method: 'PUT',
                                headers: {
                                  'Accept': 'application/json',
                                  'authorization': data,
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  old_password: old_password,
                                  new_password: new_password,
                                }),
                              });
                            })
}

export async function userUpdate(data){
  let URL = HOST + 'user/update';
  return await AsyncStorage.getItem('userToken')
                            .then((auth) => {
                              return fetch(URL, {
                                method: 'PUT',
                                headers: {
                                  'Accept': 'application/json',
                                  'authorization': auth,
                                  'Content-Type': 'multipart/form-data',
                                },
                                body: data,
                              });
                            })
}

export async function getTourById(id){
  let URL = HOST + 'tour/getById/' + id;
  return await fetch(URL);
}

export async function getImageByTourId(id){
  let URL = HOST + 'tour_image/getByTour/' + id;
  return await fetch(URL);
}

export async function getNearMe(latitude, longitude, distance){
  let URL = HOST + 'location/getNearMe?&tour=true';
  return await fetch(URL, {
                            method: 'POST',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              lat: latitude,
                              lng: longitude,
                              distance: distance,
                            }),
                          })
}

export async function getRouteByTour(id){
  let URL = HOST + 'route/getByTour/' + id;
  return await fetch(URL);
}

export async function getAllTour(){
  let URL = HOST + 'tour/getAll';
  return await fetch(URL);
}

export async function getTourTurnById(id){
  let URL = HOST + 'tour_turn/getById/' + id;
  return await fetch(URL);
}

export async function getAllTourTurnWithoutPagination(){
  let URL = HOST + 'tour_turn/getAllWithoutPagination';
  return await fetch(URL);
}

export async function getAllTourTurn(page=1,per_page=4,isUniqueTour=false){
  let URL = HOST + 'tour_turn/getAll?page=' + page + '&per_page=' + per_page + '&isUniqueTour=' + isUniqueTour;
  return await fetch(URL);
}

export async function getCommentByTour(id){
  let URL = HOST + 'comment/getByTour/' + id;
  return await fetch(URL);
}

export async function createRequest(name, email, message){
  let URL = HOST + 'request/create';
  return await fetch(URL, {
                            method: 'POST',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              name: name,
                              email: email,
                              message: message,
                            }),
                          })
}

export async function bookNewTour(info){
  // console.log(info);
  let URL = HOST + 'book_tour/book_new_tour';
  return await AsyncStorage.getItem('userToken')
                            .then((auth) => {
                              return fetch(URL, {
                                method: 'POST',
                                headers: {
                                  'Accept': 'application/json',
                                  'authorization': auth,
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  idTour_Turn: info.idTour_Turn,
                                  payment: info.payment,
                                  fullname: info.fullname,
                                  phone: info.phone,
                                  email: info.email,
                                  address: info.address,
                                  passengers: info.passengers,
                                  total_pay: info.total_pay,
                                }),
                              });
                            })
}

export async function getHistoryByUser(){
  let URL = HOST + 'book_tour/getHistoryBookTourByUser';
  return await AsyncStorage.getItem('userToken')
                            .then((auth) => {
                              return fetch(URL, {
                                method: 'GET',
                                headers: {
                                  'Accept': 'application/json',
                                  'authorization': auth,
                                  'Content-Type': 'application/json',
                                },
                              });
                            })
}

export async function getPassengerInBookTourHistory(id){
  let URL = HOST + 'book_tour/getPassengerInBookTourHistory/' + id;
  return await AsyncStorage.getItem('userToken')
                            .then((auth) => {
                              return fetch(URL, {
                                method: 'GET',
                                headers: {
                                  'Accept': 'application/json',
                                  'authorization': auth,
                                  'Content-Type': 'application/json',
                                },
                              });
                            })
}

export async function getHistoryBookTourById(id){
  let URL = HOST + 'book_tour/getHistoryBookTourById/' + id;
  return await AsyncStorage.getItem('userToken')
                            .then((auth) => {
                              return fetch(URL, {
                                method: 'GET',
                                headers: {
                                  'Accept': 'application/json',
                                  'authorization': auth,
                                  'Content-Type': 'application/json',
                                },
                              });
                            })
}
