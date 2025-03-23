import {getUser} from './get';
import {db} from '../../db';

const mockDb = db as jest.MockedFn<typeof db>;

jest.mock('../../db', () => ({
  db: jest.fn().mockReturnValue({
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    first: jest.fn().mockReturnValue({id: '1', name: 'Alice'}),
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getUser', () => {
  it('should get the user from the database', async () => {
    const user = await getUser('1');
    expect(user).toEqual({id: '1', name: 'Alice'});

    expect(mockDb().select).toHaveBeenCalledWith('id', 'name');
    expect(mockDb().where).toHaveBeenCalledWith('id', '1');
  });
});
