import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { Video } from '../utils';
import { COLORS, TYPOGRAPHY } from '../styles';

interface VideoThumbnailProps {
  video: Video;
  onPress: (video: Video) => void;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ video, onPress }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => onPress(video)}
    accessibilityRole="button"
    accessibilityLabel={`Watch video: ${video.title}`}
  >
    <Image source={{ uri: video.thumbnail }} style={styles.image} />
    <Text style={styles.title} numberOfLines={2}>{video.title}</Text>
    <Text style={styles.date}>{video.publishedAt}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: 90,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    color: COLORS.text,
    marginTop: 4,
    textDecorationLine: 'none',
  },
  date: {
    fontSize: 12,
    color: COLORS.textLight,
    fontFamily: 'Poppins_400Regular',
    textDecorationLine: 'none',
  },
});

export default VideoThumbnail;
