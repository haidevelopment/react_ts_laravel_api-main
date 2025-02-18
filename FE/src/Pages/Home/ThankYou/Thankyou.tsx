import React from "react";
import styles from "./ThankYou.module.scss";
import { Link } from "react-router-dom";

const ThankYou: React.FC = () => {
  const orderId = "L67G6ZWVT6"; // Lấy từ URL hoặc context nếu có

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <span>🛒 GIỎ HÀNG</span> --- <span>📦 ĐẶT HÀNG</span> ---
        <span className={styles.active}>🎉 HOÀN THÀNH ĐƠN HÀNG</span>
      </nav>

      <div className={styles.content}>
        <img
          src="/images/thankyou.png" // Thay bằng ảnh thực tế
          alt="Thank You"
          className={styles.thankYouImage}
        />
        <h2>Đặt hàng thành công</h2>
        <p>Cảm ơn Quý Khách đã đặt hàng tại TokyoLife</p>

        <div className={styles.orderInfo}>
          <p>
            Mã đơn đặt hàng: <strong>{orderId}</strong>
          </p>
          <p>
            Chúng tôi sẽ gửi thông tin chi tiết đơn hàng về địa chỉ email của
            Quý Khách hoặc{" "}
            <Link to={`/order/${orderId}`} className={styles.link}>
              Xem tại đây
            </Link>
            .
          </p>
        </div>

        <Link to="/" className={styles.button}>
          🛍 TIẾP TỤC MUA SẮM
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
