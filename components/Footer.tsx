import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { HomeIcon, SearchIcon } from '../utils/SvgIcon';

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
          color={pressedButton === 'home' ? '#ffffff' : '#2B2D42'} 
        />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.footerItem} onPress={handleSearchPress}>
        <SearchIcon 
          width={32} 
          height={32} 
          color={pressedButton === 'search' ? '#ffffff' : '#2B2D42'} 
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
    backgroundColor: '#8D99AE',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
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
    color: '#2B2D42',
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    marginTop: 4,
  },
});

