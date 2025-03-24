import {createTodo} from './create-todo';
import {getAllForList, getSingle} from './get';
import {updateTodo} from './update';
import {deleteTodo} from './delete';

export const TodoItemModel = {
  create: createTodo,
  getAllForList,
  get: getSingle,
  update: updateTodo,
  delete: deleteTodo,
}
