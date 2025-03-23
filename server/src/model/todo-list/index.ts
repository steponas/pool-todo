import {createTodoList} from './create';
import {getAllForList} from './get-all-for-list';
import {getIdByCode} from './get-id-by-code';

export const TodoListModel = {
  create: createTodoList,
  getAllForList,
  getIdByCode,
};
