class UserModel {
  constructor(user) {
    this.username = user.username;
    this.student_id = user.student_id; // New field
    this.department = user.department; // New field
    this.phone = user.phone; // New field (renamed from 'mobile')
    this.address = user.address; // New field
    this.email = user.email;
    this.password = user.password;
    this.userType = user.userType;
  }
}

export default UserModel;
