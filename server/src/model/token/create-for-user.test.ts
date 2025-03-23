import {createForUser} from './create-for-user';
import {Transaction} from '../../db';

jest.mock('node:crypto', () => ({
  randomBytes: jest.fn().mockImplementation((len, cb) => {
    cb(null, Buffer.from('111'));
  }),
}));

const mockTx = {
  insert: jest.fn().mockReturnThis(),
  into: jest.fn().mockReturnThis(),
} as unknown as Transaction;

describe('creating a token', () => {
  it('should create a token', async () => {
    const token = await createForUser(mockTx, '1');

    expect(mockTx.insert).toHaveBeenCalledWith({user_id: '1', token: '313131'});
    expect(mockTx.into).toHaveBeenCalledWith('user_tokens');

    expect(token).toBe('313131');
  });
});

