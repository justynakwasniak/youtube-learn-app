import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
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
import Video, { VideoRef } from 'react-native-video';
import Footer from '../components/Footer';
import { apiService } from '../utils/api';

const { width } = Dimensions.get('window');

// Types
interface VideoDetailsScreenProps {}

interface VideoDetails {
  title: string;
  description: string;
  channelTitle: string;
  viewCount: string;
  likeCount: string;
  publishedAt: string;
}

interface YouTubeVideoDetailsResult {
  items?: Array<{
    snippet: {
      title: string;
      description: string;
      channelTitle: string;
      publishedAt: string;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
    };
  }>;
}

const VideoDetailsScreen: React.FC<VideoDetailsScreenProps> = () => {
  const router = useRouter();
  const { videoId, title } = useLocalSearchParams();
  const videoRef = useRef<VideoRef>(null);

  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(12500);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const formatYouTubeVideoDetails = useCallback((results: YouTubeVideoDetailsResult): VideoDetails | null => {
    if (!results.items || results.items.length === 0) {
      return null;
    }

    const video = results.items[0];
    return {
      title: video.snippet.title,
      description: video.snippet.description,
      channelTitle: video.snippet.channelTitle,
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      publishedAt: video.snippet.publishedAt,
    };
  }, []);

  // Pobierz szczegóły wideo z API (tytuł, opis, kanał, statystyki)
  useEffect(() => {
    const fetchVideoDetails = async (): Promise<void> => {
      if (!videoId) return;

      setIsLoading(true);
      try {
        const details = await apiService.getVideoDetails(videoId as string) as YouTubeVideoDetailsResult;
        const formattedDetails = formatYouTubeVideoDetails(details);
        
        if (formattedDetails) {
          setVideoDetails(formattedDetails);
          setLikes(parseInt(formattedDetails.likeCount) || 12500);
        }
      } catch (error) {
        console.error('Error fetching video details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId, formatYouTubeVideoDetails]);

  const handleBack = useCallback((): void => {
    router.back();
  }, [router]);

  const handleLike = useCallback((): void => {
    setLikes(prev => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  }, [isLiked]);

  const handleFullscreen = useCallback((): void => {
    videoRef.current?.presentFullscreenPlayer();
  }, []);

  const formatNumber = useCallback((num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }, []);

  // Memoize formatted values to prevent unnecessary recalculations
  const formattedViewCount = useMemo(() => 
    videoDetails?.viewCount ? formatNumber(parseInt(videoDetails.viewCount)) : '0', 
    [videoDetails?.viewCount, formatNumber]
  );

  const displayTitle = useMemo(() => 
    videoDetails?.title || title || 'Default Video Title', 
    [videoDetails?.title, title]
  );

  const displayChannelTitle = useMemo(() => 
    videoDetails?.channelTitle || "Unknown channel", 
    [videoDetails?.channelTitle]
  );

  const displayDescription = useMemo(() => 
    videoDetails?.description || "No description available", 
    [videoDetails?.description]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          accessibilityHint="Returns to previous screen"
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Odtwarzacz wideo */}
        <View style={styles.videoContainer}>
          <Video
            source={require('../assets/video/broadchurch.mp4')} // 🔥 asset jako źródło
            style={styles.video}
            controls={true}
            resizeMode="contain"
            paused={!isPlaying}
            onLoad={() => setIsPlaying(true)}
            onError={(error) => console.log('Video error:', error)}
            onBuffer={({ isBuffering }) => setIsBuffering(isBuffering)}
            onFullscreenPlayerWillPresent={() => console.log("Fullscreen ON")}
            onFullscreenPlayerWillDismiss={() => console.log("Fullscreen OFF")}
            ref={videoRef}
          />
          {isBuffering && (
            <View style={styles.bufferOverlay}>
              <Text style={{ color: '#fff' }}>⏳ Buffering...</Text>
            </View>
          )}
          {/* Przycisk fullscreen */}
          <TouchableOpacity 
            style={styles.fullscreenButton} 
            onPress={handleFullscreen}
            accessibilityRole="button"
            accessibilityLabel="Fullscreen"
            accessibilityHint="Opens video in fullscreen mode"
          >
            <Text style={styles.fullscreenIcon}>⛶</Text>
          </TouchableOpacity>
        </View>

        {/* Tytuł */}
        <View style={styles.titleContainer}>
          <Text style={styles.videoTitle}>
            {displayTitle}
          </Text>
        </View>

        {/* Kanał */}
        <View style={styles.channelInfo}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40x40/FF6B6B/FFFFFF?text=RN' }}
            style={styles.channelAvatar}
            accessibilityLabel={`Channel avatar for ${displayChannelTitle}`}
          />
          <View style={styles.channelDetails}>
            <Text style={styles.channelName}>
              {displayChannelTitle}
            </Text>
          </View>
        </View>

        {/* Sekcje */}
        <View style={styles.detailsContainer}>
          <View style={[styles.detailItem, styles.detailsItem]}>
            <Text style={styles.detailLabel}>Details</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Notes</Text>
          </View>
        </View>

        {/* Opis */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText} numberOfLines={7}>
            {displayDescription}
          </Text>
        </View>

        {/* Statystyki */}
        <View style={styles.statisticsContainer}>
          <Text style={styles.statisticsTitle}>Statistics</Text>
          <View style={styles.statsButtons}>
            <TouchableOpacity 
              style={styles.statButton}
              accessibilityRole="button"
              accessibilityLabel={`${formattedViewCount} views`}
            >
              <Text style={styles.statIcon}>👁️</Text>
              <Text style={styles.statText}>
                {formattedViewCount} views
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.statButton, isLiked && styles.likedButton]}
              onPress={handleLike}
              accessibilityRole="button"
              accessibilityLabel={`${formatNumber(likes)} likes`}
              accessibilityHint={isLiked ? "Unlike this video" : "Like this video"}
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

// Design tokens
const COLORS = {
  background: '#fff',
  primary: '#007AFF',
  secondary: '#8D99AE',
  border: '#e0e0e0',
  text: '#333',
  textSecondary: '#666',
  textMuted: '#999',
  white: '#fff',
  red: '#FF6B6B',
  overlay: 'rgba(0, 0, 0, 0.7)',
} as const;

const SIZES = {
  borderRadius: 16,
  padding: {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
  },
  margin: {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
} as const;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding.large,
    paddingVertical: SIZES.padding.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: { 
    padding: SIZES.padding.small 
  },
  backIcon: { 
    fontSize: 20, 
    color: COLORS.primary 
  },
  content: { flex: 1 },
  videoContainer: { width: '100%', height: 220, backgroundColor: '#000' },
  video: { width: '100%', height: '100%' },
  fullscreenButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: COLORS.overlay,
    borderRadius: 20,
    padding: 6,
  },
  fullscreenIcon: { 
    color: COLORS.white, 
    fontSize: 16 
  },
  bufferOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: { 
    paddingHorizontal: SIZES.padding.large, 
    paddingVertical: SIZES.padding.medium 
  },
  videoTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: COLORS.text, 
    lineHeight: 24 
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding.large,
    paddingVertical: SIZES.padding.medium,
  },
  channelAvatar: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: SIZES.margin.medium 
  },
  channelDetails: { flex: 1 },
  channelName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: COLORS.text 
  },
  detailsContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: SIZES.padding.large, 
    paddingVertical: SIZES.padding.large 
  },
  detailItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  detailsItem: { borderBottomWidth: 2, borderBottomColor: '#2B2D42' },
  detailLabel: { fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  descriptionContainer: { paddingHorizontal: 16, paddingVertical: 16 },
  descriptionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  descriptionText: { fontSize: 14, color: '#666', lineHeight: 18 },
  statisticsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statisticsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  statsButtons: { flexDirection: 'row', justifyContent: 'space-around' },
  statButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B2D42',
    width: 136,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
  },
  likedButton: { backgroundColor: '#FFE5E5' },
  statIcon: { fontSize: 16, marginRight: 6 },
  statText: { fontSize: 14, fontWeight: '500', color: '#fff' },
  likedText: { color: '#FF6B6B' },
});

