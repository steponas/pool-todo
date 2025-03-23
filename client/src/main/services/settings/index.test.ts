import {clearCachedSettings, loadSettings, updateSettings, writeSettings} from './index';
import fs from 'node:fs/promises'
import {LoadSettingsError} from '../../../../../types';

const mockFs = fs as jest.Mocked<typeof fs>;

jest.mock('node:fs/promises', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
}));

describe('Settings Service', () => {
  beforeEach(() => {
    clearCachedSettings();
    jest.resetAllMocks();
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
      error: LoadSettingsError.FILE_NOT_FOUND,
    });
  });

  it('should return correct error if file content is invalid JSON', async () => {
    mockFs.readFile.mockResolvedValue('invalid json');
    const result = await loadSettings('/test/path');

    expect(result).toEqual({
      settings: {},
      error: LoadSettingsError.INVALID_JSON,
    });
  });

  it('should return correct error if file content is not an object', async () => {
    mockFs.readFile.mockResolvedValue('[]');
    const result = await loadSettings('/test/path');

    expect(result).toEqual({
      settings: {},
      error: LoadSettingsError.INVALID_FORMAT,
    });
  });

  it('should return cached settings on subsequent calls', async () => {
    mockFs.readFile.mockResolvedValue('{"user": {"name": "test"}, "list": {"id": "123", "name": "List #1"}, "token": "test123"}');
    await loadSettings('/test/path');

    const result = await loadSettings('/test/path');
    expect(mockFs.readFile).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      settings: {
        user: {name: 'test'},
        list: {id: '123', name: 'List #1'},
        token: 'test123',
      },
    });
  });

  it('should write settings to file', async () => {
    const settings = {
      user: {id: '321', name: 'test'},
      list: {code: 'List #1'},
      token: 'test123',
    };
    const res = await writeSettings('/test/path', settings);

    expect(mockFs.writeFile).toHaveBeenCalledTimes(1);
    expect(mockFs.writeFile).toHaveBeenCalledWith('/test/path', JSON.stringify(settings, null, 2), 'utf-8');
    expect(res).toBe(null);
  });

  it('should return false if writing settings fails', async () => {
    mockFs.readFile.mockRejectedValue(new Error('File not found'));
    mockFs.writeFile.mockRejectedValue(new Error('Failed to write file'));
    const settings = {
      user: {id: '321', name: 'test'},
      list: {code: 'List #1'},
      token: 'token321',
    };

    const res = await writeSettings('/test/path', settings);
    expect(res).toBeTruthy();
    expect(res.message).toBe('Failed to write file');

    // It should not update the cached settings if writing fails
    const result = await loadSettings('/test/path');
    expect(result.error).toBe(LoadSettingsError.FILE_NOT_FOUND);
  });

  it('should update the cached settings after writing', async () => {
    // Let's say the settings file didn't exist initially
    mockFs.readFile.mockRejectedValueOnce(new Error('File not found'));
    await loadSettings('/test/path');

    const settings = {
      user: {id: '321', name: 'test'},
      list: {code: 'List #1'},
      token: 'test123',
    };
    await writeSettings('/test/path', settings);

    const result = await loadSettings('/test/path');
    expect(result).toEqual({settings});
  });

  it('should update the settings', async () => {
    mockFs.readFile.mockImplementation(() => Promise.resolve('{"user": {"name": "test"}, "list": {"id": "123", "name": "List #1"}, "token": "test123"}'));

    const result = await updateSettings('/test/path', (settings) => {
      settings.user.name = 'updated';
      settings.list.code = 'Updated code';
    });
    expect(result).toBe(null);

    // Update values should be returned
    const updated = await loadSettings('/test/path');
    expect(updated.settings.user.name).toBe('updated');
    expect(updated.settings.list.code).toBe('Updated code');
  });
});
