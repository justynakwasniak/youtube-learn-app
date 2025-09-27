import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

const Footer = () => {
  const router = useRouter();

  const handleHomePress = () => {
    router.push('/main-app');
  };

  const handleSearchPress = () => {
    router.push('/search');
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerItem} onPress={handleHomePress}>
        <Text style={styles.footerIcon}>🏠</Text>
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.footerItem} onPress={handleSearchPress}>
        <Text style={styles.footerIcon}>🔍</Text>
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
  footerIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
  },
});

