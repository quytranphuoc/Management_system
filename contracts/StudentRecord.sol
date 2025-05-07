// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract StudentRecord is AccessControl, ReentrancyGuard {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant STUDENT_ROLE = keccak256("STUDENT_ROLE");
    
    struct Student {
        string studentId;
        string name;
        string major;
        uint256 enrollmentYear;
        bool isActive;
        address walletAddress;
    }
    
    struct Grade {
        string courseId;
        string courseName;
        uint8 creditHours;
        uint8 grade; // 0-100
    }
    
    struct TuitionFee {
        uint256 amount;
        uint256 dueDate;
        bool isPaid;
        uint256 paidDate;
        uint256 transactionId;
    }
    
    mapping(string => Student) public students;
    mapping(string => mapping(string => Grade)) public grades; // studentId => courseId => Grade
    mapping(string => TuitionFee[]) public tuitionFees; // studentId => TuitionFee[]
    mapping(address => string) public walletToStudentId;
    
    event StudentAdded(string studentId, string name, address walletAddress);
    event GradeAdded(string studentId, string courseId, uint8 grade);
    event TuitionFeeAdded(string studentId, uint256 amount, uint256 dueDate);
    event TuitionFeePaid(string studentId, uint256 amount, uint256 paidDate);
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _;
    }
    
    modifier onlyStudentOrAdmin(string memory studentId) {
        require(
            hasRole(ADMIN_ROLE, msg.sender) || 
            keccak256(abi.encodePacked(walletToStudentId[msg.sender])) == keccak256(abi.encodePacked(studentId)),
            "Not authorized"
        );
        _;
    }
    
    function addStudent(
        string memory studentId,
        string memory name,
        string memory major,
        uint256 enrollmentYear,
        address walletAddress
    ) public onlyAdmin {
        require(bytes(students[studentId].studentId).length == 0, "Student already exists");
        
        students[studentId] = Student({
            studentId: studentId,
            name: name,
            major: major,
            enrollmentYear: enrollmentYear,
            isActive: true,
            walletAddress: walletAddress
        });
        
        walletToStudentId[walletAddress] = studentId;
        _grantRole(STUDENT_ROLE, walletAddress);
        
        emit StudentAdded(studentId, name, walletAddress);
    }
    
    function addGrade(
        string memory studentId,
        string memory courseId,
        string memory courseName,
        uint8 creditHours,
        uint8 grade
    ) public onlyAdmin {
        require(bytes(students[studentId].studentId).length > 0, "Student does not exist");
        require(grade <= 100, "Grade must be between 0-100");
        
        grades[studentId][courseId] = Grade({
            courseId: courseId,
            courseName: courseName,
            creditHours: creditHours,
            grade: grade
        });
        
        emit GradeAdded(studentId, courseId, grade);
    }
    
    function addTuitionFee(
        string memory studentId,
        uint256 amount,
        uint256 dueDate
    ) public onlyAdmin {
        require(bytes(students[studentId].studentId).length > 0, "Student does not exist");
        
        tuitionFees[studentId].push(TuitionFee({
            amount: amount,
            dueDate: dueDate,
            isPaid: false,
            paidDate: 0,
            transactionId: 0
        }));
        
        emit TuitionFeeAdded(studentId, amount, dueDate);
    }
    
    function payTuitionFee(string memory studentId, uint256 feeIndex) public payable nonReentrant {
        require(bytes(students[studentId].studentId).length > 0, "Student does not exist");
        require(
            keccak256(abi.encodePacked(walletToStudentId[msg.sender])) == keccak256(abi.encodePacked(studentId)),
            "Not authorized"
        );
        require(feeIndex < tuitionFees[studentId].length, "Invalid fee index");
        require(!tuitionFees[studentId][feeIndex].isPaid, "Fee already paid");
        require(msg.value == tuitionFees[studentId][feeIndex].amount, "Incorrect amount");
        
        tuitionFees[studentId][feeIndex].isPaid = true;
        tuitionFees[studentId][feeIndex].paidDate = block.timestamp;
        tuitionFees[studentId][feeIndex].transactionId = block.number;
        
        emit TuitionFeePaid(studentId, msg.value, block.timestamp);
    }
    
    function getStudentInfo(string memory studentId) public view onlyStudentOrAdmin(studentId) returns (Student memory) {
        require(bytes(students[studentId].studentId).length > 0, "Student does not exist");
        return students[studentId];
    }
    
    function getStudentGrades(string memory studentId, string memory courseId) public view onlyStudentOrAdmin(studentId) returns (Grade memory) {
        require(bytes(students[studentId].studentId).length > 0, "Student does not exist");
        return grades[studentId][courseId];
    }
    
    function getStudentTuitionFees(string memory studentId) public view onlyStudentOrAdmin(studentId) returns (TuitionFee[] memory) {
        require(bytes(students[studentId].studentId).length > 0, "Student does not exist");
        return tuitionFees[studentId];
    }
    
    function updateStudentStatus(string memory studentId, bool isActive) public onlyAdmin {
        require(bytes(students[studentId].studentId).length > 0, "Student does not exist");
        students[studentId].isActive = isActive;
    }
    
    function updateStudentWallet(string memory studentId, address newWalletAddress) public onlyAdmin {
        require(bytes(students[studentId].studentId).length > 0, "Student does not exist");
        
        address oldWalletAddress = students[studentId].walletAddress;
        
        // Revoke role from old wallet
        _revokeRole(STUDENT_ROLE, oldWalletAddress);
        delete walletToStudentId[oldWalletAddress];
        
        // Update to new wallet
        students[studentId].walletAddress = newWalletAddress;
        walletToStudentId[newWalletAddress] = studentId;
        _grantRole(STUDENT_ROLE, newWalletAddress);
    }
}
