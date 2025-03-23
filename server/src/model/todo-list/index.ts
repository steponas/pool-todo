import {createTodoList} from './create';
import {validateTodoListExists} from './validate-exists';

export const TodoListModel = {
  create: createTodoList,
  exists: validateTodoListExists,
};
