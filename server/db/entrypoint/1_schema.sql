\c todo;

CREATE TABLE "users" (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    primary key (id)
);

CREATE TABLE "user_tokens" (
    user_id UUID NOT NULL,
    token TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    primary key (user_id),
    foreign key (user_id) references users(id),
    unique (token)
);

CREATE TABLE "todo_lists" (
    id SERIAL NOT NULL,
    code TEXT NOT NULL,
    created_by UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    primary key (id),
    unique (code),
    foreign key (created_by) references users(id)
);

CREATE TYPE "todo_item_status" AS ENUM ('todo', 'ongoing', 'done');

CREATE TABLE todo_items (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    todo_list_id INT NOT NULL,
    name TEXT NOT NULL,
    status todo_item_status NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    primary key (id),
    foreign key (todo_list_id) references todo_lists(id)
);
