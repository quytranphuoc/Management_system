import React from "react";
import { Card } from "antd";
import classNames from "classnames";
import { startOfWeek, addDays, format } from "date-fns";
import { vi } from "date-fns/locale"; // tiếng Việt

const periods = Array.from({ length: 10 }, (_, i) => `Tiết ${i + 1}`);

// ✅ Tạo mảng days động theo ngày hiện tại
const getDaysOfWeek = (baseDate = new Date()) => {
  const start = startOfWeek(baseDate, { weekStartsOn: 1 }); // bắt đầu từ Thứ 2
  return Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(start, i);
    const weekday = format(date, "EEEE", { locale: vi }).toUpperCase(); // HAI, BA...
    const dateStr = format(date, "dd/MM/yyyy");
    return `${weekday}\n${dateStr}`;
  });
};

const schedule = [
  {
    day: 2, // TƯ
    period: 1,
    title: "Chuyên đề 4 (IT)(5)_SE_Blockchain",
    room: "K.A114",
    color: "bg-green-800",
  },
  {
    day: 2,
    period: 3,
    title: "Chủ nghĩa xã hội khoa học (7)",
    room: "K.C105",
    color: "bg-red-900",
  },
  {
    day: 3,
    period: 1,
    title: "Lịch sử Đảng Cộng sản Việt Nam (13)",
    room: "K.C206",
    color: "bg-green-700",
  },
  {
    day: 1,
    period: 6,
    title: "Bảo mật và An toàn hệ thống thông tin (8)",
    room: "V.A402",
    color: "bg-gray-800",
  },
  {
    day: 3,
    period: 6,
    title: "Điện toán đám mây (7)_TA",
    room: "V.A402",
    color: "bg-green-900",
  },
];

export default function Timetable() {
  const days = getDaysOfWeek(); // 📆 Lấy ngày hiện tại

  return (
    <div className="overflow-auto">
      <div className="grid grid-cols-8 border border-gray-300 ">
        <div className="border p-2 bg-gray-100 font-bold text-center">/</div>
        {days.map((day, i) => {
          const today = new Date();
          const start = startOfWeek(today, { weekStartsOn: 1 });
          const currentDayDate = addDays(start, i);
          const isToday =
            currentDayDate.toDateString() === today.toDateString();

          return (
            <div
              key={i}
              className={classNames(
                "border p-2 text-xs whitespace-pre-wrap text-center font-semibold",
                {
                  "bg-yellow-200 text-black": isToday, // 🌟 nổi bật
                }
              )}
            >
              {day}
            </div>
          );
        })}

        {periods.map((period, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="border p-2 text-center font-semibold bg-gray-100">
              {period}
            </div>

            {days.map((_, colIndex) => {
              const classItem = schedule.find(
                (cls) => cls.day === colIndex && cls.period === rowIndex + 1
              );

              return (
                <div
                  key={colIndex}
                  className={classNames("border min-h-[70px] p-1", {
                    "bg-blue-300": !classItem,
                  })}
                >
                  {classItem && (
                    <Card
                      size="small"
                      bordered={false}
                      className={`${classItem.color} text-white h-full`}
                      bodyStyle={{ padding: 8 }}
                    >
                      <div className="text-[12px] font-semibold">
                        {classItem.title}
                      </div>
                      <div className="text-[11px]">{classItem.room}</div>
                    </Card>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
