import knex, {Knex} from 'knex';

export type Transaction = Knex.Transaction;

let instance: Knex;
export const initDb = (user: string, password: string, host: string, port: number, database: string) => {
  instance = knex({
    client: 'pg',
    connection: {
      user,
      password,
      host,
      port,
      database,
      ssl: false,
    },
  });
}

export const db = () => {
  if (!instance) {
    throw new Error('DB not initialized');
  }
  return instance;
}
