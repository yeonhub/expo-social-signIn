import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        initialRouteName="map"
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Map',
            tabBarIcon: ({color, focused}) => (
              <TabBarIcon
                name={focused ? 'map' : 'map-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="kakao"
          options={{
            title: 'Kakao',
            tabBarIcon: ({color, focused}) => (
              <TabBarIcon
                name={focused ? 'add-circle' : 'add-circle-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="naver"
          options={{
            title: 'Naver',
            tabBarIcon: ({color, focused}) => (
              <TabBarIcon
                name={focused ? 'airplane' : 'airplane-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="qr"
          options={{
            title: 'QR',
            tabBarIcon: ({color, focused}) => (
              <TabBarIcon
                name={focused ? 'camera' : 'camera-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="slider"
          options={{
            title: 'Slider',
            tabBarIcon: ({color, focused}) => (
              <TabBarIcon
                name={focused ? 'brush' : 'brush-outline'}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="email"
          options={{
            title: 'Email',
            tabBarIcon: ({color, focused}) => (
              <TabBarIcon
                name={focused ? 'mail' : 'mail-outline'}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <BannerAd
        unitId={TestIds.BANNER}
        // unitId="ca-app-pub-7073437242899115/3948459307"
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
          networkExtras: {
            collapsible: 'bottom',
          },
        }}
      />
    </>
  );
}
