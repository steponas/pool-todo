import {User} from '../../../../types';
import {db} from '../../db';
import {Knex} from 'knex';

const get = async (dbInst: Knex | Knex.Transaction, id: string): Promise<User> => {
  return dbInst.select('id', 'name').from('users').where('id', id).first();
}

export const getUser = async (id: string): Promise<User> => {
  return await get(db(), id);
}

export const getInTx = async (tx: Knex.Transaction, id: string): Promise<User> => {
  return await get(tx, id);
}
