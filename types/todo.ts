import {User} from "./user";

export enum TodoStatus {
  TODO = 'todo',
  ONGOING = 'ongoing',
  DONE = 'done',
}

// The Todo interface. It represents a Todo item.
export interface Todo {
  id: string;
  status: TodoStatus;
  createdAt: Date;
  createdBy: User;
  title: string;
  // Apart from being a useful field to have, updatedAt is used for versioning.
  updatedAt: Date;
}

// An update on a Todo item.
export interface TodoUpdate {
  status: TodoStatus;
  title: string;
}
