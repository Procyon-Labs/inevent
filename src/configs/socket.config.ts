import { Message } from '../interfaces/messages.interface';
import { getUser, addUser, removeUser, getUsersInRoom } from '../services/user';
import { Server as SocketIOServer } from 'socket.io';
import { generateResponse } from './ai.config';

export function socketSetup(server: any) {
  const messages: { [room: string]: Message[] } = {};
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*', // Allow requests from this origin
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
      if (error) return callback?.(error);

      socket.emit('message', {
        user: 'admin',
        text: `${user?.name}, welcome to room ${user?.room}`,
      });

      socket.broadcast.to(user?.room || '').emit('message', {
        user: 'admin',
        text: `${user?.name} has joined the room.`,
      });

      socket.join(user?.room || '');
      callback();
    });

    socket.on('sendMessage', async (message: string, callback) => {
      const user = getUser(socket.id);
      if (user) {
        const messageId = `${Date.now()}`; // Unique ID for the message

        if (!messages[user?.room || '']) {
          messages[user?.room || ''] = [];
        }

        // Store the message in the in-memory store
        messages[user?.room || ''].push({
          id: messageId,
          user: user?.name || 'Unknown',
          text: message,
          reactions: [],
        });

        // Emit the new message to all clients in the room
        io.to(user?.room || '').emit('message', {
          id: messageId,
          user: user?.name,
          text: message,
          reactions: [],
        });

        if (message.includes('@emBot')) {
          const aiResponse = await generateResponse(message);

          // Emit a new message to all clients in the room
          io.to(user?.room || '').emit('message', {
            id: messageId + 1,
            user: 'emBot',
            text: aiResponse.content,
            reactions: [],
          });
        }

        console.log(
          `Message from ${user?.name} to room ${user?.room}:`,
          message
        );
        callback();
      }
    });

    socket.on('sendReaction', ({ messageId, reaction }, callback) => {
      const user = getUser(socket.id);
      const room = user?.room || '';

      // Find and update the message with the reaction
      const roomMessages = messages[room] || [];
      const message = roomMessages.find((msg) => msg.id === messageId);

      if (message) {
        message.reactions.push({ user: user?.name || 'Unknown', reaction });

        io.to(room).emit('reaction', {
          messageId,
          user: user?.name,
          reaction,
        });

        console.log(
          `Reaction from ${user?.name} to message ${messageId}:`,
          reaction
        );
      }

      callback?.();
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('message', {
          user: 'admin',
          text: `${user.name} has left the room.`,
        });

        io.to(user.room).emit('roomData', {
          users: getUsersInRoom(user.room),
        });
      }

      console.log('user disconnected');
    });
  });
}
