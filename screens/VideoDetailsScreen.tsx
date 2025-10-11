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
import { 
  BackArrowIcon,
  ViewsIcon,
  LikesIcon,
  FullscreenIcon,
  PersonIcon
} from '../utils';
import { useYouTubeApi } from '../utils';
import { COLORS, TYPOGRAPHY, SPACING, commonStyles } from '../styles';
import {PixelRatio } from 'react-native';
import { useQuery } from '@tanstack/react-query';

const { width, height } = Dimensions.get('window');

const scale = width / 375;
export const normalize = (size: number) => Math.round(PixelRatio.roundToNearestPixel(size * scale));



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
  const { getVideoDetails } = useYouTubeApi();

  const [isBuffering, setIsBuffering] = useState<boolean>(false);
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

  const { data: videoDetails, isLoading } = useQuery({
    queryKey: ['videoDetails', videoId],
    queryFn: async () => {
      if (!videoId) return null;
      const details = await getVideoDetails.call(videoId as string) as YouTubeVideoDetailsResult;
      return formatYouTubeVideoDetails(details);
    },
    enabled: !!videoId,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (videoDetails && videoDetails.likeCount) {
      setLikes(parseInt(videoDetails.likeCount) || 12500);
    }
  }, [videoDetails]);

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
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          accessibilityHint="Returns to previous screen"
        >
          <BackArrowIcon width={20} height={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.videoContainer}>
          <Video
            source={require('../assets/video/broadchurch.mp4')} 
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
              <Text style={{ color: COLORS.white }}>Buffering...</Text>
            </View>
          )}
          <TouchableOpacity 
            style={styles.fullscreenButton} 
            onPress={handleFullscreen}
            accessibilityRole="button"
            accessibilityLabel="Fullscreen"
            accessibilityHint="Opens video in fullscreen mode"
          >
            <FullscreenIcon width={16} height={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.videoTitle}>
            {displayTitle}
          </Text>
        </View>

        <View style={styles.channelInfo}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40x40/FF6B6B/FFFFFF?text=RN' }}
            style={styles.channelAvatar}
            accessibilityLabel={`Channel avatar for ${displayChannelTitle}`}
          />
          <View style={styles.channelDetails}>
            <View style={styles.channelNameRow}>
              <PersonIcon width={35} height={25} color={COLORS.borderDark} style={styles.personIcon} />
              <Text style={styles.channelName}>
                {displayChannelTitle}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={[styles.detailItem, styles.detailsItem]}>
            <Text style={styles.detailLabel}>Details</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Notes</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText} numberOfLines={7}>
            {displayDescription}
          </Text>
        </View>

        <View style={styles.statisticsContainer}>
          <Text style={styles.statisticsTitle}>Statistics</Text>
          <View style={styles.statsButtons}>
            <TouchableOpacity 
              style={styles.statButton}
              accessibilityRole="button"
              accessibilityLabel={`${formattedViewCount} views`}
            >
              <ViewsIcon width={18} height={18} color={COLORS.white} style={styles.statIcon} />
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
              <LikesIcon 
                width={18} 
                height={18} 
                color={isLiked ? COLORS.error : COLORS.white} 
                style={styles.statIcon}
              />
              <Text style={[styles.statText, isLiked && styles.likedText]}>
                {formatNumber(likes)} likes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

export default VideoDetailsScreen;


const styles = StyleSheet.create({
  container: commonStyles.container,
  header: commonStyles.header,
  backButton: commonStyles.backButton,
  backIcon: { 
    fontSize: 20, 
    color: COLORS.primary 
  },
  content: { flex: 1 },
  videoContainer: { 
    width: '100%', 
    height: width * 0.56,
    backgroundColor: COLORS.black 
  },
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
    paddingHorizontal: SPACING.padding.lg, 
    paddingVertical: SPACING.padding.md 
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
    paddingLeft: 8,
    paddingRight: SPACING.padding.lg,
    paddingVertical: SPACING.padding.md,
  },
  channelAvatar: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: SPACING.margin.md 
  },
  channelDetails: { flex: 1 },
  channelNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: -16,
  },
  personIcon: {
    marginRight: 8,
  },
  channelName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: COLORS.text 
  },
  detailsContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: SPACING.padding.lg, 
    paddingVertical: SPACING.padding.lg 
  },
  detailItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 8,
  },
  detailsItem: { borderBottomWidth: 2, borderBottomColor: COLORS.borderDark },
  detailLabel: { fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  descriptionContainer: { paddingHorizontal: 16, paddingVertical: 16 },
  descriptionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  descriptionText: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 18 },
  statisticsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  statisticsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  statsButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  statButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.borderDark,
    width: 136,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
  },
  likedButton: { backgroundColor: '#FFE5E5' },
  statIcon: { marginRight: normalize(6) },
  statText: { fontSize: normalize(14) },
  likedText: { color: '#FFFFFF' },
});

