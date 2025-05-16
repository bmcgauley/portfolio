/**
 * Theme configuration for the portfolio website
 * Using Royal Blue (#2563EB) and Amber Gold (#F59E0B) as primary colors
 */

export const themeColors = {
  // Primary colors
  royalBlue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB', // Primary blue
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  amberGold: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Primary gold
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
    // Semantic colors (mapped to tailwind/shadcn)
  semantic: {
    primary: '#0a1929',         // Dark Blue
    primaryLight: '#122b47',    // Lighter shade for hover states
    primaryDark: '#071018',     // Darker shade for active states
    
    secondary: '#F59E0B',       // Amber Gold  
    secondaryLight: '#FBBF24',  // Lighter shade for hover states
    secondaryDark: '#B45309',   // Darker shade for active states
    
    accent: '#F59E0B',          // Using amber gold as accent
    
    background: '#FFFFFF',
    foreground: '#111111',
    
    success: '#10B981',         // Emerald green for success states
    error: '#EF4444',           // Red for error states
    warning: '#F59E0B',         // Using amber gold for warnings
  }
}

// Typography settings
export const typography = {
  fontFamily: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  }
}

// Border radius settings
export const borderRadius = {
  none: '0',
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  xl: 'calc(var(--radius) + 4px)',
  full: '9999px',
}

// Shadow settings
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
}

// Transitions
export const transitions = {
  default: '0.15s ease',
  fast: '0.1s ease',
  slow: '0.3s ease',
}

// Use with tailwind like: import { themeColors } from '@/lib/theme'
// Then in code: className="bg-[var(--color-primary)]" or directly "bg-[#2563EB]"
