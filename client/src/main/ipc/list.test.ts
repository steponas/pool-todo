import {updateSettings} from '../services/settings';
import {storeList} from './list';

jest.mock('../config', () => ({SETTINGS_PATH: '/test/settings.json'}));
jest.mock('../services/settings', () => ({
  updateSettings: jest.fn().mockResolvedValue(undefined),
}));

const mockUpdateSettings = updateSettings as jest.MockedFunction<typeof updateSettings>;

describe('storeList', () => {
  it('should store the list dat', async () => {
    const event = {};
    const list = {id: '123', name: 'List #1'};

    const resultingSettings = {};
    mockUpdateSettings.mockImplementation(async (path, cb): Promise<Error | null> => {
      cb(resultingSettings);
      return null;
    });

    // @ts-expect-error - event is not used
    const result = await storeList(event, list);
    expect(result).toEqual({});
    expect(resultingSettings).toEqual({list});
  });
});
