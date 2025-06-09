import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PreviewSection from '../PreviewSection';

// Mock components
jest.mock('../RefreshPreviewButton', () => ({
  __esModule: true,
  default: function MockRefreshButton(props: { onRefreshComplete: (url: string) => void; disabled: boolean }) {
    return React.createElement('button', {
      onClick: () => props.onRefreshComplete('/new-preview-url.jpg'),
      'aria-disabled': props.disabled,
      disabled: props.disabled,
      'data-testid': 'refresh-button'
    }, props.disabled ? 'Refreshing...' : 'Refresh Preview');
  }
}));

jest.mock('@/components/ui/image-with-loading', () => ({
  ImageWithLoading: function MockImageWithLoading(props: { src: string; alt: string; onError?: () => void; isLoading?: boolean }) {
    return React.createElement('div', {
      className: 'image-with-loading'
    }, [
      React.createElement('img', {
        key: 'image',
        src: props.src,
        alt: props.alt,
        onError: props.onError,
        'data-testid': 'preview-image'
      }),
      props.isLoading && React.createElement('div', {
        key: 'loading',
        className: 'loading-state'
      }, 'Loading...')
    ].filter(Boolean));
  }
}));

// Mock error boundary
jest.mock('react-error-boundary', () => ({
  ErrorBoundary: ({ children, FallbackComponent, onReset }: { children: React.ReactNode; FallbackComponent: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>; onReset: () => void }) => {
    if (process.env.THROW_ERROR) {
      return React.createElement(FallbackComponent, {
        error: new Error('Test error'),
        resetErrorBoundary: onReset
      });
    }
    return children;
  }
}));

describe('PreviewSection', () => {
  const defaultProps = {
    projectId: 'test-project',
    demoUrl: 'https://example.com',
    initialPreviewUrl: '/test-preview.jpg',
    title: 'Test Project',
  };

  beforeEach(() => {
    jest.useFakeTimers();
    process.env.THROW_ERROR = '';
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders with initial preview URL', () => {
    render(<PreviewSection {...defaultProps} />);
    
    const image = screen.getByTestId('preview-image');
    expect(image).toHaveAttribute('src', defaultProps.initialPreviewUrl);
    expect(screen.getByText('Site Preview')).toBeInTheDocument();
  });

  it('updates preview URL after successful refresh', () => {
    render(<PreviewSection {...defaultProps} />);
    
    fireEvent.click(screen.getByTestId('refresh-button'));
    
    const image = screen.getByTestId('preview-image');
    expect(image).toHaveAttribute('src', '/new-preview-url.jpg');
  });

  it('shows loading state during refresh', async () => {
    render(<PreviewSection {...defaultProps} />);
    
    const button = screen.getByTestId('refresh-button');
    fireEvent.click(button);
    
    expect(button).toBeDisabled();
    expect(await screen.findByText(/refreshing/i)).toBeInTheDocument();
  });
  it('implements retry with exponential backoff on error', async () => {
    render(<PreviewSection {...defaultProps} />);
    
    const button = screen.getByTestId('refresh-button');
    
    // Trigger refresh error
    fireEvent.click(button);
    
    // Simulate error and check retry attempt display
    expect(await screen.findByText(/refreshing/i)).toHaveTextContent(/attempt 1\/3/i);
    
    // Should retry automatically with backoff
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(button).toBeDisabled();
  });

  it('shows error boundary on unrecoverable error', () => {
    // Set environment to trigger error boundary
    process.env.THROW_ERROR = 'true';
    
    render(<PreviewSection {...defaultProps} />);
    
    expect(screen.getByText(/error loading preview/i)).toBeInTheDocument();
    expect(screen.getByText(/try again/i)).toBeInTheDocument();
  });
});