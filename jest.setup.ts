import '@testing-library/jest-dom';
import React from 'react';

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeDisabled(): R;
    }
  }
}

// Silence console output during tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: function MockMotionDiv(props: any) {
      const { children, ...rest } = props;
      return React.createElement('div', rest, children);
    }
  },
  AnimatePresence: function MockAnimatePresence(props: any) {
    return props.children;
  }
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockNextImage(props: any) {
    const { src, alt, onLoad, onError, ...rest } = props;
    return React.createElement('img', {
      src,
      alt,
      onLoad,
      onError,
      ...rest,
    });
  }
}));

// Set test environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_BASE_URL: 'http://localhost:3000'
};