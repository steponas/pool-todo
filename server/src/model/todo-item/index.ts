import {createTodo} from './create-todo';
import {getAllForList, getSingle} from './get';

export const TodoItemModel = {
  create: createTodo,
  getAllForList,
  get: getSingle,
}
