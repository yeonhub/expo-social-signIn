import React, {useEffect, useRef, useState} from 'react';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import * as Location from 'expo-location';
import {FontAwesome} from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const INITIAL_REGION = {
  latitude: 37.37584937365653,
  longitude: 126.6676028917276,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export default function Map() {
  const mapRef = useRef<MapView>(null);

  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationGranted(true);
      } else {
        console.log('Location permission denied');
      }
    })();
  }, []);

  if (!locationGranted) {
    return (
      <View style={styles.container}>
        <Text>Requesting Location Permission</Text>
      </View>
    );
  }

  const onRegionChange = (region: Region) => {
    console.log(region);
  };

  const markers = [
    {
      no: 1,
      name: '마커1',
      mainText: 'marker main text',
      subText: 'marker sub text',
      latitude: 37.38344634885186,
      longitude: 126.6484240628779,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    },
    {
      no: 2,
      name: '마커2',
      mainText: 'marker main text',
      subText: 'marker sub text',
      latitude: 37.37822,
      longitude: 126.651,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    },
    {
      no: 3,
      name: '마커3',
      mainText: 'marker main text',
      subText: 'marker sub text',
      latitude: 37.37922,
      longitude: 126.652,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    },
    {
      no: 4,
      name: '마커4',
      mainText: 'marker main text',
      subText: 'marker sub text',
      latitude: 37.38022,
      longitude: 126.653,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    },
    {
      no: 5,
      name: '마커5',
      mainText: 'marker main text',
      subText: 'marker sub text',
      latitude: 37.38122,
      longitude: 126.654,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    },
    {
      no: 6,
      name: '마커6',
      mainText: 'marker main text',
      subText: 'marker sub text',
      latitude: 37.38222,
      longitude: 126.655,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    },
    {
      no: 7,
      name: '마커7',
      mainText: 'marker main text',
      subText: 'marker sub text',
      latitude: 37.38322,
      longitude: 126.656,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    },
    {
      no: 8,
      name: '마커8',
      mainText: 'marker main text',
      subText: 'marker sub text',
      latitude: 37.38422,
      longitude: 126.657,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    },
    {
      no: 9,
      name: '마커9',
      mainText: 'marker main text',
      subText: 'marker sub text',
      latitude: 37.38522,
      longitude: 126.658,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    },
    {
      no: 10,
      name: '마커10',
      mainText: 'marker main text',
      subText: 'marker sub text',
      latitude: 37.38622,
      longitude: 126.659,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    },
  ];

  return (
    <GestureHandlerRootView>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        ref={mapRef}
        onRegionChangeComplete={onRegionChange}
        maxZoomLevel={16}
        minZoomLevel={13}
        mapPadding={{top : 50, bottom:90}}
        >
        {markers.map((marker) => (
          <Marker
            key={marker.no}
            coordinate={marker}
            // image={require('../../assets/images/ic_location.png')}
            pinColor="orange"
            >
            <Callout style={styles.marker}>
              <View style={styles.markerContainer}>
                <Text style={{fontSize: 20}}>{marker.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome
                    style={{marginRight: 10}}
                    name="star"
                    size={20}
                    color="orange"
                  />
                  <Text>{marker.mainText}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome
                    style={{marginRight: 10}}
                    name="folder-open"
                    size={20}
                    color="gray"
                  />
                  <Text>{marker.subText}</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <BottomSheet snapPoints={['10%', '50%']} >
        <Text style={{fontSize : width / 20, margin : 10}}>
          show list
        </Text>
        {markers.map((marker) => (
          <Text key={marker.no}>{marker.name}</Text>
        ))}
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    justifyContent: 'center',
    width: 300,
    height: 100,
    backgroundColor: 'white',
  },
  markerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
});
