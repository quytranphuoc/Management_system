export interface IUser {
  username: string;
  email: string;
  mobile: string;
  password?: string;
  userType?: "admin" | "user";
  name?: string;
}
