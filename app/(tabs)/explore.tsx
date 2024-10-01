import axios from 'axios';
import React from 'react';
import { WebView } from 'react-native-webview';
import {appConfig} from '../../app.config'


const NAVER_CLIENT_ID = appConfig.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = appConfig.NAVER_CLIENT_SECRET;
const NAVER_REDIRECT_URL = encodeURI(appConfig.NAVER_REDIRECT_URL);
const response_type = 'code';

function generateRandomString() {
  let randomString = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 26; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return randomString;
}

const state = generateRandomString();

export default function NaverLogin() {
  function handleWebViewNavigationStateChange(newNavState) {
    const { url } = newNavState;
    if (!url) return;

    if (url.includes('code=')) {
      const code = url.split('code=')[1];
      console.log(`code : ` , code);
      requestToken(code);
    }
  }

  const requestToken = async (code) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://nid.naver.com/oauth2.0/token',
        data: `grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&code=${code}&state=${state}&redirect_uri=${NAVER_REDIRECT_URL}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
  
      const { access_token } = response.data;
      requestUserInfo(access_token);
    } catch (error) {
      console.log('error', error);
    }
  };

  const requestUserInfo = async (accessToken) => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://openapi.naver.com/v1/nid/me',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response.data.response);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <WebView
      source={{
        uri: `https://nid.naver.com/oauth2.0/authorize?response_type=${response_type}&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URL}&state=${state}`,
      }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
    />
  );
}