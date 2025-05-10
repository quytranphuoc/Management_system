/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Slider from "react-slick";

type Notice = {
  date: string;
  title: string;
  isHot?: boolean;
};

type NewsItem = {
  date: string;
  title: string;
  isNew?: boolean;
};

type QuickLink = {
  image: string;
  label: string;
  url: string;
};

const notices: Notice[] = [
  {
    date: "28/03/2025",
    title:
      "Hồ sơ mời tài trợ Kỷ niệm 50 năm thành lập Trường ĐH Việt Hàn, ĐHĐN",
    isHot: true,
  },
  {
    date: "26/04/2025",
    title: "Gia hạn thu học phí (đợt 2) học kỳ II năm học 2024-2025",
  },
  {
    date: "15/04/2025",
    title: "Thư mời gặp mặt thân mật cựu sinh viên nhân dịp Kỷ niệm 50 năm",
  },
];

const news: NewsItem[] = [
  {
    title: "Nghiên cứu sinh Đỗ Minh Đức bảo vệ thành công luận án Tiến sĩ",
    date: "29/04/2025",
    isNew: true,
  },
  {
    title: "Tọa đàm về phòng chống tội phạm an ninh mạng",
    date: "29/04/2025",
    isNew: true,
  },
];

const quickLinks: QuickLink[] = [
  {
    image: "/assets/sv.png",
    label: "HỆ THỐNG THÔNG TIN SINH VIÊN",
    url: "https://sv.dut.udn.vn/",
  },
  {
    image: "/assets/doanhnghiep.png",
    label: "HỆ THỐNG TÁC NGHIỆP",
    url: "https://egov.dut.udn.vn/",
  },
  {
    image: "/assets/elearning.png",
    label: "E-LEARNING",
    url: "https://elearning.dut.udn.vn/",
  },
  {
    image: "/assets/khoahoc.png",
    label: "QUẢN LÝ KHOA HỌC",
    url: "https://qlkh.dut.udn.vn/",
  },
];
const settings: any = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Home: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Carousel full width */}
      <Slider {...settings}>
        <img
          src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://vku.udn.vn/wp-content/uploads/2025/04/Bia-50-nam-ngay-giai-phong.jpg"
          alt="image 1"
          className="h-[700px] w-full object-cover"
        />
        <img
          src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://vku.udn.vn/wp-content/uploads/2025/02/Bia-FB-2025-2-scaled.jpg"
          alt="image 2"
          className="h-[700px] w-full object-cover"
        />
        <img
          src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://vku.udn.vn/wp-content/uploads/2024/12/Banner-5-nam.jpg"
          alt="image 3"
          className="h-[700px] w-full object-cover"
        />
      </Slider>

      {/* Grid layout below carousel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Notices */}
        <div>
          <h2 className="font-bold text-lg mb-2">📌 THÔNG BÁO</h2>
          <ul className="space-y-3">
            {notices.map((item, idx) => (
              <li key={idx} className="border-l-4 border-blue-600 pl-2">
                <p className="text-sm font-medium">
                  {item.title}
                  {item.isHot && (
                    <span className="text-red-600 font-bold ml-1">HOT</span>
                  )}
                </p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* News */}
        <div>
          <h2 className="font-bold text-lg mb-2">📰 TIN TỨC & SỰ KIỆN</h2>
          <ul className="space-y-3">
            {news.map((item, idx) => (
              <li key={idx} className="border-l-4 border-green-600 pl-2">
                <p className="text-sm font-medium">
                  {item.title}
                  {item.isNew && (
                    <span className="text-green-600 font-bold ml-1">NEW</span>
                  )}
                </p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <img src="/assets/bkdn50.png" alt="BKDN 50" className="w-full mb-4" />
          <h2 className="font-bold text-lg mb-2">🔗 LIÊN KẾT NHANH</h2>
          <div className="grid grid-cols-1 gap-3">
            {quickLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition"
              >
                <img
                  src={link.image}
                  alt={link.label}
                  className="w-full rounded shadow"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
