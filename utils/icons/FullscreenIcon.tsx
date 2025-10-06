import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SvgIconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

const FullscreenIcon: React.FC<SvgIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = '#fff',
  style 
}) => (
  <View style={[styles.container, style]}>
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <Path
        d="M12.0001 5.33327H5.33343L5.33337 12M26.6667 11.9999V5.33329L20 5.33325M20 26.6666H26.6667V20M5.33337 20V26.6666H12.0001"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export default FullscreenIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});


