import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ImageWithLoading } from '../image-with-loading';

// Mock dependencies
jest.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' ')
}));

jest.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ className }: { className: string }) => (
    <div data-testid="skeleton" className={className} role="status">
      Loading...
    </div>
  )
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => React.createElement('div', { ...props }, props.children)
  },
  AnimatePresence: (props: any) => props.children,
}));

const FALLBACK_IMAGE = '/images/placeholders/site-preview-placeholder.jpg';

describe('ImageWithLoading', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    render(
      <ImageWithLoading
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    );

    expect(screen.getByTestId('next-image')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('retries loading with exponential backoff', () => {
    const onError = jest.fn();
    render(
      <ImageWithLoading
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        onError={onError}
      />
    );

    const image = screen.getByTestId('next-image') as HTMLImageElement;

    // Trigger first error
    fireEvent.error(image);
    expect(screen.getByText(/retry/i)).toHaveTextContent('Retry 1/3');

    // Fast-forward past first retry delay
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(image.src).toContain('retry=');

    // Trigger second error
    fireEvent.error(image);
    expect(screen.getByText(/retry/i)).toHaveTextContent('Retry 2/3');
  });

  it('switches to fallback image after max retries', async () => {
    render(
      <ImageWithLoading
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    );

    // Trigger errors up to max retries
    const image = screen.getByTestId('next-image') as HTMLImageElement;
    for (let i = 0; i < 3; i++) {
      fireEvent.error(image);
      act(() => {
        jest.advanceTimersByTime(Math.pow(2, i) * 2000);
      });
    }

    // Should use fallback image
    const fallbackImage = await screen.findByAltText(/test image/i) as HTMLImageElement;
    expect(fallbackImage.src).toContain(FALLBACK_IMAGE);
  });

  it('shows error state with retry button when fallback fails', async () => {
    render(
      <ImageWithLoading
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    );

    // Trigger errors beyond max retries including fallback
    const image = screen.getByTestId('next-image') as HTMLImageElement;
    for (let i = 0; i <= 3; i++) {
      fireEvent.error(image);
      act(() => {
        jest.advanceTimersByTime(Math.pow(2, i) * 2000);
      });
    }

    // Error state should be visible
    expect(await screen.findByText(/failed to load/i)).toBeInTheDocument();
    
    // Click retry button
    const retryButton = screen.getByRole('button', { name: /retry/i });
    fireEvent.click(retryButton);

    // Should show loading state again
    expect(screen.getByTestId('next-image')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('resets retry count on successful load', async () => {
    render(
      <ImageWithLoading
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    );

    const image = screen.getByTestId('next-image') as HTMLImageElement;

    // Trigger first error
    fireEvent.error(image);
    expect(screen.getByText(/retry/i)).toHaveTextContent('Retry 1/3');

    // Simulate successful load
    fireEvent.load(image);

    // Should hide loading state
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    // Trigger another error - should start from retry 1 again
    fireEvent.error(image);
    expect(await screen.findByText(/retry/i)).toHaveTextContent('Retry 1/3');
  });
});