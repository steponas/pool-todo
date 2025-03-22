import {storeUserWithToken} from './user';
import {updateSettings} from '../services/settings';

jest.mock('../config', () => ({SETTINGS_PATH: '/test/settings.json'}));
jest.mock('../services/settings', () => ({
  updateSettings: jest.fn().mockResolvedValue(undefined),
}));

const mockUpdateSettings = updateSettings as jest.MockedFunction<typeof updateSettings>;

describe('storeUserWithToken', () => {
  it('should store the user and token', async () => {
    const user = {id: '123', name: 'test'};
    const token = 'test123';
    const event: any = {};

    const resultingSettings = {};
    mockUpdateSettings.mockImplementation(async (path, cb): Promise<Error | null> => {
      cb(resultingSettings);
      return null;
    });

    const result = await storeUserWithToken(event, user, token);
    expect(result).toEqual({});
    expect(resultingSettings).toEqual({user, token});
  });
});
