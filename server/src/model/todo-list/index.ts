import {createTodoList} from './create';
import {validateTodoListExists} from './validate-exists';
import {getAllForList} from './get-all-for-list';
import {getIdByCode} from './get-id-by-code';

export const TodoListModel = {
  create: createTodoList,
  exists: validateTodoListExists,
  getAllForList,
  getIdByCode,
};
