import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS, TYPOGRAPHY, SPACING, commonStyles } from '../styles';
import { useTranslation } from 'react-i18next';
import { useExternalLink } from '../hooks/useExternalLink';
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = (size: number) => (SCREEN_WIDTH / 375) * size;

const normalizeFont = (size: number) => {
  const newSize = scale(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const TERMS_URL = 'https://www.google.com';
const PRIVACY_URL = 'https://www.google.com';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { t } = useTranslation();
  const router = useRouter();
  
  const handleGuestLogin = (): void => {
    console.log('Navigating to mainapp...');
    try {
      router.push({ pathname: '/mainapp' });
    } catch (error) {
      console.error('Navigation error:', error);
      router.push('/mainapp');
    }
  };

 const { openLink } = useExternalLink();

const handleTermsPress = () => openLink(TERMS_URL, 'Terms and Conditions');
const handlePrivacyPress = () => openLink(PRIVACY_URL, 'Privacy Policy');


  return (
    <SafeAreaView style={styles.container}>
  
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.iconContainer}>
        <Image 
          source={require('../assets/app-icon.png')} 
          style={styles.centerIcon}
          resizeMode="contain"
        />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          {t('login.welcome1')}{'\n'}
          {t('login.welcome2')}{'\n'}
          {t('login.welcome3')}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.guestButton} 
          onPress={handleGuestLogin}
          accessibilityRole="button"
          accessibilityLabel="Log in as guest"
          accessibilityHint="Continue to the app without creating an account"
        >
          <Text style={styles.buttonText}>{t('login.guest')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          {t('login.termsPrompt')}{'\n'}
          <Text 
            style={styles.linkText} 
            onPress={handleTermsPress}
            accessibilityRole="link"
            accessibilityLabel="Terms and conditions"
            accessibilityHint="Opens terms and conditions in browser"
          >
            {t('login.terms')}
          </Text>
          {' '}and{' '}
          <Text 
            style={styles.linkText} 
            onPress={handlePrivacyPress}
            accessibilityRole="link"
            accessibilityLabel="Privacy policy"
            accessibilityHint="Opens privacy policy in browser"
          >
            {t('login.privacy')}
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;


const LOGIN_COLORS = {
  background: '#101114',
  primary: COLORS.borderDark,
  white: COLORS.white,
  text: COLORS.white,
  link: COLORS.borderDark,
} as const;

const LOGIN_SIZES = {
  logo: { width: 292, height: 116 },
  icon: { width: 128, height: 128 },
  borderRadius: SPACING.borderRadius.lg,
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
} as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LOGIN_COLORS.background,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: 40,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: scale(292),
    height: scale(116),
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerIcon: {
    width: scale(128),
    height: scale(128),
  },
  welcomeContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginBottom: scale(30),
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: normalizeFont(18),
    fontWeight: '600',
    textAlign: 'left',
    color: LOGIN_COLORS.text,
    lineHeight: normalizeFont(24),
    fontFamily: 'Poppins_600SemiBold',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  guestButton: {
    backgroundColor: LOGIN_COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: LOGIN_SIZES.borderRadius,
    alignItems: 'center',
    ...LOGIN_SIZES.shadow,
  },
  buttonText: {
    color: LOGIN_COLORS.white,
    fontSize: normalizeFont(16),
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  termsContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  termsText: {
    fontSize: normalizeFont(12),
    color: LOGIN_COLORS.text,
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: 'Poppins_400Regular',
  },
  linkText: {
    color: LOGIN_COLORS.link,
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
  },
});
