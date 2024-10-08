import axios, {AxiosResponse} from 'axios';
import React from 'react';
import {WebView, WebViewNavigation} from 'react-native-webview';
import {appConfig} from '../../signConfig';
import {Text, View} from 'react-native';

const KAKAO_REST_API_KEY = appConfig.KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = encodeURI(appConfig.KAKAO_REDIRECT_URI);

export default function KakaoLogin() {
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [userInfo, setUserInfo] = React.useState<any | null>(null);

  const handleWebViewNavigationStateChange = (
    newNavState: WebViewNavigation,
  ) => {
    const {url} = newNavState;
    if (!url) return;

    if (url.includes('code=')) {
      const code = url.split('code=')[1];
      // console.log(`Kakao authorization code: ${code}`);
      requestToken(code);
    }
  };
  const requestToken = async (code: string) => {
    try {
      const response: AxiosResponse<{access_token: string}> = await axios({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        params: {
          grant_type: 'authorization_code',
          client_id: KAKAO_REST_API_KEY,
          redirect_uri: KAKAO_REDIRECT_URI,
          code: code,
        },
      });
      const {access_token} = response.data;
      // console.log(`Kakao access token: ${access_token}`);
      requestUserInfo(access_token);
    } catch (error) {
      console.log('error', error);
    }
  };
  interface KakaoProfile {
    is_default_nickname: boolean;
    nickname: string;
    // TODO: 카카오계정(이메일) 정보를 추가 시 타입 정의
  }
  interface KakaoAccount {
    profile: KakaoProfile;
    profile_nickname_needs_agreement: boolean;
  }
  interface KakaoUserResponse {
    connected_at: string;
    id: number;
    kakao_account: KakaoAccount;
    properties: {
      nickname: string;
    };
  }
  const requestUserInfo = async (accessToken: string) => {
    try {
      const response: AxiosResponse<KakaoUserResponse> = await axios({
        method: 'GET',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setAccessToken(accessToken);
      setUserInfo(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {accessToken ? (
        <View>
          <Text>카카오 로그인 성공</Text>
          <Text>토큰: {accessToken}</Text>
          <Text>유저 정보 : {userInfo?.id} </Text>
        </View>
      ) : (
        <WebView
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`,
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
