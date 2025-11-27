export interface IRegister {
  username: string;
  email: string;
  password: string;
  role?: "admin" | "user";
}
