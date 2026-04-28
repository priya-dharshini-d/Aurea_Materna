import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { Colors } from '../constants/Colors';

export default function WaveformChart() {
  const width = Dimensions.get('window').width - 64; // accounting for padding

  // Create a wavy polyline simulating an EMG
  const points = [];
  for (let i = 0; i <= width; i += 10) {
    const y = 25 + Math.sin(i / 20) * 10 + (Math.random() * 5 - 2.5);
    points.push(`${i},${y}`);
  }

  return (
    <View style={{ height: 50, width, overflow: 'hidden' }}>
      <Svg height="50" width={width}>
        <Polyline
          points={points.join(' ')}
          fill="none"
          stroke={Colors.teal}
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
}
