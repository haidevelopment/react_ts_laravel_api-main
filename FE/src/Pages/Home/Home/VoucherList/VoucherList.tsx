import React, { useState } from "react";
import styles from "./VoucherList.module.scss";
import classNames from "classnames/bind";
import { stateCoupon } from "../../../../interfaces/admin/Api";
const cx = classNames.bind(styles);
import tokyo from "../../../../assets/image/logo/tokyo.png";
import { formatDateVietnamese } from "../../../../utils/func/convert";
interface props {
  coupon: stateCoupon;
}
const VoucherList: React.FC<props> = ({ coupon }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={cx("card")}>
      <div className={cx("main")}>
        <div className={cx("co-img")}>
          <img src={tokyo} alt={coupon.title} />
        </div>
        <div className={cx("vertical")}></div>
        <div className={cx("content")}>
          <h2>{coupon.title}</h2>
          <h1>
            {parseInt(coupon.value, 10)} <span> {coupon?.discount_type == 'percent' ? '%' : 'đ'}</span>
          </h1>
          <p>Hết hạn : {formatDateVietnamese(coupon?.end_date)}</p>
        </div>
      </div>
      <div className={cx("copy-button")}>
        <input type="text" readOnly value={coupon.code} />
        <button onClick={copyToClipboard} className={cx("copybtn")}>
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
    </div>
  );
};

export default VoucherList;
