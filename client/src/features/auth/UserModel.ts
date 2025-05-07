import { IUser } from "../../Types"; // Chỉnh path nếu cần

class UserModel {
  username: string;
  email: string;
  phone: string;
  password: string;

  address: string;
  dateOfBirth: string;

  constructor(user: IUser) {
    this.username = user.username ?? "";
    this.email = user.email ?? "";
    this.phone = user.phone ?? "";
    this.password = user.password ?? "";

    this.address = user.address ?? "";
    this.dateOfBirth = user.dateOfBirth ?? "";
  }
}

export default UserModel;
