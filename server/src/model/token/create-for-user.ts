import {Transaction} from '../../db';
import {randomBytes} from 'node:crypto';

const TOKEN_LEN = 20;

const createRandomToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    randomBytes(TOKEN_LEN, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  });
}

export const createForUser = async (tx: Transaction, id: string): Promise<string> => {
  const token = await createRandomToken();
  await tx.insert({user_id: id, token}).into('user_tokens');
  return token;
};
