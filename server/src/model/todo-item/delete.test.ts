import {deleteTodo} from './delete';
import {db} from '../../db';
import {getSingle} from './get';

jest.mock('../../db', () => ({
  db: jest.fn(),
}));
jest.mock('./get', () => ({
  getSingle: jest.fn(),
}));

const mockDb = db as jest.MockedFunction<typeof db>;
const mockGet = getSingle as jest.MockedFunction<typeof getSingle>;

describe('deleteTodo', () => {
  it('should delete a todo item', async () => {
    // @ts-expect-error mock
    mockGet.mockImplementation(() => Promise.resolve({
      todoListId: 123,
    }));
    // @ts-expect-error mock
    mockDb.mockReturnValue({
      delete: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
    });
    await deleteTodo({id: 'todo-15'}, 123);
    expect(mockDb().delete).toHaveBeenCalledTimes(1);
    expect(mockDb().from).toHaveBeenCalledWith('todo_items');
    expect(mockDb().where).toHaveBeenCalledWith('id', 'todo-15');
  });

  it('should throw an error if the todo item does not exist', async () => {
    mockGet.mockImplementation(() => Promise.resolve(null));
    await expect(deleteTodo({id: 'todo-15'}, 123)).rejects.toThrow('Todo#todo-15 not found for deletion');
  });

  it('should throw an error if the todo item does not belong to the list', async () => {
    // @ts-expect-error mock
    mockGet.mockImplementation(() => Promise.resolve({
      todoListId: 124,
    }));
    await expect(deleteTodo({id: 'todo-15'}, 123)).rejects.toThrow('Todo#todo-15 does not belong to the user\'s list');
  });

  it('should throw an error if the input does not contain an id', async () => {
    // @ts-expect-error mock
    await expect(deleteTodo({}, 123)).rejects.toThrowErrorMatchingInlineSnapshot(`
"[
  {
    "code": "invalid_type",
    "expected": "string",
    "received": "undefined",
    "path": [
      "id"
    ],
    "message": "Required"
  }
]"
`);
  });
});
