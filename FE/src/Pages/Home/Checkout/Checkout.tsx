import React, { useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./Checkout.module.scss";
import oops from "../../../assets/image/logo/oops.jpg";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getCart } from "../../../Features/Slices/cartSlice";
import { convertVND } from "../../../utils/func/convert";
import CompleteIcon1 from "../../../Components/Cart/CompleteIcon1";
import CheckoutIcon2 from "../../../Components/Cart/CheckoutIcon2";
import CartIcon3 from "../../../Components/Cart/CartIcon3";
import Address from "../../../Components/Ship/Address";
import area from "../../../assets/image/logo/area.jpg";
import PaymentMethod from "../../../Components/Ship/PaymentMethod";
const cx = classNames.bind(styles);

const Checkout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
 
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);
  const payment_method = [
    {
      name: "Thanh Toán Qua VNPAY",
      value: "vnpay_decod",
    },
    {
      name: "Thanh Toán Khi Nhận Hàng",
      value: "cod",
    },
  ];
  return (
    <div className={cx("checkout-container")}>
      <div className={cx("steps")}>
        <div className={cx("step1")}>
          <CartIcon3 /> {"  "}GIỎ HÀNG
        </div>{" "}
        <div className={cx("line1")}></div>{" "}
        <div className={cx("steps2")}>
          {" "}
          <CheckoutIcon2 /> {"  "} ĐẶT HÀNG
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
            <div className={cx("box-address")}>
              <div className={cx("address-header")}>
                <div className="icon">
                  <Address />
                </div>
                <div className={cx("title")}>ĐỊA CHỈ GIAO HÀNG</div>
              </div>
              <div className={cx("body-address")}>
                <img src={area} alt="" height={100} />
                <div className={cx("box-notify")}>
                  <div className={cx("notify")}>
                    Bạn chưa có địa chỉ vui lòng thêm địa chỉ mới
                  </div>
                  <button className={cx("action")}>
                    Thêm địa chỉ mới ngay
                  </button>
                </div>
              </div>
              <div className={cx("payment-body")}>
                <div className="icon">
                  <PaymentMethod />
                </div>
                <div className={cx("title")}>PHƯƠNG THỨC THANH TOÁN</div>
              </div>
              <div className={cx("payment-ss")}>
                {payment_method?.map((p,index) => (
                  <div className={cx("payment")} key={index+1}>
                    <input type="radio" value={p?.value} name="payment" /> <p>{p?.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={cx("box-cart-items")}>
              <div className={cx("title")}>
                GIỎ HÀNG <span>({cart?.length} sản phẩm )</span>
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
                    {cart?.map((c) => (
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
                        <td>{c?.quantity}</td>
                        <td>
                          <tr>{convertVND(c.price * c.quantity)}</tr>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className={cx("order-summary")}>
      <h3>
        ĐƠN <span className={cx("highlight")}>HÀNG</span>
      </h3>

      {/* Mã giảm giá */}
      <div className={cx("discount-section")}>
        <input type="text" placeholder="Mã phiếu giảm giá" />
        <button>ÁP DỤNG</button>
      </div>
      <p className={cx("check-discount")}>
        Kiểm tra <span>Phiếu giảm giá của tôi</span>
      </p>

      {/* Tính tổng giá */}
      <div className={cx("line")}></div>
      <div className={cx("total-amount")}>
        <div className={cx("price")}>Tạm tính:</div>
        <strong>{totalPrice.toLocaleString()}đ</strong>
      </div>
      <div className={cx("total-amount")}>
        <div className={cx("price")}>Phí vận chuyển:</div>
        <strong>0đ</strong>
      </div>
      <div className={cx("total-amount")}>
        <div className={cx("price")}>Mã giảm giá:</div>
        <strong>-0đ</strong>
      </div>
      <div className={cx("line")}></div>
      <div className={cx("total-amount", "final")}>
        <div className={cx("price")}>Tổng thanh toán:</div>
        <strong>{totalPrice.toLocaleString()}đ</strong>
      </div>

      {/* Yêu cầu hóa đơn */}
      <div className={cx("invoice-request")}>
        <input type="checkbox" id="invoice" />
        <label htmlFor="invoice">Yêu cầu hóa đơn</label>
      </div>

      {/* Nút đặt hàng */}
      <button className={cx("checkout-btn")}>ĐẶT HÀNG</button>
    </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
