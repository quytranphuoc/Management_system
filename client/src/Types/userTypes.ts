// export interface IUser {
//   id?: string;

//   username: string;
//   email: string;
//   phone?: string; // Gộp mobile và phone thành 1
//   password?: string;
//   userType?: "admin" | "user";
//   name?: string;
//   walletAddress?: string;
//   studentId?: string;
//   createdById?: string;
//   department?: string;
//   lastLogin?: string;
//   nonce?: string;
//   address?: string;
//   major?: string;
//   dateOfBirth?: string; // nếu bạn định nghĩa "Da" là ngày sinh
// }

export interface IUser {
  id?: string; // ID trong hệ thống backend hoặc frontend (không phải blockchain)

  // Từ contract UserRecord
  name: string; // = fullName
  studentId: string;
  department?: string; // Khoa
  phone?: string;
  email: string;
  address?: string; // Địa chỉ thường trú hoặc liên hệ
  createdAt?: number; // timestamp

  // Từ contract StudentRecord
  dateOfBirth?: string;
  gender?: string;
  className?: string;
  course?: string;
  subjects?: string[];
  grades?: Record<string, string>; // subject => grade

  // Metadata bổ sung cho hệ thống quản lý người dùng
  username?: string;
  password?: string;
  userType?: "admin" | "user";
  walletAddress?: string;
  createdById?: string;
  lastLogin?: string; // ISO string
  nonce?: string; // Cho xác thực MetaMask
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: IUser;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterData extends ILoginCredentials {
  username: string;
  mobile: string;
  userType?: "admin" | "user";
  studentId?: string;
  major?: string;
  enrollmentYear?: number;
  walletAddress?: string;
}

export interface IMetaMaskAuthData {
  address: string;
  signature: string;
  message?: string;
  nonce?: string;
}

export interface INonceResponse {
  success: boolean;
  nonce: string;
  message: string;
}

export interface IWalletLinkData {
  walletAddress: string;
}
