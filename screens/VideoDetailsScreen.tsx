import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Video from 'react-native-video';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');

const VideoDetailsScreen = () => {
  const router = useRouter();
  const { videoId, title, views, duration } = useLocalSearchParams();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(12500);
  const [isLiked, setIsLiked] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header z przyciskiem wstecz */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Video Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Odtwarzacz wideo */}
        <View style={styles.videoContainer}>
          <Video
            source={require('../assets/video/broadchurch.mp4')}
            style={styles.video}
            controls={true}
            resizeMode="contain"
            paused={!isPlaying}
            onLoad={() => setIsPlaying(true)}
            onError={(error) => console.log('Video error:', error)}
          />
        </View>

        {/* Tytuł filmu */}
        <View style={styles.titleContainer}>
          <Text style={styles.videoTitle}>
            {title || 'React Native Tutorial for Beginners'}
          </Text>
        </View>

        {/* Informacje o kanale */}
        <View style={styles.channelInfo}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/40x40/FF6B6B/FFFFFF?text=RN' }} 
            style={styles.channelAvatar}
          />
          <View style={styles.channelDetails}>
            <Text style={styles.channelName}>React Native Academy</Text>
            <Text style={styles.subscribers}>1.2M subscribers</Text>
          </View>
        </View>

        {/* Details i Notes */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Details</Text>
            <Text style={styles.detailValue}>Educational • Programming</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Notes</Text>
            <Text style={styles.detailValue}>Beginner friendly</Text>
          </View>
        </View>

        {/* Opis */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            Learn React Native from scratch with this comprehensive tutorial. 
            We'll cover the basics of mobile app development, component creation, 
            state management, and navigation. Perfect for beginners who want to 
            start building mobile applications using React Native.
          </Text>
        </View>

        {/* Statystyki */}
        <View style={styles.statisticsContainer}>
          <Text style={styles.statisticsTitle}>Statistics</Text>
          <View style={styles.statsButtons}>
            <TouchableOpacity style={styles.statButton}>
              <Text style={styles.statIcon}>👁️</Text>
              <Text style={styles.statText}>{views || '1.2M'} views</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.statButton, isLiked && styles.likedButton]} 
              onPress={handleLike}
            >
              <Text style={styles.statIcon}>{isLiked ? '❤️' : '🤍'}</Text>
              <Text style={[styles.statText, isLiked && styles.likedText]}>
                {formatNumber(likes)} likes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Stopka */}
      <Footer />
    </SafeAreaView>
  );
};

export default VideoDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginTop: 20,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 20,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Poppins_600SemiBold',
  },
  placeholder: {
    width: 36,
  },
  content: {
    flex: 1,
  },
  videoContainer: {
    width: '100%',
    height: 220,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    lineHeight: 24,
    fontFamily: 'Poppins_600SemiBold',
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  channelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  channelDetails: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
    fontFamily: 'Poppins_600SemiBold',
  },
  subscribers: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  detailsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'Poppins_600SemiBold',
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Poppins_600SemiBold',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontFamily: 'Poppins_400Regular',
  },
  statisticsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statisticsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  statsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 120,
    justifyContent: 'center',
  },
  likedButton: {
    backgroundColor: '#FFE5E5',
  },
  statIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  statText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'Poppins_500Medium',
  },
  likedText: {
    color: '#FF6B6B',
  },
});
