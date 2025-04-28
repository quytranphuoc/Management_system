import React from "react";
import { Card, Avatar, Button, Descriptions } from "antd";

const StudentProfile: React.FC = () => {
  const student = {
    name: "Nguyễn Văn A",
    email: "student@example.com",
    studentId: "SV001",
    className: "DHKTPM16A",
    major: "Kỹ thuật phần mềm",
    phone: "0123456789",
    address: "Đà Nẵng, Việt Nam",
  };

  return (
    <div className="flex justify-center p-6">
      <Card
        className="w-full max-w-2xl"
        bordered={false}
        cover={
          <div className="flex justify-center mt-4">
            <Avatar size={100} src="/path/to/avatar.png" />
          </div>
        }
      >
        <h2 className="text-center text-2xl font-semibold mb-4">
          {student.name}
        </h2>

        <Descriptions
          title="Thông tin sinh viên"
          bordered
          column={1}
          size="middle"
        >
          <Descriptions.Item label="Mã sinh viên">{student.studentId}</Descriptions.Item>
          <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
          <Descriptions.Item label="Lớp">{student.className}</Descriptions.Item>
          <Descriptions.Item label="Ngành học">{student.major}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{student.phone}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{student.address}</Descriptions.Item>
        </Descriptions>

        <div className="flex justify-center mt-6">
          <Button type="primary">Chỉnh sửa hồ sơ</Button>
        </div>
      </Card>
    </div>
  );
};

export default StudentProfile;
