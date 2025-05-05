// import React, { useState } from "react";
// import { Avatar, Button, Select, Input, Tag } from "antd";
// import { EditOutlined, MailOutlined } from "@ant-design/icons";

// import axios from "axios";
// import { useEffect } from "react";
// import { IUser } from "../../../../Types"; // import kiểu dữ liệu
// import profileImg from "../../../../assets/image/img1.png";
// import { erther } from "ethers";
// import {
//   studentRecordABI,
//   contractAddress,
// } from "../../../../constants/studentRecordABI";
// const { Option } = Select;

// const getBlockchainStudentData = async () => {
//   const [user, setUserData] = useState<IUser | null>(null);
//   try {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     await provider.send("eth_requestAccounts", []); // yêu cầu MetaMask
//     const signer = provider.getSigner();
//     const userAddress = await signer.getAddress();

//     const contract = new ethers.Contract(contractAddress, studentRecordABI, provider);
//     const result = await contract.getStudent(userAddress);

//     // Gán dữ liệu vào state
//     const studentData = {
//       username: result[0],
//       studentId: result[1],
//       dateOfBirth: result[2],
//       gender: result[3],
//       address: result[4],
//       className: result[5],
//       course: result[6],
//       subjects: result[7],
//       grades: result[8],
//       email: "", // Nếu bạn lưu email ngoài blockchain
//       phone: "", // Nếu bạn lưu phone ngoài blockchain
//       userType: "student",
//     };

//     setUserData(studentData);
//   } catch (err) {
//     console.error("Blockchain student fetch error:", err);
//   }
// };
// useEffect(() => {
//   getBlockchainStudentData(); // gọi từ smart contract
// }, []);
//   return (
//     <div className="min-h-screen bg-white px-6 py-10 md:px-20">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center space-x-4">
//           <Avatar size={64} src={profileImg} />
//           <div>
//             <h2 className="text-xl font-semibold">{user?.username}</h2>
//             <p className="text-gray-500">{user?.email}</p>
//           </div>
//         </div>
//         <Button
//           type="primary"
//           icon={<EditOutlined />}
//           onClick={() => setIsEditing(!isEditing)}
//         >
//           {isEditing ? "Save" : "Edit"}
//         </Button>
//       </div>

//       {/* Form grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Username</label>
//           <Input
//             placeholder="Username"
//             defaultValue={user?.username}
//             disabled={!isEditing}
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Student ID</label>
//           <Input
//             placeholder="Student ID"
//             defaultValue={user?.studentId}
//             disabled={!isEditing}
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Department</label>
//           <Input
//             placeholder="Department"
//             defaultValue={user?.department}
//             disabled={!isEditing}
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Phone</label>
//           <Input
//             placeholder="Phone"
//             defaultValue={user?.phone}
//             disabled={!isEditing}
//           />
//         </div>
//         <div className="md:col-span-2">
//           <label className="block text-sm text-gray-600 mb-1">Address</label>
//           <Input
//             placeholder="Address"
//             defaultValue={user?.address}
//             disabled={!isEditing}
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Email</label>
//           <Input
//             placeholder="Email"
//             defaultValue={user?.email}
//             disabled={!isEditing}
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">User Type</label>
//           {isEditing ? (
//             <Select defaultValue={user?.userType} className="w-full">
//               <Option value="student">Student</Option>
//               <Option value="admin">Admin</Option>
//             </Select>
//           ) : (
//             <Tag
//               color={user?.userType === "admin" ? "red" : "blue"}
//               className="mt-1"
//             >
//               {user?.userType}
//             </Tag>
//           )}
//         </div>
//       </div>

//       {/* Email Info */}
//       <div className="mt-10">
//         <h3 className="text-md font-semibold mb-2">My email Address</h3>
//         <div className="flex items-center gap-3 p-4 border rounded-lg shadow-sm">
//           <MailOutlined className="text-2xl text-blue-500" />
//           <div>
//             <p className="text-gray-800">{user?.email}</p>
//             <p className="text-sm text-gray-500">Updated recently</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

// import React, { useEffect, useState } from "react";
// import { Avatar, Button, Select, Input, Tag } from "antd";
// import { EditOutlined, MailOutlined } from "@ant-design/icons";
// import { BrowserProvider, Contract } from "ethers";
// import profileImg from "../../../../assets/image/img1.png";
// import { IUser } from "../../../../Types";
// import {
//   studentRecordABI,
//   contractAddress,
// } from "../../../../constants/studentRecordABI";

// const { Option } = Select;

// const UserProfile: React.FC = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [user, setUserData] = useState<IUser | null>(null);

//   useEffect(() => {
//     const getBlockchainStudentData = async () => {
//       try {
//         if (!window.ethereum) {
//           console.error("MetaMask not detected");
//           return;
//         }

//         const provider = new BrowserProvider(window.ethereum);
//         await provider.send("eth_requestAccounts", []);
//         const signer = await provider.getSigner();
//         const userAddress = await signer.getAddress();

//         const contract = new Contract(
//           contractAddress,
//           studentRecordABI.abi,
//           signer
//         );
//         const result = await contract.getStudent(userAddress);

//         const studentData: IUser = {
//           username: result[0],
//           studentId: result[1],
//           dateOfBirth: result[2],
//           gender: result[3],
//           address: result[4],
//           className: result[5],
//           course: result[6],
//           subjects: result[7],
//           grades: result[8],
//           email: "", // Hoặc bạn có thể lấy từ backend/localStorage nếu cần
//           phone: "",
//           name: "",
//         };

