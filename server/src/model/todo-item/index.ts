import {createTodo} from './create-todo';
import {getAllForList, getSingle} from './get';
import {updateTodo} from './update';

export const TodoItemModel = {
  create: createTodo,
  getAllForList,
  get: getSingle,
  update: updateTodo,
}
