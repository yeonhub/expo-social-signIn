import axios from 'axios';
import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import {appConfig} from '../../app.config'

const KAKAO_REST_API_KEY = appConfig.KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = appConfig.KAKAO_REDIRECT_URI;
const KAKAO_INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function HomeScreen() {

  function KakaoLoginWebView (data) {
    const exp = "code=";
    var condition = data.indexOf(exp);    
    if (condition != -1) {
      console.log(data);
      var authorize_code = data.substring(condition + exp.length);
      console.log(authorize_code);
      requestToken(authorize_code);
    };
  }

  const requestToken = async (authorize_code) => {
    var AccessToken = "none";
    axios ({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: KAKAO_REST_API_KEY,
        redirect_uri: KAKAO_REDIRECT_URI,
        code: authorize_code,
      },
    }).then((response) => {
      AccessToken = response.data.access_token;
      console.log(AccessToken);
      requestUserInfo(AccessToken);
    }).catch(function (error) {
      console.log('error', error);
    })
  };
  function requestUserInfo(AccessToken)  {
    axios ({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization : `Bearer ${AccessToken}`
      },
    }).then((response) => {
      console.log(response.data.kakao_account.profile.nickname);
    }).catch(function (error) {
      console.log('error', error);
    })
    return;
  }
  return (
    <View style={{flex :1 , justifyContent : 'center'}}>      
        <WebView
          style={{ flex: 1 }}
          originWhitelist={['*']}
          scalesPageToFit={false}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`
          }}
          injectedJavaScript={KAKAO_INJECTED_JAVASCRIPT}
          javaScriptEnabled
          onMessage={event => { KakaoLoginWebView(event.nativeEvent["url"]); }}
        />
    </View>
  )
}