import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
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
    </Tabs>
  );
}
