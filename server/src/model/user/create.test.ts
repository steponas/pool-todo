import {createUser} from './create';
import {Transaction} from '../../db';

const mockTx = {
  insert: jest.fn().mockReturnThis(),
  into: jest.fn().mockReturnThis(),
  returning: jest.fn().mockReturnValue([{id: '1'}]),
} as unknown as Transaction;

beforeEach(() => {
  jest.clearAllMocks();
})

describe('creating an user', () => {
  it('should create an user', async () => {
    const id = await createUser(mockTx, {
      name: 'test'
    });

    expect(id).toBe('1');
    expect(mockTx.insert).toHaveBeenCalledWith({name: 'test'});
    expect(mockTx.into).toHaveBeenCalledWith('users');
    expect(mockTx.returning).toHaveBeenCalledWith('id');
  });

  it('should throw an error if name is empty', async () => {
    await expect(createUser(mockTx, {name: ''})).rejects.toThrow('Name must be at least 1 character long');
    expect(mockTx.insert).not.toHaveBeenCalled();
  });
});
