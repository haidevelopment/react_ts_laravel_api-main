import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductCard.module.scss";
import { stateProduct } from "../../../../interfaces/admin/Api";
import { convertVND } from "../../../../utils/func/convert";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
interface props {
  data: stateProduct;
}
const ProductCard: React.FC<props> = ({ data }) => {
  return (
    <div className={cx("product-card")}>
      <div className={cx("image-wrapper")}>
        <div className={cx("tags")}>
          <span className={cx("banchay")}>Bán chạy</span>
        </div>
        <Link to={`/detail/${data.id}`}>
          <img
            src={`http://127.0.0.1:8000/storage/product/${data.image}`}
            alt="Product"
            className={cx("image")}
          />
        </Link>
      </div>

      <div className={cx("discount-banner")}>
        <span className={cx("discount")}>Giảm thêm 100K</span>
      </div>

      <div className={cx("info")}>
        <h3 className={cx("title")}>
          <Link to={`/detail/${data.id}`}>{data.name}</Link>
        </h3>
        <div className={cx("price")}>
          <span className={cx("current-price")}>{convertVND(data.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
