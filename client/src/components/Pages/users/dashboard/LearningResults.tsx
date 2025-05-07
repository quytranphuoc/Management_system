import React, { useEffect, useState } from "react";
import { Table, Typography, Tag } from "antd";

const { Text } = Typography;

const columns = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: 50,
  },
  {
    title: "Tên lớp học phần",
    dataIndex: "subject",
    key: "subject",
    render: (text: string) => <Text strong>{text}</Text>,
  },
  {
    title: "Số TC",
    dataIndex: "credits",
    key: "credits",
    width: 70,
  },
  {
    title: "Lần học",
    dataIndex: "attempt",
    key: "attempt",
    width: 80,
  },
  {
    title: "Điểm CC / GVHD",
    dataIndex: "cc",
    key: "cc",
    width: 120,
  },
  {
    title: "Điểm Bài tập",
    dataIndex: "assignment",
    key: "assignment",
    width: 120,
  },
  {
    title: "Điểm Giữa kỳ",
    dataIndex: "midterm",
    key: "midterm",
    width: 120,
  },
  {
    title: "Điểm Cuối kỳ / Đồ Án",
    dataIndex: "final",
    key: "final",
    width: 150,
  },
  {
    title: "Điểm T10",
    dataIndex: "average",
    key: "average",
    width: 100,
    render: (val: number) => <Text strong>{val}</Text>,
  },
  {
    title: "Điểm Chữ",
    dataIndex: "letterGrade",
    key: "letterGrade",
    width: 100,
    render: (grade: string) => {
      const colorMap: Record<string, string> = {
        A: "green",
        B: "blue",
        C: "orange",
        D: "red",
        F: "red",
      };
      return <Tag color={colorMap[grade] || "default"}>{grade}</Tag>;
    },
  },
];

export default function GradeTable() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    // 🔁 Giả lập fetch từ backend
    const fetchGrades = async () => {
      // Gọi API thật ở đây
      const res = await fetch("/api/grades"); // Replace this with actual API
      const data = await res.json();
      setGrades(data);
    };

    fetchGrades();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="bg-blue-400 p-2 mb-2 text-center font-semibold text-sm">
        Học kỳ 1 - 2021-2022
      </div>
      <Table
        columns={columns}
        dataSource={grades}
        rowKey="id"
        pagination={false}
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}
