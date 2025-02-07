import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductCard.module.scss";

const cx = classNames.bind(styles);

const ProductCard: React.FC = () => {
  return (
    <div className={cx("product-card")}>
      <div className={cx("image-wrapper")}>
        <div className={cx("tags")}>
          <span className={cx("banchay")}>Bán chạy</span>
        </div>
        <img
          src="https://via.placeholder.com/200"
          alt="Product"
          className={cx("image")}
        />
      </div>

      <div className={cx("discount-banner")}>
        <span className={cx("discount")}>Giảm thêm 100K</span>
      </div>

      <div className={cx("info")}>
        <h3 className={cx("title")}>Áo khoác lông vũ Nam siêu nhẹ</h3>
        <div className={cx("price")}>
          <span className={cx("current-price")}>899,000đ</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
