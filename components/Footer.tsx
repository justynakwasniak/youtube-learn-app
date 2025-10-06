import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { HomeIcon, SearchIcon, COLORS } from '../utils';

const Footer = () => {
  const router = useRouter();
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handleHomePress = () => {
    setPressedButton('home');
    router.push('/main-app');
  };

  const handleSearchPress = () => {
    setPressedButton('search');
    router.push('/search');
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerItem} onPress={handleHomePress}>
        <HomeIcon 
          width={32} 
          height={32} 
          color={pressedButton === 'home' ? COLORS.white : COLORS.borderDark} 
        />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.footerItem} onPress={handleSearchPress}>
        <SearchIcon 
          width={32} 
          height={32} 
          color={pressedButton === 'search' ? COLORS.white : COLORS.borderDark} 
        />
        <Text style={styles.footerText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: COLORS.mutedBackground,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 12,
    paddingHorizontal: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  footerItem: {
    alignItems: 'center',
    flex: 1,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.borderDark,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    marginTop: 4,
  },
});

