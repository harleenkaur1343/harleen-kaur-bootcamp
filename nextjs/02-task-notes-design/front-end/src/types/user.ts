export type Register = {
  name: string;
  email: string;
  password: string;
};

export type Login = Omit<Register, "name">;
