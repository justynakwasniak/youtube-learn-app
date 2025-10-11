// components/CategorySection.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Video } from '../utils';
import { COLORS, TYPOGRAPHY } from '../styles';
import VideoThumbnail from './VideoThumbnail';

interface CategorySectionProps {
  title: string;
  videos: Video[];
  onShowMore: (category: string) => void;
  onVideoPress: (video: Video) => void;
  isLoading?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  videos,
  onShowMore,
  onVideoPress,
  isLoading,
}) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => onShowMore(title)}>
        <Text style={styles.link}>Show more</Text>
      </TouchableOpacity>
    </View>

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => <View key={i} style={styles.skeleton} />)
        : videos.map((video) => (
            <VideoThumbnail key={video.id} video={video} onPress={onVideoPress} />
          ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  link: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
  },
  skeleton: {
    width: 160,
    height: 120,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    marginRight: 12,
  },
});

export default CategorySection;
