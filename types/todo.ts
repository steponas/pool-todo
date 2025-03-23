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
  createdAt: string;
  createdBy: User;
  title: string;
  // Apart from being a useful field to have, updatedAt is used for versioning.
  updatedAt: string;
}

// An update on a Todo item.
export interface TodoUpdate {
  status: TodoStatus;
  title: string;
}
