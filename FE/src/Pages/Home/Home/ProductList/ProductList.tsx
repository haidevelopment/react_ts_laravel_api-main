import React from "react";
import classNames from "classnames/bind";

import styles from "./ProductList.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import { stateProduct } from "../../../../interfaces/admin/Api";

const cx = classNames.bind(styles);
interface props {
  type: string;
  data: stateProduct[];
}
const ProductList: React.FC<props> = ({ type, data }) => {
  console.log(data);
  
  return (
    <div className={cx("container")}>
      <h2>{type== "nomal" ? "Sản phẩm của TOKYO LIFE" : "Sản phẩm "}</h2>
      <div className={cx("product-list")}>
        {data?.map((p)=>(
           <ProductCard data={p} key={p?.id} />
        ))}
      
      </div>
    </div>
  );
};

export default ProductList;
