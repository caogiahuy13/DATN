import { AsyncStorage } from 'react-native';

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

export async function updateSex(sex){
  let URL = HOST + 'user/updateSex';
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
                                  sex: sex,
                                }),
                              });
                            })
}

export async function updateBirthdate(birthdate){
  let URL = HOST + 'user/updateBirthdate';
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
                                  birthdate: birthdate,
                                }),
                              });
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

export async function getTourById(id){
  let URL = HOST + 'tour/getById/' + id;
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
