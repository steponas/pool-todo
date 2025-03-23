import {z} from 'zod';
import {Transaction} from '../../db';

const userSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character long'),
})

interface CreateUserArgs {
  name: string;
}

export const createUser = async (tx: Transaction, data: CreateUserArgs): Promise<string> => {
  const user = userSchema.parse(data);

  const id = await tx.insert(user).into('users').returning('id');
  return id[0].id;
};
