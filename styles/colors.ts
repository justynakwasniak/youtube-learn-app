// Design tokens - Colors
export const COLORS = {
  // Primary colors
  primary: '#007AFF',
  secondary: '#F5F5F5',
  
  // Text colors
  text: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  
  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  
  // Border colors
  border: '#E0E0E0',
  borderDark: '#2B2D42',
  
  // Status colors
  success: '#4CAF50',
  error: '#FF6B6B',
  warning: '#FF9800',
  
  // Interactive colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Skeleton loading
  skeleton: '#E0E0E0',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
} as const;

export type ColorKey = keyof typeof COLORS;
