import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS, TYPOGRAPHY, SPACING, commonStyles } from '../styles';

const TERMS_URL = 'https://www.google.com';
const PRIVACY_URL = 'https://www.google.com';

// Types
interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const router = useRouter();
  
  const handleGuestLogin = (): void => {
    router.push('/main-app');
  };

  const handleLinkPress = async (url: string, linkName: string): Promise<void> => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open ${linkName} link`);
      }
    } catch (error) {
      console.error(`Error opening ${linkName}:`, error);
      Alert.alert('Error', `Failed to open ${linkName}`);
    }
  };

  const handleTermsPress = (): void => {
    handleLinkPress(TERMS_URL, 'Terms and Conditions');
  };

  const handlePrivacyPress = (): void => {
    handleLinkPress(PRIVACY_URL, 'Privacy Policy');
  };

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
          Welcome to the best{'\n'}
          YouTube-based learning{'\n'}
          application
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
          <Text style={styles.buttonText}>Log in as guest</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By continuing, you agree with{'\n'}
          <Text 
            style={styles.linkText} 
            onPress={handleTermsPress}
            accessibilityRole="link"
            accessibilityLabel="Terms and conditions"
            accessibilityHint="Opens terms and conditions in browser"
          >
            Terms and Conditions
          </Text>
          {' '}and{' '}
          <Text 
            style={styles.linkText} 
            onPress={handlePrivacyPress}
            accessibilityRole="link"
            accessibilityLabel="Privacy policy"
            accessibilityHint="Opens privacy policy in browser"
          >
            Privacy Policy
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;


const LOGIN_COLORS = {
  background: '#8D99AE',
  primary: '#2B2D42',
  white: '#fff',
  text: '#fff',
  link: '#2B2D42',
} as const;

// LoginScreen specific sizes
const LOGIN_SIZES = {
  logo: { width: 292, height: 116 },
  icon: { width: 128, height: 128 },
  borderRadius: SPACING.borderRadius.lg,
  shadow: {
    shadowColor: '#000',
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
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: LOGIN_SIZES.logo.width,
    height: LOGIN_SIZES.logo.height,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerIcon: {
    width: LOGIN_SIZES.icon.width,
    height: LOGIN_SIZES.icon.height,
  },
  welcomeContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    color: LOGIN_COLORS.text,
    lineHeight: 24,
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
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  termsContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  termsText: {
    fontSize: 12,
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
