import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductImages.module.scss";
import { attachmentProduct } from "../../../../interfaces/admin/Api";

const cx = classNames.bind(styles);
interface props {
  attachment: attachmentProduct[];
}
const ProductImages: React.FC<props> = ({ attachment }) => {
  return (
    <div className={cx("image-container")}>
      <div className={cx("thumbnail-list")}>
        {attachment?.map((a) => (
          <img
            src={`http://127.0.0.1:8000/storage/product/attachments/${a?.image_url}`}
            alt="Thumb"
            width={100}
            key={a?.id}
          />
        ))}
      </div>
      <div className={cx("main-image")}>
        <img
          src={`http://127.0.0.1:8000/storage/product/${attachment[0].image_url}`}
          alt="Main Product"
          width={500}
        />
      </div>
    </div>
  );
};

export default ProductImages;
