export const COLORS = {
  primary: '#007AFF',
  secondary: '#F5F5F5',
  
  text: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  
  border: '#E0E0E0',
  borderDark: '#2B2D42',
  
  success: '#4CAF50',
  error: '#FF6B6B',
  warning: '#FF9800',
  
  white: '#FFFFFF',
  black: '#000000',
  
  skeleton: '#E0E0E0',
  
  overlay: 'rgba(0, 0, 0, 0.7)',
} as const;

export type ColorKey = keyof typeof COLORS;
