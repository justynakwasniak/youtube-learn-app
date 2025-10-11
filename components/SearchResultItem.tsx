import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ExtendedVideo } from '../utils';
import { COLORS, TYPOGRAPHY } from '../styles';

interface Props {
  video: ExtendedVideo;
  onPress: (video: ExtendedVideo) => void;
}

const SearchResultItem: React.FC<Props> = ({ video, onPress }) => (
  <TouchableOpacity 
    style={styles.container}
    onPress={() => onPress(video)}
    accessibilityRole="button"
    accessibilityLabel={`Watch video: ${video.title}`}
  >
    <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
    <View style={styles.info}>
      <Text style={styles.channel} numberOfLines={1}>{video.channelTitle}</Text>
      <Text style={styles.description} numberOfLines={2}>{video.description}</Text>
      <Text style={styles.date}>{video.publishedAt}</Text>
    </View>
  </TouchableOpacity>
);

export default SearchResultItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: COLORS.border,
    marginBottom: 12,
  },
  info: {
    paddingHorizontal: 4,
  },
  channel: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '700',
    color: COLORS.text,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginVertical: 4,
  },
  date: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
    textAlign: 'right',
  },
});
