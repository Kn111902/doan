import { Col, Row } from "antd";
import React from "react";
import logo from "../../assets/img/logo_footer.webp";

function Footer({ sticky = false }) {
  const about = [
    "Liên hệ: 19008181",
    "Giới thiệu",
    "Tuyển dụng",
    "Tin tức",
    "Hệ thống cửa hàng",
  ];
  const help = [
    "Hướng dẫn chọn size ",
    "Chính sách khách hàng thân thiết",
    "Chính sách đổi trả",
    "Chính sách bảo mật",
    "Thanh toán giao nhận",
  ];

  return (
    <div
      className={`text-white bg-footer-yody p-[50px] ${
        sticky ? "sticky-bottom" : ""
      }  `}
    >
      <div>
        <div className="text-center m-[30px]">
          <img src={logo} alt="" className="bg-footer-yody" />
        </div>
        <Row gutter={12}>
          <Col xs={24} sm={24} md={12} lg={8}>
            <p>
              “Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ
              hành động của mình” là sứ mệnh, là triết lý, chiến lược.. luôn
              cùng YODY tiến bước”
            </p>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            {about.map((data, index) => (
              <li className="font-bold text-center cursor-pointer" key={index}>
                {data}
              </li>
            ))}
          </Col>
          <Col xs={24} sm={24} md={12} lg={8}>
            {help.map((data, index) => (
              <li className="font-bold text-center cursor-pointer" key={index}>
                {data}
              </li>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
