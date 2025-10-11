import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../styles';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handleHomePress = () => {
    setPressedButton('home');
    router.push('/mainapp');
  };

  const handleSearchPress = () => {
    setPressedButton('search');
    router.push('/search');
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerItem} onPress={handleHomePress}>
        <Text style={[styles.footerText, { fontSize: 20 }]}>🏠</Text>
        <Text style={styles.footerText}>{t('common.home')}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.footerItem} onPress={handleSearchPress}>
        <Text style={[styles.footerText, { fontSize: 20 }]}>🔍</Text>
        <Text style={styles.footerText}>{t('common.search')}</Text>
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

