export interface ITodo {
  title: string;
  description: string;
  difficulty: string;
  due_date: string;
}

export interface ITodoWithID extends ITodo {
  id: number | string;
}

// @ AUTH TYPES
export interface IUser {
  username: string;
  password: string;
}
