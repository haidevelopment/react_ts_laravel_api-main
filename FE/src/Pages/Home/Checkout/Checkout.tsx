import React, { useEffect, useMemo, useState } from "react";
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
import { getCoupon } from "../../../Features/Slices/couponSlice";
import { ToastError, ToastSucess } from "../../../utils/toast";
import ModalAddress from "./ModalAddress/ModalAddress";
import { getCurrenUser } from "../../../Features/Slices/authSlice";
import { AddressInterface } from "../../../interfaces/authInterface";
import ModalSelectAddress from "./ModalSelectAddress/ModalSelectAddress";
import { VNPayAPI } from "../../../services/Api/paymentAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingOrder from "../../../Components/LoadingOrder/LoadingOrder";
import { createOrder, getOrder } from "../../../Features/Slices/orderSlice";

const cx = classNames.bind(styles);

const Checkout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { coupon } = useAppSelector((state) => state.coupon);
  const { user } = useAppSelector((state) => state.user);
  const { client } = useAppSelector((state) => state.order);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [address, setAddress] = useState<AddressInterface | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalAddress, setIsOpenModalAddress] = useState(false);
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    dispatch(getCart());
    dispatch(getCoupon());
    dispatch(getCurrenUser());
    dispatch(getOrder());
  }, [dispatch]);
  useEffect(() => {
    if (user?.user?.user && user.user.user.length > 0) {
      setAddress(user.user.user[0]);
    }
  }, [user]);

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
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const handleApplyCoupon = () => {
    setError("");
    setDiscount(0);

    if (!couponCode) {
      setError("Vui lòng nhập mã giảm giá.");
      return;
    }

    const hasUsedCoupon = client.some(
      (order) =>
        order.coupon_id === coupon.find((c) => c.code === couponCode)?.id
    );

    if (hasUsedCoupon) {
      setError("Voucher đã được sử dụng.");
      return;
    }

    const selectedCoupon = coupon.find((c) => c.code === couponCode);
    if (!selectedCoupon) {
      setError("Mã giảm giá không tồn tại.");
      return;
    }

    const now = new Date().getTime();
    const startDate = new Date(selectedCoupon.start_date).getTime();
    const endDate = new Date(selectedCoupon.end_date).getTime();
    if (now < startDate || now > endDate || selectedCoupon.is_active === 0) {
      setError("Mã giảm giá đã hết hạn hoặc không hợp lệ.");
      return;
    }

    if (totalPrice < selectedCoupon.min_order_value) {
      setError(
        `Đơn hàng tối thiểu phải đạt ${convertVND(
          selectedCoupon.min_order_value
        )} để áp dụng mã giảm giá.`
      );
      return;
    }

    let discountValue = 0;
    if (selectedCoupon.discount_type === "percent") {
      discountValue = (totalPrice * parseFloat(selectedCoupon.value)) / 100;
      ToastSucess("Áp dụng mã giảm giá thành công !");
    } else {
      discountValue = parseFloat(selectedCoupon.value);
      ToastSucess("Áp dụng mã giảm giá thành công !");
    }

    discountValue = Math.min(discountValue, selectedCoupon.max_discount_value);
    setDiscount(discountValue);
  };

  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handleModalSelectAddress = () => {
    setIsOpenModalAddress(!isOpenModalAddress);
  };
  const handlePlaceOrder = async () => {
    const orderData = {
      total_price: totalPrice - discount,
      payment_method: paymentMethod,
      address_id: address?.id ?? null,
      coupon_id:
        discount > 0 ? coupon.find((c) => c.code == couponCode)?.id : null,
    };

    if (user?.user?.user?.length == 0) {
      ToastError("Vui lòng thêm địa chỉ nhận hàng !");
    } else {
      if (paymentMethod === "vnpay_decod") {
        const bank = {
          bank_code: "NCB",
          amount: orderData.total_price,
        };

        const url = await VNPayAPI(bank);
        localStorage.setItem("coupon", String(orderData.coupon_id));
        localStorage.setItem("address", String(address?.id));
        if (url) {
          window.location.href = url.url;
        }
      } else {
        setLoading(true);
        dispatch(createOrder(orderData));
        setTimeout(() => {
          setLoading(false);
          navigate("/thankyou");
        }, 2000);
      }
    }
  };
  useEffect(() => {
    if (paramsObject && String(paramsObject["vnp_ResponseCode"]) == "00") {
      setLoading(true);
      const orderData = {
        total_price: Number(paramsObject["vnp_Amount"]) / 100,
        payment_method: "vnpay_decod",
        address_id: localStorage.getItem("address")
          ? Number(localStorage.getItem("address"))
          : null,
        coupon_id: localStorage.getItem("coupon")
          ? Number(localStorage.getItem("coupon"))
          : null,
      };

      dispatch(createOrder(orderData));

      const timeout = setTimeout(() => {
        localStorage.removeItem("coupon");
        localStorage.removeItem("address");
        setLoading(false);
        navigate("/thankyou");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, []);

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
                  {user?.user?.user?.length == 0 ? (
                    <div className={cx("address-null")}>
                      <div className={cx("notify")}>
                        Bạn chưa có địa chỉ vui lòng thêm địa chỉ mới
                      </div>
                      <button className={cx("action")} onClick={handleModal}>
                        Thêm địa chỉ mới ngay
                      </button>
                    </div>
                  ) : (
                    <div className={cx("address-infor")}>
                      <div className={cx("infor")}>
                        <div className={cx("name-phone")}>
                          <h4>Họ và Tên : {address?.full_name} </h4>
                          <h4>SĐT : {address?.phone} </h4>
                        </div>
                        <div className={cx("address")}>
                          <div className={cx("title")}>Địa chỉ giao hàng :</div>
                          <div className={cx("address-detail")}>
                            {" "}
                            {address?.note} , {address?.ward},{" "}
                            {address?.district} ,{address?.province}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={cx("create-address")}>
                <div className={cx("action-container")}>
                  <button className={cx("action")} onClick={handleModal}>
                    Thêm địa chỉ giao hàng
                  </button>
                  <button
                    className={cx("action")}
                    onClick={handleModalSelectAddress}
                  >
                    Chọn địa chỉ giao hàng
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
                {payment_method?.map((p, index) => (
                  <div className={cx("payment")} key={index + 1}>
                    <input
                      type="radio"
                      value={p.value}
                      name="payment"
                      checked={paymentMethod === p.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <p>{p.name}</p>
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

            <div className={cx("discount-section")}>
              <input
                type="text"
                placeholder="Mã phiếu giảm giá"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={handleApplyCoupon}>ÁP DỤNG</button>
            </div>
            {error && <p className={cx("error-message")}>{error}</p>}
            <p className={cx("check-discount")}>
              Kiểm tra <span>Phiếu giảm giá của tôi</span>
            </p>

            <div className={cx("line")}></div>
            <div className={cx("total-amount")}>
              Tạm tính: <strong>{convertVND(totalPrice)}</strong>
            </div>

            <div className={cx("total-amount")}>
              <div className={cx("price")}>Phí vận chuyển:</div>
              <strong>0đ</strong>
            </div>
            <div className={cx("total-amount")}>
              Giảm giá: <strong>-{convertVND(discount)}</strong>
            </div>
            <div className={cx("total-amount", "final")}>
              Tổng thanh toán:{" "}
              <strong>{convertVND(totalPrice - discount)}</strong>
            </div>

            <div className={cx("invoice-request")}>
              <input type="checkbox" id="invoice" />
              <label htmlFor="invoice">Yêu cầu hóa đơn</label>
            </div>

            <button className={cx("checkout-btn")} onClick={handlePlaceOrder}>
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      )}
      {isOpenModal && (
        <div className={cx("modal_address")}>
          <ModalAddress handleClose={handleModal} />
        </div>
      )}
      {isOpenModalAddress && (
        <div className={cx("modal_address")}>
          <ModalSelectAddress
            handleClose={handleModalSelectAddress}
            setAddress={setAddress}
            addressDefault={address}
            data={user?.user?.user}
          />
        </div>
      )}
      {loading && (
        <div className={cx("loading_component")}>
          <LoadingOrder />
        </div>
      )}
    </div>
  );
};

export default Checkout;
