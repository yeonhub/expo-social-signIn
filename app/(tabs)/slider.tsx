import React from 'react';
import {View} from 'react-native';
import Slider from '@react-native-community/slider';

export default function App() {
  const [value, setValue] = React.useState(50);

  return (
    <View>
      <Slider
        style={{marginTop : "50%", width: 200, height: 40}}
        minimumValue={1}
        maximumValue={100}
        value={value}
        onValueChange={setValue}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
}
