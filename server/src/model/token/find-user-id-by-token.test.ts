import {db} from '../../db';
import {findUserIdByToken} from './find-user-id-by-token';

const mockDb = db as jest.MockedFn<typeof db>;

jest.mock('../../db', () => ({
  db: jest.fn().mockReturnValue({
    first: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('findUserIdByToken', () => {
  it('should get the userID from the database', async () => {
    // How to update the mocket where return value?
    mockDb().where = jest.fn().mockReturnValue({
      id: 'user_id',
    });
    const id = await findUserIdByToken('TEST_TOKEN');
    expect(id).toEqual(id);

    expect(mockDb().first).toHaveBeenCalledWith('user_id');
    expect(mockDb().where).toHaveBeenCalledWith('token', 'TEST_TOKEN');
  });

  it('should return null if token is not found', async () => {
    // How to update the mocket where return value?
    mockDb().where = jest.fn().mockReturnValue(null);
    const id = await findUserIdByToken('TEST_TOKEN');
    expect(id).toBeNull();
  });
});
