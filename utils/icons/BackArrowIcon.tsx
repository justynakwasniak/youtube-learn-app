import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SvgIconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

const BackArrowIcon: React.FC<SvgIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = '#007AFF',
  style 
}) => (
  <View style={[styles.container, style]}>
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <Path
        d="M28.8 16H3.20001M3.20001 16L14.4 4.80005M3.20001 16L14.4 27.2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export default BackArrowIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});


