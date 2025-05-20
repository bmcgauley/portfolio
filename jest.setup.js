// Add custom Jest matchers
require('@testing-library/jest-dom');

// Mock server-only
jest.mock('server-only', () => ({}));

// Silence console output during tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
};

// Set test environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_BASE_URL: 'http://localhost:3000'
};

// Mock process.cwd()
jest.spyOn(process, 'cwd').mockReturnValue('C:/Users/brian/DevWorkspace/projects/portfolio');