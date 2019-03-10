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
