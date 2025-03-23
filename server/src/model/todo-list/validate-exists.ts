import {getIdByCode} from './get-id-by-code';

export const validateTodoListExists = async (code: string): Promise<boolean> => {
  const res = await getIdByCode(code);
  return !!res;
};
