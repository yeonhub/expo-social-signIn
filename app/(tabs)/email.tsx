import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ['example', 'testing'],
});

export default function Email() {
  const [loaded, setLoaded] = useState(false);
  const [adCompleted, setAdCompleted] = useState(false);

  const sendEmail = async () => {
    const result = await MailComposer.composeAsync({
      recipients: ['example@example.com'],
      subject: 'Hello from Expo',
      body: 'This is a test email.',
    });

    // 이메일을 전송한 후 버튼을 다시 숨기기
    if (result.status === 'sent') {
      setAdCompleted(false);  // 이메일 전송 후 버튼 숨김
    }
  };

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
      console.log('Rewarded ad loaded');
    });

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward:', reward);
        setAdCompleted(true); // 광고 완료 후 이메일 버튼 활성화
      }
    );

    rewarded.load(); // 광고 로드

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  const handleShowAd = () => {
    if (loaded) {
      rewarded.show();
    } else {
      console.log('Ad not loaded yet');
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      {loaded ? (
        <Pressable
          onPress={handleShowAd}
          style={{ marginBottom: 50 }}
        >
          <Text>ad</Text>
        </Pressable>
      ) : (
        <Text>Loading ad...</Text>
      )}

      {adCompleted && (
        <Pressable onPress={sendEmail} style={{ marginTop: 50 }}>
          <Text>send email</Text>
        </Pressable>
      )}
    </View>
  );
}
