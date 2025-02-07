import React from "react";
import classNames from "classnames/bind";

import styles from "./ProductList.module.scss";
import ProductCard from "../ProductCard/ProductCard";

const cx = classNames.bind(styles);

const ProductList: React.FC = () => {
  return (
    <div className={cx("container")}>
      <h2>Sản phẩm của TOKYO LIFE</h2>
      <div className={cx("product-list")}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductList;
