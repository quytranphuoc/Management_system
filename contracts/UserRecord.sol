
// pragma solidity ^0.8.0;

// contract UserRecord {
//     struct User {
//         string name;
//         string studentId;
//         string department;
//         string phone;
//         string email;
//         string addr; // 'address' là từ khóa trong Solidity
//         uint256 createdAt;
//     }

//     mapping(string => User) private users; // mapping từ studentId đến User
//     string[] private userIds;

//     event UserRegistered(string studentId, string name, string email);

//     function registerUser(
//         string memory _studentId,
//         string memory _name,
//         string memory _department,
//         string memory _phone,
//         string memory _email,
//         string memory _addr
//     ) public {
//         require(bytes(users[_studentId].studentId).length == 0, "User already exists");

//         users[_studentId] = User({
//             name: _name,
//             studentId: _studentId,
//             department: _department,
//             phone: _phone,
//             email: _email,
//             addr: _addr,
//             createdAt: block.timestamp
//         });

//         userIds.push(_studentId);
//         emit UserRegistered(_studentId, _name, _email);
//     }

//     function getUser(string memory _studentId) public view returns (
//         string memory name,
//         string memory department,
//         string memory phone,
//         string memory email,
//         string memory addr,
//         uint256 createdAt
//     ) {
//         User memory u = users[_studentId];
//         require(bytes(u.studentId).length != 0, "User not found");
//         return (u.name, u.department, u.phone, u.email, u.addr, u.createdAt);
//     }

//     function getAllUserIds() public view returns (string[] memory) {
//         return userIds;
//     }
// }


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRecord {
    struct Student {
        string fullName;
        string studentId;
        string dateOfBirth;
        string gender;
        string addressInfo;
        string className;
        string course;
        string[] subjects;
        mapping(string => string) grades; // subject => grade
        bool exists;
    }

    mapping(address => Student) private students;
    address[] private studentAddresses;

    event StudentRegistered(address indexed user, string studentId);

    modifier studentExists(address user) {
        require(students[user].exists, "Student does not exist.");
        _;
    }

    function registerStudent(
        string memory _fullName,
        string memory _studentId,
        string memory _dateOfBirth,
        string memory _gender,
        string memory _addressInfo,
        string memory _className,
        string memory _course,
        string[] memory _subjects,
        string[] memory _grades
    ) public {
        require(!students[msg.sender].exists, "Student already exists.");
        require(_subjects.length == _grades.length, "Subjects and grades length mismatch.");

        Student storage student = students[msg.sender];
        student.fullName = _fullName;
        student.studentId = _studentId;
        student.dateOfBirth = _dateOfBirth;
        student.gender = _gender;
        student.addressInfo = _addressInfo;
        student.className = _className;
        student.course = _course;
        student.exists = true;

        for (uint i = 0; i < _subjects.length; i++) {
            student.subjects.push(_subjects[i]);
            student.grades[_subjects[i]] = _grades[i];
        }

        studentAddresses.push(msg.sender);

        emit StudentRegistered(msg.sender, _studentId);
    }

    function getStudent(address user) public view studentExists(user) returns (
        string memory, string memory, string memory, string memory,
        string memory, string memory, string memory, string[] memory, string[] memory
    ) {
        Student storage student = students[user];
        string[] memory grades = new string[](student.subjects.length);
        for (uint i = 0; i < student.subjects.length; i++) {
            grades[i] = student.grades[student.subjects[i]];
        }

        return (
            student.fullName,
            student.studentId,
            student.dateOfBirth,
            student.gender,
            student.addressInfo,
            student.className,
            student.course,
            student.subjects,
            grades
        );
    }

    function getAllStudents() public view returns (address[] memory) {
        return studentAddresses;
    }
}
