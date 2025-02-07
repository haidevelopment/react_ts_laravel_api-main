import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
import ProductImages from "../ProductImages/ProductImages";
import ProductInfo from "../ProductInfo/ProductInfo";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { getProducts } from "../../../../Features/Slices/productSlice";
import { useParams } from "react-router-dom";
import { stateProduct } from "../../../../interfaces/admin/Api";
import Loading from "../../../../Components/Loading";

const cx = classNames.bind(styles);

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<stateProduct | null>(null);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === Number(id));
      setProduct(foundProduct || null);
    }
  }, [products, id]);

  if (!product) return <Loading />

  return (
    <div className={cx("container")}>
      <div className={cx("breadcrumb")}>
        Trang chủ &gt; ƯU ĐÃI GIÁNG SINH &gt; {product.name}
      </div>
      <div className={cx("content")}>
        <ProductImages attachment={product.attachments} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;