//         setUserData(studentData);
//       } catch (err) {
//         console.error("Blockchain student fetch error:", err);
//       }
//     };

//     getBlockchainStudentData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-white px-6 py-10 md:px-20">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center space-x-4">
//           <Avatar size={64} src={profileImg} />
//           <div>
//             <h2 className="text-xl font-semibold">{user?.username}</h2>
//             <p className="text-gray-500">{user?.email}</p>
//           </div>
//         </div>
//         <Button
//           type="primary"
//           icon={<EditOutlined />}
//           onClick={() => setIsEditing(!isEditing)}
//         >
//           {isEditing ? "Save" : "Edit"}
//         </Button>
//       </div>

//       {/* Form grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Username</label>
//           <Input
//             placeholder="Username"
//             value={user?.username}
//             disabled={!isEditing}
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Student ID</label>
//           <Input
//             placeholder="Student ID"
//             value={user?.studentId}
//             disabled={!isEditing}
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Course</label>
//           <Input
//             placeholder="Course"
//             value={user?.course}
//             disabled={!isEditing}
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Phone</label>
//           <Input
//             placeholder="Phone"
//             value={user?.phone}
//             disabled={!isEditing}
//           />
//         </div>
//         <div className="md:col-span-2">
//           <label className="block text-sm text-gray-600 mb-1">Address</label>
//           <Input
//             placeholder="Address"
//             value={user?.address}
//             disabled={!isEditing}
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Email</label>
//           <Input
//             placeholder="Email"
//             value={user?.email}
//             disabled={!isEditing}
//           />
//         </div>
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">User Type</label>
//           {isEditing ? (
//             <Select value={user?.userType} className="w-full">
//               <Option value="student">Student</Option>
//               <Option value="admin">Admin</Option>
//             </Select>
//           ) : (
//             <Tag
//               color={user?.userType === "admin" ? "red" : "blue"}
//               className="mt-1"
//             >
//               {user?.userType}
//             </Tag>
//           )}
//         </div>
//       </div>

//       {/* Email Info */}
//       <div className="mt-10">
//         <h3 className="text-md font-semibold mb-2">My email Address</h3>
//         <div className="flex items-center gap-3 p-4 border rounded-lg shadow-sm">
//           <MailOutlined className="text-2xl text-blue-500" />
//           <div>
//             <p className="text-gray-800">{user?.email}</p>
//             <p className="text-sm text-gray-500">Updated recently</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import { Avatar, Button, Select, Input, Tag } from "antd";
import { EditOutlined, MailOutlined } from "@ant-design/icons";
import { BrowserProvider, Contract } from "ethers";
import profileImg from "../../../../assets/image/img1.png";
import { IUser } from "../../../../Types";
import {
  studentRecordABI,
  contractAddress,
} from "../../../../constants/studentRecordABI";

const { Option } = Select;

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    const getBlockchainStudentData = async () => {
      try {
        if (!window.ethereum) {
          console.error("❌ MetaMask not detected");
          return;
        }
        console.log("✅ MetaMask detected");

        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        console.log("✅ Provider created");

        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("✅ Signer address:", userAddress);

        const contract = new Contract(
          contractAddress,
          studentRecordABI.abi,
          signer
        );
        console.log("✅ Smart contract connected at:", contract.target);

        const result = await contract.getStudent(userAddress);
        console.log("✅ getStudent result:", result);

        const studentData: IUser = {
          username: result[0],
          studentId: result[1],
          dateOfBirth: result[2],
          gender: result[3],
          address: result[4],
          className: result[5],
          course: result[6],
          subjects: result[7],
          grades: result[8],
          email: "",
          phone: "",
          name: "",
        };

        setUserData(studentData);
      } catch (err) {
        console.error("❌ Blockchain student fetch error:", err);
      }
    };

    getBlockchainStudentData();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-10 md:px-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Avatar size={64} src={profileImg} />
          <div>
            <h2 className="text-xl font-semibold">{user?.username}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>

      {/* Form grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Username</label>
          <Input
            placeholder="Username"
            value={user?.username}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Student ID</label>
          <Input
            placeholder="Student ID"
            value={user?.studentId}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Course</label>
          <Input
            placeholder="Course"
            value={user?.course}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone</label>
          <Input
            placeholder="Phone"
            value={user?.phone}
            disabled={!isEditing}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Address</label>
          <Input
            placeholder="Address"
            value={user?.address}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <Input
            placeholder="Email"
            value={user?.email}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">User Type</label>
          {isEditing ? (
            <Select value={user?.userType} className="w-full">
              <Option value="student">Student</Option>
              <Option value="admin">Admin</Option>
            </Select>
          ) : (
            <Tag
              color={user?.userType === "admin" ? "red" : "blue"}
              className="mt-1"
            >
              {user?.userType}
            </Tag>
          )}
        </div>
      </div>

      {/* Email Info */}
      <div className="mt-10">
        <h3 className="text-md font-semibold mb-2">My email Address</h3>
        <div className="flex items-center gap-3 p-4 border rounded-lg shadow-sm">
          <MailOutlined className="text-2xl text-blue-500" />
          <div>
            <p className="text-gray-800">{user?.email}</p>
            <p className="text-sm text-gray-500">Updated recently</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
