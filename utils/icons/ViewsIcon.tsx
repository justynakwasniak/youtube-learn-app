import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SvgIconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

const ViewsIcon: React.FC<SvgIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = '#333',
  style 
}) => (
  <View style={[styles.container, style]}>
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <Path
        d="M9.33333 28L16 22.6667L22.6667 28M10.4 22.6667H21.6C23.8403 22.6667 24.9603 22.6667 25.816 22.2307C26.5687 21.8472 27.1805 21.2353 27.564 20.4827C28 19.6269 28 18.5069 28 16.2667V10.4C28 8.15979 28 7.03968 27.564 6.18404C27.1805 5.43139 26.5687 4.81947 25.816 4.43597C24.9603 4 23.8403 4 21.6 4H10.4C8.15979 4 7.03968 4 6.18404 4.43597C5.43139 4.81947 4.81947 5.43139 4.43597 6.18404C4 7.03968 4 8.15979 4 10.4V16.2667C4 18.5069 4 19.6269 4.43597 20.4827C4.81947 21.2353 5.43139 21.8472 6.18404 22.2307C7.03968 22.6667 8.15979 22.6667 10.4 22.6667Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export default ViewsIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});


