import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING } from './spacing';

// Common styles used across multiple screens
export const commonStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // Text styles
  title: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
    color: COLORS.text,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    lineHeight: TYPOGRAPHY.lineHeight.extraLoose,
  },
  
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.text,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    lineHeight: TYPOGRAPHY.lineHeight.loose,
  },
  
  bodyText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
  },
  
  caption: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    lineHeight: TYPOGRAPHY.lineHeight.tight,
  },
  
  // Button styles
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.padding.md,
    paddingHorizontal: SPACING.padding.lg,
    borderRadius: SPACING.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  primaryButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
  },
  
  // Input styles
  input: {
    borderWidth: SPACING.borderWidth.normal,
    borderColor: COLORS.borderDark,
    borderRadius: SPACING.borderRadius.lg,
    paddingVertical: SPACING.padding.md,
    paddingHorizontal: SPACING.padding.lg,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.text,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  
  // Card styles
  card: {
    backgroundColor: COLORS.background,
    borderRadius: SPACING.borderRadius.lg,
    padding: SPACING.padding.lg,
    marginBottom: SPACING.margin.md,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.padding.xxxl,
    paddingHorizontal: SPACING.padding.lg,
  },
  
  loadingText: {
    marginTop: SPACING.margin.md,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textSecondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  
  // Skeleton styles
  skeleton: {
    backgroundColor: COLORS.skeleton,
    borderRadius: SPACING.borderRadius.sm,
  },

  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.padding.lg,
    paddingVertical: SPACING.padding.md,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  // Search container styles
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: SPACING.borderRadius.lg,
    paddingHorizontal: SPACING.padding.lg,
    borderWidth: 2,
    borderColor: COLORS.borderDark,
  },

  searchInput: {
    flex: 1,
    paddingVertical: SPACING.padding.md,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.text,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },

  // Video thumbnail styles
  videoThumbnail: {
    width: 180,
    marginRight: SPACING.margin.lg,
  },

  thumbnailImage: {
    width: 180,
    height: 112,
    borderRadius: SPACING.borderRadius.lg,
    backgroundColor: COLORS.secondary,
  },

  // Video info styles
  videoTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semiBold,
    color: COLORS.text,
    marginTop: SPACING.margin.sm,
    lineHeight: 18,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
  },

  videoViews: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    textAlign: 'right',
  },

  // Button styles
  backButton: {
    padding: SPACING.padding.sm,
  },

  settingsButton: {
    padding: SPACING.padding.sm,
  },

  // Shadow styles
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
