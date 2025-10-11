import { Linking, Alert } from 'react-native';

export const useExternalLink = () => {
  const openLink = async (url: string, linkName?: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open ${linkName || 'link'}`);
      }
    } catch (error) {
      console.error(`Error opening ${linkName}:`, error);
      Alert.alert('Error', `Failed to open ${linkName}`);
    }
  };

  return { openLink };
};
