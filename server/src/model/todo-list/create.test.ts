import {db} from '../../db';
import {createTodoList} from './create';

jest.mock('../../db', () => ({db: jest.fn()}));

const mockDb = db as jest.MockedFunction<typeof db>;

describe('createTodoList', () => {
  it('should create a todo list when TODOs exist', async () => {
    // Mock the transaction
    const tx = {
      raw: jest.fn().mockReturnThis(),
      first: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnValue({id: 15}),
      insert: jest.fn().mockReturnThis(),
      into: jest.fn().mockReturnThis(),
    };
    // @ts-expect-error mock
    mockDb.mockReturnValue(({transaction: cb => cb(tx)}));
    const list = await createTodoList({createdBy: 'user-015'});
    expect(list).toMatchObject({code: 'list-16'});
    expect(tx.insert).toHaveBeenCalledWith({
      created_by: 'user-015',
      code: 'list-16',
      id: 16,
    });
    expect(tx.into).toHaveBeenCalledWith('todo_lists');
    expect(tx.raw).toHaveBeenCalledWith('LOCK TABLE todo_lists IN EXCLUSIVE MODE');
    // Direct DB call should be done only once - creating the TX
    expect(mockDb).toHaveBeenCalledTimes(1);
  });

  it('should create a todo list when no todo exists', async () => {
    // Mock the transaction
    const tx = {
      raw: jest.fn().mockReturnThis(),
      first: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnValue(null),
      insert: jest.fn().mockReturnThis(),
      into: jest.fn().mockReturnThis(),
    };
    // @ts-expect-error mock
    mockDb.mockReturnValue(({transaction: cb => cb(tx)}));
    const list = await createTodoList({createdBy: 'user-015'});
    expect(list).toMatchObject({code: 'list-1'});
  });
});

