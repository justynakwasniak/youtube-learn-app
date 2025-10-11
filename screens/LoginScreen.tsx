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
  background: '#8D99AE',         
  card: '#ffffff',             
  primary: '#246bfd',           
  white: '#fff',
  text: '#23305b',             
  link: '#246bfd',
  shadow: 'rgba(36,107,253,0.08)',
  danger: '#FF6363',
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
    paddingVertical: 38,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  logo: {
    width: scale(210),
    height: scale(80),
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  centerIcon: {
    width: scale(104),
    height: scale(104),
    borderRadius: 20,
  },
  welcomeContainer: {
    marginTop: scale(10),
    marginBottom: scale(18),
    backgroundColor: LOGIN_COLORS.card,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: normalizeFont(19),
    fontWeight: '600',
    textAlign: 'left',
    color: LOGIN_COLORS.text,
    lineHeight: normalizeFont(27),
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 22,
  },
  guestButton: {
    backgroundColor: '#2B2D42',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: LOGIN_COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 2,
  },
  buttonText: {
    color: LOGIN_COLORS.white,
    fontSize: normalizeFont(16),
    fontWeight: '700',
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: 0.2,
  },
  termsContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  termsText: {
    fontSize: normalizeFont(12),
    color: LOGIN_COLORS.text,
    textAlign: 'center',
    lineHeight: 17,
    fontFamily: 'Poppins_400Regular',
    opacity: 0.96,
  },
  linkText: {
    color: LOGIN_COLORS.link,
    textDecorationLine: 'underline',
    fontWeight: '700',
    fontFamily: 'Poppins_500Medium',
  },
});
