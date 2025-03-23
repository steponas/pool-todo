import {updateTodo} from './update';
import {db} from '../../db';
import {TodoStatus, TodoUpdateStatus} from '../../../../types';
import {getSingleForUpdate} from './get';

jest.mock('../../db', () => ({db: jest.fn()}));
jest.mock('./get', () => ({getSingleForUpdate: jest.fn()}));

const mockDb = db as jest.MockedFunction<typeof db>;
const mockGet = getSingleForUpdate as jest.MockedFunction<typeof getSingleForUpdate>;


describe('updateTodo', () => {
  const getMocks = () => {
    const txInternal = {
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
    };
    const tx = jest.fn().mockReturnValue(txInternal);
    return {tx, txInternal};
  }
  it('should update a todo item', async () => {
    const {tx, txInternal} = getMocks();
    // @ts-expect-error mock
    mockDb.mockReturnValue(({transaction: cb => cb(tx)}));
    // @ts-expect-error mock
    mockGet.mockReturnValue(Promise.resolve({
      id: 'todo-15',
      title: 'Old title',
      status: TodoStatus.ONGOING,
      createdAt: new Date('2024-01-01T00:00:00Z'),
      createdBy: 'user-101',
      todoListId: 101,
      updatedAt: new Date('2024-01-01T00:00:00Z'),
    }));
    const result = await updateTodo({
      id: 'todo-25',
      title: 'New title',
      status: TodoStatus.DONE,
      lastUpdateTime: '2025-01-01T00:00:00Z',
    }, 101);
    expect(result).toEqual({
      status: TodoUpdateStatus.OK,
    });
    const callArgs = txInternal.update.mock.calls[0][0];
    expect(callArgs.status).toBe(TodoStatus.DONE);
    expect(callArgs.title).toBe('New title');
    expect(txInternal.where).toHaveBeenCalledWith('id', 'todo-25');
    expect(mockDb).toHaveBeenCalledTimes(1);
  });

  it('should return a conflict status if the item is updated by another user', async () => {
    const {tx} = getMocks();
    // @ts-expect-error mock
    mockDb.mockReturnValue(({transaction: cb => cb(tx)}));
    // @ts-expect-error mock
    mockGet.mockReturnValue(Promise.resolve({
      id: 'todo-15',
      title: 'Old title',
      status: TodoStatus.ONGOING,
      createdAt: new Date('2024-01-01T00:00:00Z'),
      createdBy: 'user-101',
      todoListId: 101,
      updatedAt: new Date('2025-01-01T00:00:00Z'),
    }));
    const result = await updateTodo({
      id: 'todo-15',
      title: 'New title',
      status: TodoStatus.DONE,
      lastUpdateTime: '2024-01-01T00:00:00Z',
    }, 101);
    expect(result).toEqual({
      status: TodoUpdateStatus.CONFLICT,
    });
  });

  it('should return a status error if the status can\'t be moved to the new status', async () => {
    const {tx} = getMocks();
    // @ts-expect-error mock
    mockDb.mockReturnValue(({transaction: cb => cb(tx)}));
    // @ts-expect-error mock
    mockGet.mockReturnValue(Promise.resolve({
      id: 'todo-15',
      title: 'Old title',
      status: TodoStatus.TODO,
      createdAt: new Date('2024-01-01T00:00:00Z'),
      createdBy: 'user-101',
      todoListId: 101,
      updatedAt: new Date('2024-01-01T00:00:00Z'),
    }));
    const result = await updateTodo({
      id: 'todo-15',
      title: 'New title',
      status: TodoStatus.DONE,
      lastUpdateTime: '2024-01-01T00:00:00Z',
    }, 101);
    expect(result).toEqual({
      status: TodoUpdateStatus.INCORRECT_STATUS,
    });
  });
});
