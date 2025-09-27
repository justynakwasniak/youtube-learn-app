import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const MainScreen = () => {
  const router = useRouter();
  
  const handleGuestLogin = () => {
    router.push('/main-app');
  };

  const handleTermsPress = () => {
    // Otwiera Google po kliknięciu w Terms and Conditions
    Linking.openURL('https://www.google.com');
  };

  const handlePrivacyPress = () => {
    // Otwiera Google po kliknięciu w Privacy Policy
    Linking.openURL('https://www.google.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo na górze */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Ikona w środku */}
      <View style={styles.iconContainer}>
        <Image 
          source={require('../assets/app-icon.png')} 
          style={styles.centerIcon}
          resizeMode="contain"
        />
      </View>

      {/* Tekst powitalny */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Welcome to the best{'\n'}
          YouTube-based learning{'\n'}
          application
        </Text>
      </View>

      {/* Przycisk logowania jako gość */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
          <Text style={styles.buttonText}>Log in as guest</Text>
        </TouchableOpacity>
      </View>

      {/* Tekst z warunkami */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By continuing, you agree with{'\n'}
          <Text style={styles.linkText} onPress={handleTermsPress}>
            terms and conditions
          </Text>
          {' '}and{' '}
          <Text style={styles.linkText} onPress={handlePrivacyPress}>
            privacy policy
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8D99AE',
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
    width: 292,
    height: 116,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerIcon: {
    width: 128,
    height: 128,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    color: '#fff',
    lineHeight: 24,
    fontFamily: 'Poppins_600SemiBold',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  guestButton: {
    backgroundColor: '#2B2D42',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
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
    color: '#fff',
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: 'Poppins_400Regular',
  },
  linkText: {
    color: '#2B2D42',
    textDecorationLine: 'underline',
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
  },
});
