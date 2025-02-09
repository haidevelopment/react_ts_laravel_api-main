import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import oops from "../../../assets/image/logo/oops.jpg";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  editQuantityCart,
  getCart,
  removeCart,
} from "../../../Features/Slices/cartSlice";
import ShipCart from "../../../Components/Ship/ShipCart";
import { convertVND } from "../../../utils/func/convert";
import { FaArrowRight, FaChevronDown, FaTrashAlt } from "react-icons/fa";
import { variantProduct } from "../../../interfaces/admin/Api";
import ModalAttributes from "./ModalAttributes/ModalAttributes";
import Gif from "../../../Components/Refun/Gif";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import CartIcon1 from "../../../Components/Cart/CartIcon1";
import CartIcon3 from "../../../Components/Cart/CartIcon3";
import CheckoutIcon1 from "../../../Components/Cart/CheckoutIcon1";
import CompleteIcon1 from "../../../Components/Cart/CompleteIcon1";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const [id, setId] = useState<number>(0);
  const [selected, setSelected] = useState<variantProduct[] | null>(null);
  const [defaultVariant, setDefaultVariant] = useState<variantProduct | null>(
    null
  );
  const [excuseme, setExcuseme] = useState(false);
  const [localCart, setLocalCart] = useState(cart);
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);
  const totalPrice = useMemo(() => {
    return localCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [localCart]);

  const hanleSelected = (
    id: number,
    variant: variantProduct[],
    defaults: variantProduct
  ) => {
    setId(id);
    setSelected(variant);
    setDefaultVariant(defaults);
    setIsOpen(!isOpen);
  };
  const handleSetModal = () => {
    setIsOpen(false);
  };
  const handleIncrease = (id: number) => {
    setExcuseme(true);
    setLocalCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    setTimeout(() => {
      const cartItem = localCart.find((item) => item.id == id);
      if (!cartItem) return;

      dispatch(editQuantityCart({ id, quantity: cartItem.quantity + 1 }));
      setExcuseme(false);
    }, 500);
  };

  const handleDecrease = (id: number) => {
    setExcuseme(true);
    setLocalCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

    setTimeout(() => {
      const cartItem = localCart.find((item) => item.id == id);
      if (!cartItem) return;

      dispatch(editQuantityCart({ id, quantity: cartItem.quantity - 1 }));
      setExcuseme(false);
    }, 500);
  };
  const handleRemoveCart = (id: number) => {
    if (confirm("Bạn muốn xoá ?")) {
      dispatch(removeCart(id));
    }
  };
  return (
    <div className={cx("cart-container")}>
      <div className={cx("steps")}>
        <div className={cx("step1")}>
          <CartIcon3 /> {"  "}GIỎ HÀNG
        </div>{" "}
        <div className={cx("line")}></div>{" "}
        <div className={cx("steps2")}>
          {" "}
          <CheckoutIcon1 /> {"  "} ĐẶT HÀNG
        </div>{" "}
        <div className={cx("line")}></div>{" "}
        <div className={cx("steps3")}>
          <CompleteIcon1 /> {"  "} HOÀN THÀNH ĐƠN HÀNG
        </div>
      </div>
      {cart.length === 0 ? (
        <div className={cx("empty-cart")}>
          <img src={oops} alt="Empty cart" className={cx("oop-img")} />
          <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
          <button className={cx("continue-btn")}>TIẾP TỤC MUA SẮM</button>
        </div>
      ) : (
        <div className={cx("cart-content")}>
          <div className={cx("cart-item-container")}>
            <div className={cx("box-notify")}>
              <div className={cx("notify-icon")}>
                <ShipCart />
              </div>
              <div className={cx("notify-text")}>
                <div className={cx("title")}>
                  Quý khách đã được áp dụng <span>FreeShip 0đ</span>
                </div>
                <div className={cx("warning")}>
                  (Có thể thay đổi nếu áp dụng code ưu đãi)
                </div>
              </div>
            </div>
            <div className={cx("box-cart-items")}>
              <div className={cx("title")}>
                GIỎ HÀNG <span>({localCart?.length} sản phẩm )</span>
              </div>
              <div className={cx("cart-items")}>
                <table>
                  <thead>
                    <th>Hình Ảnh</th>
                    <th>Tên Sản Phẩm</th>
                    <th>Giá</th>
                    <th>Số Lượng</th>
                    <th>Tổng Tiền</th>
                  </thead>
                  <tbody>
                    {localCart?.map((c) => (
                      <tr key={c?.id}>
                        <td>
                          <img
                            src={`http://127.0.0.1:8000/storage/${
                              c?.variant_id ? "variant" : "product"
                            }/${c?.image}`}
                            width={100}
                            alt=""
                          />
                        </td>
                        <td>
                          <tr>
                            <span className={cx("name")}>{c?.name}</span>
                          </tr>
                          <tr>
                            <button
                              className={cx("select-variant")}
                              onClick={() =>
                                hanleSelected(
                                  c?.id,
                                  c?.product?.variant,
                                  c?.variant
                                )
                              }
                            >
                              CHỌN PHÂN LOẠI <FaChevronDown />
                            </button>
                          </tr>
                          <tr>
                            {c?.variant?.variant_attribute_value?.map((v) => (
                              <div className={cx("variant-values")} key={v?.id}>
                                <span className={cx("attribute")}>
                                  {v?.attribute.name}
                                </span>{" "}
                                :{" "}
                                <span className={cx("value")}>
                                  {v?.attribute_value?.value}
                                </span>
                              </div>
                            ))}
                          </tr>
                        </td>
                        <td>{convertVND(c?.price)}</td>
                        <td>
                          <div className={cx("quantity-box")}>
                            <button
                              className={cx("btn")}
                              onClick={() => handleDecrease(c.id)}
                              disabled={c.quantity <= 1 || excuseme}
                            >
                              −
                            </button>
                            <input
                              type="text"
                              value={c.quantity}
                              readOnly
                              className={cx("input")}
                            />
                            <button
                              className={cx("btn")}
                              onClick={() => handleIncrease(c.id)}
                              disabled={excuseme}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          <tr>{convertVND(c.price * c.quantity)}</tr>

                          <tr>
                            <button
                              className={cx("btn-del-cart")}
                              onClick={() => handleRemoveCart(c?.id)}
                            >
                              <FaTrashAlt />
                            </button>
                          </tr>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {isOpen && (
                <div className={cx("modal-list-variant")}>
                  <ModalAttributes
                    id={id}
                    variant={selected}
                    onClose={handleSetModal}
                    defaultVariant={defaultVariant}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={cx("order-summary")}>
            <h3>ĐƠN HÀNG</h3>
            <div className={cx("total-amount")}>
              <div className={cx("price")}>Tổng giá trị đơn hàng:</div>{" "}
              <strong>{convertVND(totalPrice)}</strong>
            </div>
            <div className={cx("line")}></div>
            <button className={cx("checkout-btn")}  onClick={()=>nav('/checkout')}>
              TIẾP TỤC THANH TOÁN <FaArrowRight />
            </button>
            <div className={cx("notify")}>
              Dùng mã giảm giá của <span>TokyoLife</span> trong bước tiếp theo
            </div>
            <div className={cx("box-product")}>
              <div className={cx("title")}>
                <Gif /> Sản phẩm dành cho bạn
              </div>
              <div className={cx("line")}></div>
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={10}
                slidesPerView={2}
                navigation
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                className={cx("swiper")}
              >
                {localCart.map((c) => (
                  <SwiperSlide key={c?.id} className={cx("productCard")}>
                    <img
                      src={`http://127.0.0.1:8000/storage/variant/${c?.image}`}
                      alt={c.name}
                      className={cx("productImage")}
                    />
                    <h4 className={cx("productName")}>{c.name}</h4>
                    <p className={cx("price")}>
                      <span className={cx("currentPrice")}>
                        {convertVND(c?.price)}
                      </span>
                    </p>
                    <div className={cx("variants")}></div>

                    <button className={cx("addToCart")}>
                      <CartIcon1 /> Thêm giỏ hàng
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
