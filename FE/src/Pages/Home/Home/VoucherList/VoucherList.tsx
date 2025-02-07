import React from "react";
import styles from "./VoucherList.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const VoucherList: React.FC = () => {
  return (
    <div className={cx("container")}>
        <div className={cx("title")}>
            <h2>MUA ONLINE NHẬN VOUCHER MAY MẮN</h2>
        </div>
      <div className={cx("voucherContainer")}>
        <div className={cx("voucher")}>
          <div className={cx("voucherLeft")}>
            <h3>GIẢM THÊM 100,000đ</h3>
            <p>
              Nhập mã <strong>THANTAI</strong>
            </p>
            <p>Cho đơn hàng từ 700,000đ</p>
            <p className={cx("expiry")}>Hết hạn: 28/02/2025</p>
          </div>
          <div className={cx("voucherDivider")}></div>
          <div className={cx("voucherRight")}>
            <button className={cx("copyButton")}>Sao chép mã</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherList;
