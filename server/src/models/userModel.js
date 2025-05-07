class UserModel {
  constructor(user) {
    this.username = user.username;
    this.student_id = user.student_id; // New field
    this.department = user.department; // New field
    this.phone = user.phone; // New field (renamed from 'mobile')
    this.address = user.address; // New field
    this.email = user.email;
    this.password = user.password;
    this.user_type = user.user_type;
    this.wallet_address = user.wallet_address;
    this.nonce = user.nonce;
  }
}

export default UserModel;
