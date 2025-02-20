import React, { useEffect, useState } from "react";
import styles from "./ProductInventory.module.scss";
import classNames from "classnames/bind";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { stateProduct, variantProduct } from "../../../../interfaces/admin/Api";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { getProducts } from "../../../../Features/Slices/productSlice";

const cx = classNames.bind(styles);
interface props{
    onClose : ()=>void;
}
const ProductInventory: React.FC<props> = ({onClose}) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const [expandedProductId, setExpandedProductId] = useState<number | null>(
    null
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const toggleDropdown = (productId: number) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  return (
    <div className={cx("inventory-container")}>
        <button className={cx("btn-close")} onClick={onClose}>x</button>
      <h2>Danh sách tồn kho sản phẩm</h2>
      <ul className={cx("product-list")}>
        {products.map((product: stateProduct) => (
          <li key={product.id} className={cx("product-item")}>
            <div
              className={cx("product-header")}
              onClick={() => toggleDropdown(product.id)}
            >
              <div className={cx("product-info")}>
                <img
                  src={`http://127.0.0.1:8000/storage/product/${product.image}`}
                  alt={product.name}
                  className={cx("product-image")}
                />
                <div className={cx("product-details")}>
                  <span className={cx("product-name")}>{product.name}</span>
                  <span className={cx("product-quantity")}>
                    Tồn kho: {product.quantity}
                  </span>
                </div>
              </div>
              <span className={cx("icon")}>
                {expandedProductId === product.id ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </span>
            </div>

            <div
              className={cx("dropdown", {
                expanded: expandedProductId === product.id,
              })}
            >
              <ul className={cx("variant-list")}>
                {product.variant.length > 0 ? (
                  product.variant.map((variant: variantProduct) => (
                    <li key={variant.id} className={cx("variant-item")}>
                      <div className={cx("variant-info")}>
                        <img
                          src={`http://127.0.0.1:8000/storage/variant/${variant.image}`}
                          alt="Variant"
                          className={cx("variant-image")}
                        />
                        <div className={cx("flex-variant")}>
                          <div className={cx("variant-name")}>
                            {variant.variant_attribute_value
                              .map((attr) => attr.attribute_value.value)
                              .join(" - ")}
                          </div>
                          <div className={cx("variant-quantity")}>
                            Tồn kho: {variant.quantity}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className={cx("no-variant")}>Không có biến thể</li>
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductInventory;
