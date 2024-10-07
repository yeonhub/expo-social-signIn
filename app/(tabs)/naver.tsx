import axios, {AxiosResponse} from 'axios';
import React from 'react';
import {WebView, WebViewNavigation} from 'react-native-webview';
import {appConfig} from '../../app.config';
import {Text, View} from 'react-native';

const NAVER_CLIENT_ID = appConfig.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = appConfig.NAVER_CLIENT_SECRET;
const NAVER_REDIRECT_URL = encodeURI(appConfig.NAVER_REDIRECT_URL);
const response_type = 'code';

const generateRandomString = () => {
  let randomString = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 26; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return randomString;
};

const state = generateRandomString();

export default function NaverLogin() {
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [userInfo, setUserInfo] = React.useState<any | null>(null);

  const handleWebViewNavigationStateChange = (
    newNavState: WebViewNavigation,
  ) => {
    const {url} = newNavState;
    if (!url) return;

    if (url.includes('code=')) {
      const code = url.split('code=')[1];
      // console.log(`code : ` , code);
      requestToken(code);
    }
  };

  const requestToken = async (code: string) => {
    try {
      const response: AxiosResponse<{access_token: string}> = await axios({
        method: 'post',
        url: 'https://nid.naver.com/oauth2.0/token',
        data: `grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&code=${code}&state=${state}&redirect_uri=${NAVER_REDIRECT_URL}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const {access_token} = response.data;
      requestUserInfo(access_token);
    } catch (error) {
      console.log('error', error);
    }
  };

  interface NaverUserResponse {
    response: {
      email: string;
      id: string;
      nickname: string;
    };
  }

  const requestUserInfo = async (accessToken: string) => {
    try {
      const response: AxiosResponse<NaverUserResponse> = await axios({
        method: 'GET',
        url: 'https://openapi.naver.com/v1/nid/me',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAccessToken(accessToken);
      setUserInfo(response.data.response);
      console.log(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {accessToken ? (
        <View>
          <Text>네이버 로그인 성공</Text>
          <Text>토큰: {accessToken}</Text>
          <Text>유저 정보 : {userInfo?.id} </Text>
        </View>
      ) : (
        <WebView
          source={{
            uri: `https://nid.naver.com/oauth2.0/authorize?response_type=${response_type}&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URL}&state=${state}`,
          }}
          overScrollMode="never"
          incognito={true}
          javaScriptEnabled={true}
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      )}
    </View>
  );
}
