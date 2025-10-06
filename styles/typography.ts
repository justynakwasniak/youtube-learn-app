export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
  },
  
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
  },
  
  lineHeight: {
    tight: 14,
    normal: 16,
    relaxed: 18,
    loose: 20,
    extraLoose: 22,
    superLoose: 24,
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
} as const;

export type TypographyKey = keyof typeof TYPOGRAPHY;
