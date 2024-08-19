interface User {
  id: string;
  name: string;
  room: string;
}

const users: User[] = [];

export const addUser = ({ id, name, room }: User) => {
  name = name.trim();
  room = room.trim();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    console.log(`Username ${name} is taken in room ${room}`);
    return { error: "Username is taken" };
  }

  const user = { id, name, room };
  users.push(user);

  console.log(`User added: ${JSON.stringify(user)}`);
  return { user };
};

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    const removedUser = users.splice(index, 1)[0];
    console.log(`User removed: ${JSON.stringify(removedUser)}`);
    return removedUser;
  }

  console.log(`User with id ${id} not found`);
};

export const getUser = (id: string) => {
  const user = users.find((user) => user.id === id);
  console.log(
    `Getting user for id ${id}: ${user ? JSON.stringify(user) : "not found"}`
  );
  return user;
};

export const getUsersInRoom = (room: string) => {
  room = room.trim();
  const usersInRoom = users.filter((user) => user.room === room);
  console.log(`Getting users in room ${room}: ${JSON.stringify(usersInRoom)}`);
  return usersInRoom;
};
