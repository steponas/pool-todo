import {clearCachedSettings, loadSettings} from './index';
import fs from 'node:fs/promises'

const mockFs = fs as jest.Mocked<typeof fs>;

jest.mock('node:fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('Settings Service', () => {
  beforeEach(() => {
    clearCachedSettings();
  });

  it('should load settings from file', async () => {
    mockFs.readFile.mockImplementation(() => Promise.resolve('{"user": {"name": "test"}, "list": {"id": "123", "name": "List #1"}, "token": "test123"}'));
    const result = await loadSettings('/test/path');

    expect(mockFs.readFile).toHaveBeenCalledTimes(1);
    expect(mockFs.readFile).toHaveBeenCalledWith('/test/path', 'utf-8');
    expect(result).toEqual({
      settings: {
        user: {name: 'test'},
        list: {id: '123', name: 'List #1'},
        token: 'test123',
      },
    });
  });

  it('should return correct error if file not found', async () => {
    mockFs.readFile.mockRejectedValue(new Error('File not found'));
    const result = await loadSettings('/test/path');

    expect(result).toEqual({
      settings: {},
      error: 'FILE_NOT_FOUND',
    });
  });

  it('should return correct error if file content is invalid JSON', async () => {
    mockFs.readFile.mockResolvedValue('invalid json');
    const result = await loadSettings('/test/path');

    expect(result).toEqual({
      settings: {},
      error: 'INVALID_JSON',
    });
  });

  it('should return correct error if file content is not an object', async () => {
    mockFs.readFile.mockResolvedValue('[]');
    const result = await loadSettings('/test/path');

    expect(result).toEqual({
      settings: {},
      error: 'INVALID_FORMAT',
    });
  });
});
