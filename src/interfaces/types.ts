export interface User {
  id: string;
  name: string;
  room: string;
}

export interface AddUserArgs {
  id: string;
  name: string;
  room: string;
}

export interface AddUserResponse {
  error?: string;
  user?: User;
}
