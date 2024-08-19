export interface Message {
  id: string;
  user: string;
  text: string;
  reactions: { user: string; reaction: string }[];
}
