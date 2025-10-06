import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SvgIconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

const SearchIcon: React.FC<SvgIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = '#2B2D42',
  style 
}) => (
  <View style={[styles.container, style]}>
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <Path
        d="M21.0607 21.0815L28 28M24 14C24 19.5228 19.5228 24 14 24C8.47715 24 4 19.5228 4 14C4 8.47715 8.47715 4 14 4C19.5228 4 24 8.47715 24 14Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export default SearchIcon;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});


