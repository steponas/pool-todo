import {Server, Socket} from 'socket.io';
import {TodoList, WSServerPushTypes} from '../../../../types';

export const updateSocketTodoList = (socket: Socket, list: TodoList) => {
  socket.data.todoList = list;
  // Join the socket to the room with the list code
  socket.join(list.code);
}

export const notifyListUpdate = (io: Server, socket: Socket) => {
  io.timeout(5000).to(socket.data.todoList.code).emit(WSServerPushTypes.LIST_UPDATED);
}
