import { promises as fs } from 'fs';
import path from 'path';
import {
  createPreviewImage,
  getProjectImagesLocal,
  getSitePreview,
} from '../server-utils';

const mockCwd = '/mock/cwd';

// Mock fs promises
jest.mock('fs', () => ({
  promises: {
    stat: jest.fn().mockResolvedValue({ size: 1024 }),
    readdir: jest.fn(),
    access: jest.fn().mockResolvedValue(undefined),
    open: jest.fn().mockImplementation(() => ({
      read: jest.fn().mockResolvedValue({
        buffer: Buffer.from([0xFF, 0xD8, 0xFF]) // Valid JPEG header
      }),
      close: jest.fn()
    })),
    mkdir: jest.fn().mockResolvedValue(undefined),
    writeFile: jest.fn().mockResolvedValue(undefined),
    copyFile: jest.fn().mockResolvedValue(undefined)
  },
  existsSync: jest.fn(),
  readFileSync: jest.fn()
}));

// Mock process.cwd()
jest.spyOn(process, 'cwd').mockReturnValue(mockCwd);

// Mock path functions
jest.spyOn(path, 'resolve').mockImplementation((...args) => args.join('/'));
jest.spyOn(path, 'join').mockImplementation((...args) => args.join('/'));

describe('Server Utilities - Preview Generation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPreviewImage', () => {
    it('should fail when given an invalid URL', async () => {
      const result = await createPreviewImage('invalid-url', 'output.jpg');
      expect(result).toBe(false);
      expect(fs.copyFile).not.toHaveBeenCalled();
    });

    it('should fail when given an invalid output path', async () => {
      const result = await createPreviewImage(
        'https://example.com',
        '../etc/passwd'
      );
      expect(result).toBe(false);
      expect(fs.copyFile).not.toHaveBeenCalled();
    });

    it('should create fallback image on screenshot failure', async () => {
      // Mock puppeteer to fail
      jest.mock('puppeteer', () => ({
        default: {
          launch: jest.fn().mockImplementation(() => {
            throw new Error('Browser launch failed');
          })
        }
      }));
      
      const result = await createPreviewImage('https://example.com', '/mock/cwd/output.jpg');
      
      expect(result).toBe(true); // Should succeed with fallback
      expect(fs.copyFile).toHaveBeenCalledWith(
        expect.stringContaining('/site-preview-placeholder.jpg'),
        '/mock/cwd/output.jpg'
      );
    });
  });

  describe('getProjectImagesLocal', () => {
    beforeEach(() => {
      // Mock file system for a project directory
      (fs.readdir as jest.Mock).mockResolvedValue([
        'preview.jpg',
        'image1.jpg',
        'image2.jpg',
        'image(3).jpg',
        'invalid.txt'
      ]);

      // Mock successful image validation
      (fs.stat as jest.Mock).mockResolvedValue({ size: 1024 });
      (fs.open as jest.Mock).mockResolvedValue({
        read: jest.fn().mockResolvedValue({
          buffer: Buffer.from([0xFF, 0xD8, 0xFF]) // Valid JPEG header
        }),
        close: jest.fn()
      });
    });

    it('should return fallback for empty project folder', async () => {
      const result = await getProjectImagesLocal('');
      expect(result).toEqual(['/images/placeholders/site-preview-placeholder.jpg']);
    });

    it('should filter out non-image files', async () => {
      const result = await getProjectImagesLocal('test-project');
      
      expect(result.length).toBe(4); // Should only include jpg files
      expect(result.every(file => file.endsWith('.jpg'))).toBe(true);
      expect(result.some(file => file.endsWith('invalid.txt'))).toBe(false);
    });

    it('should handle filesystem errors gracefully', async () => {
      (fs.readdir as jest.Mock).mockRejectedValue(new Error('File system error'));
      
      const result = await getProjectImagesLocal('test-project');
      expect(result).toEqual(['/images/placeholders/site-preview-placeholder.jpg']);
    });

    it('should sort preview.jpg first', async () => {
      (fs.readdir as jest.Mock).mockResolvedValue([
        'image2.jpg',
        'preview.jpg',
        'image1.jpg'
      ]);

      const result = await getProjectImagesLocal('test-project');
      
      expect(result[0]).toBe('/images/projects/test-project/preview.jpg');
      expect(result).toEqual([
        '/images/projects/test-project/preview.jpg',
        '/images/projects/test-project/image1.jpg',
        '/images/projects/test-project/image2.jpg'
      ]);
    });
  });
});