import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProductInfo.module.scss";
import { stateProduct, variantProduct } from "../../../../interfaces/admin/Api";
import { convertVND } from "../../../../utils/func/convert";
import Tick from "../../../../Components/Tick/Tick";
import { ToastError } from "../../../../utils/toast";
import Ruler from "../../../../Components/Ruler/Ruler";
import Ship from "../../../../Components/Ship/Ship";
import Refun from "../../../../Components/Refun/Refun";
import Coin from "../../../../Components/Coin/Coin";
import CartIcon1 from "../../../../Components/Cart/CartIcon1";
import CartIcon2 from "../../../../Components/Cart/CartIcon2";
import { InputCart } from "../../../../interfaces/admin/Form";
import { accountService } from "../../../../services/accountService";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { addCarts } from "../../../../Features/Slices/cartSlice";

const cx = classNames.bind(styles);

interface Props {
  product: stateProduct;
}

const ProductInfo: React.FC<Props> = ({ product }) => {
  const token = accountService.accountValue;
  const dispatch = useAppDispatch();
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: number]: number;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<variantProduct | null>(
    null
  );
  const [quantity, setQuantity] = useState<number>(1);

  const attributesMap = new Map<
    number,
    { id: number; value: string; name: string; atribute: number }[]
  >();
  product?.variant.forEach((variant) => {
    variant.variant_attribute_value.forEach(
      ({ attribute_id, attribute_value, attribute }) => {
        if (!attributesMap.has(attribute_id)) {
          attributesMap.set(attribute_id, []);
        }
        const existingValues = attributesMap.get(attribute_id)!;
        if (!existingValues.some((v) => v.id === attribute_value.id)) {
          existingValues.push({
            id: attribute_value.id,
            value: attribute_value.value,
            name: attribute.name,
            atribute: variant?.id,
          });
        }
      }
    );
  });
  const handleAddToCart = () => {
    if (!token) {
      ToastError("Vui lòng đăng nhập để thêm giỏ hàng");
      return;
    }

    if (product?.variant && !selectedVariant) {
      ToastError("Vui lòng chọn phân loại sản phẩm");
      return;
    }

    const cartItem: InputCart = {
      name: product.name,
      price: selectedVariant ? selectedVariant.price : product.price,
      image: selectedVariant ? selectedVariant.image : product.image,
      variant_id: selectedVariant ? selectedVariant.id : null,
      quantity: quantity,
      total:
        (selectedVariant ? selectedVariant.price : product.price) * quantity,
      id_product: product.id,
      id_user: token?.user?.id,
    };

    if (cartItem) {
      dispatch(addCarts(cartItem));
    } else {
      ToastError("Có lỗi xảy ra vui lòng thử lại sau");
    }
  };

  const handleSelectAttribute = (attributeId: number, valueId: number) => {
    const newSelection = { ...selectedAttributes, [attributeId]: valueId };
    setSelectedAttributes(newSelection);

    const foundVariant = product?.variant?.find((variant) =>
      variant.variant_attribute_value.every(
        ({ attribute_id, attribute_value }) =>
          newSelection[attribute_id] === attribute_value.id
      )
    );

    setSelectedVariant(foundVariant || null);
    setQuantity(1);
  };

  const getMaxQuantity = () =>
    selectedVariant ? selectedVariant.quantity : product?.quantity || 0;

  const handleQuantityChange = (newQuantity: number) => {
    const maxStock = getMaxQuantity();
    if (!selectedVariant && product?.variant.length > 0) {
      ToastError("Vui lòng chọn biến thể trước khi tăng số lượng.");
      return;
    }

    if (newQuantity < 1) {
      ToastError("Số lượng phải lớn hơn 0.");
      return;
    }

    if (newQuantity > maxStock) {
      ToastError(`Sản phẩm này chỉ còn ${maxStock} sản phẩm.`);
      return;
    }

    setQuantity(newQuantity);
  };

  return (
    <div className={cx("info-container")}>
      <div className={cx("sale")}>Bán chạy</div>
      <h1 className={cx("title")}>{product?.name}</h1>
      <span className={cx("sku")}>
        SKU: {selectedVariant ? selectedVariant.sku : product?.sku}
      </span>

      <div className={cx("price-notify")}>
        <div className={cx("price")}>
          {selectedVariant
            ? convertVND(selectedVariant.price)
            : convertVND(product?.price)}
        </div>
        <div className={cx("notify")}>
          Còn hàng <Tick />
        </div>
      </div>

      <div className={cx("discount")}>
        <div className={cx("title")}>DUY NHẤT HÔM NAY</div>
        <div className={cx("title2")}>Chỉ còn</div>
        <div className={cx("discount-price")}>735,300đ</div>
        <div className={cx("click-discount")}>Sao chép mã</div>
        <div className={cx("discount-content")}>
          Giảm <span style={{ color: "#c92127", fontWeight: "bold" }}>30%</span>{" "}
          khi nhập mã{" "}
          <span style={{ color: "#c92127", fontWeight: "bold" }}>CHAO2025</span>
        </div>
        <div className={cx("discount-content")}>
          Áp dụng mã ưu đãi tại bước thanh toán!
        </div>
      </div>

      <div className={cx("line")}></div>

      <div className={cx("variant-container")}>
        {[...attributesMap.entries()].map(([attributeId, values]) => (
          <div key={attributeId} className={cx("attribute-section")}>
            <h3 className={cx("attribute-title")}>{values[0].name}</h3>
            <div className={cx("attribute-row")}>
              {values.map(({ id, value, name, atribute }) => {
                const variantWithStock = product.variant.find((variant) =>
                  variant.variant_attribute_value.some(
                    (attr) => attr.attribute_value.id === id
                  )
                );
                const isOutOfStock = variantWithStock?.quantity === 0;

                return (
                  <button
                    key={id}
                    className={cx("attribute-btn", {
                      selected: selectedAttributes[attributeId] === id,
                      "out-of-stock": isOutOfStock,
                      "image-btn": name === "Màu sắc",
                    })}
                    onClick={() =>
                      !isOutOfStock && handleSelectAttribute(attributeId, id)
                    }
                    disabled={isOutOfStock}
                  >
                    {name == "Màu sắc" && Array.isArray(product.variant)
                      ? product.variant.map((v) =>
                          v?.id === atribute ? (
                            v?.image ? (
                              <img
                                key={v.id}
                                src={`http://127.0.0.1:8000/storage/variant/${v?.image}`}
                                className={cx("image-variant")}
                                alt="Variant"
                              />
                            ) : (
                              <span key={v.id} className={cx("fallback-text")}>
                                {value}
                              </span>
                            )
                          ) : null
                        )
                      : value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={cx("quantity-stock")}>
        Số lượng còn trong kho{" "}
        <span style={{ color: "#c92127", fontWeight: "bold" }}>
          {getMaxQuantity()}
        </span>{" "}
        sản phẩm
      </div>

      <div className={cx("line")}></div>

      <div className={cx("box-quantity-click")}>
        <div className={cx("quantity-title")}>SỐ LƯỢNG</div>
        <div className={cx("quantity-controls")}>
          <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
          <input type="text" value={quantity} readOnly />
          <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
        </div>
      </div>
      <div className={cx("instructional_images")}>
        <Ruler /> Hướng dẫn kích thước
      </div>
      <div className={cx("action-buttons")}>
        <button className={cx("btn", "add-to-cart")} onClick={handleAddToCart}>
          <CartIcon1 /> Thêm giỏ hàng
        </button>
        <button className={cx("btn", "buy-now")}>
          <CartIcon2 /> {""} Mua ngay
        </button>
      </div>

      <div className={cx("store-availability")}>Cửa hàng có sẵn sản phẩm</div>
      <div className={cx("infor-delivery")}>
        <div className={cx("delivery-item")}>
          <div className={cx("delivery-icon")}>
            <Ship />
          </div>
          <div className={cx("delivery-item-content")}>
            Miễn phí giao hàng cho đơn từ 300.000đ
          </div>
        </div>
        <div className={cx("delivery-item")}>
          <div className={cx("delivery-icon")}>
            <Refun />
          </div>
          <div className={cx("delivery-item-content")}>
            Lỗi 1 đổi 1 trong vòng 15 ngày (*)
          </div>
        </div>
        <div className={cx("delivery-item")}>
          <div className={cx("delivery-icon")}>
            <Coin />
          </div>
          <div className={cx("delivery-item-content")}>
            Được kiểm tra khi nhận hàng
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
