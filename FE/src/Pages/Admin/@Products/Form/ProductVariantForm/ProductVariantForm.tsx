import React, { useState } from "react";
import styles from "./ProductVariantForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ProductVariantForm: React.FC = ( ) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  
  const handleToggle = () => {
    setIsChecked(!isChecked);
    console.log("Toggle State:", !isChecked); 
  };

  return (
    <div className={cx("variant-container")}>
      <div className={cx("header")}>
        <div className={cx("text-title")}>Phân loại hàng ( nếu có)</div>
        <div className={cx("checked-variant-box")}>
          <label className={cx("toggleSwitch")}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleToggle}
              className={cx("checkbox")}
            />
            <span className={cx("slider")}></span>
          </label>
        </div>
      </div>
      <div className={cx("line")}></div>
        {isChecked && ( <div className={cx("box-variant")}>
        <div className={cx("box-select-variant")}>
          <label htmlFor="select-variant">Chọn phân loại hàng</label>
          <select name="" id="select-variant" className={cx("select-variant")}>
            <option value="">Chọn phân loại</option>
          </select>
        </div>
        <div className={cx("box-select-variant-value")}>
          <label htmlFor="select-variant-value">Chọn màu sắc</label>
          <select name="" id="select-variant-value" className={cx("select-variant")}>
            <option value="">Chọn phân loại</option>
          </select>
        </div>
      </div>)}

    </div>
  );
};

export default ProductVariantForm;
