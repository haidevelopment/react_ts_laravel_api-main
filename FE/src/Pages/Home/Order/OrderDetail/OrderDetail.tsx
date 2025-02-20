import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./OrderDetail.module.scss";
import Shiped from "../../../../Components/Ship/Shiped";
import { getOrder } from "../../../../Features/Slices/orderSlice";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useLocation, useNavigate } from "react-router-dom";
import { stateOrder } from "../../../../interfaces/admin/Api";
import { convertVND, truncateText } from "../../../../utils/func/convert";

const cx = classNames.bind(styles);

const OrderDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState<string | null>(null);
  const [data, setData] = useState<stateOrder | null>(null);
  const dispatch = useAppDispatch();
  const { client } = useAppSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  useEffect(() => {
    const param = new URLSearchParams(location.search);

    setParams(param.get("params") || null);
  }, [location]);
  useEffect(() => {
    const res = client.find((c) => c?.code == params);
    if (res) {
      setData(res);
    }
  }, [params, client]);
  return (
    <div className={cx("order-detail")}>
      <button
        className={cx("back-button")}
        onClick={() => navigate("?menu=orders&tab=all")}
      >
        {"< Quay lại"}
      </button>

      <h2 className={cx("order-title")}>
        CHI TIẾT ĐƠN HÀNG #{data?.code}
        <span className={cx("status", data?.order_status)}>
          {data?.order_status}
        </span>
      </h2>

      <div className={cx("order-info")}>
        <div className={cx("info-box")}>
          <h3>Địa chỉ người nhận</h3>
          <div className={cx("infor")}>
            <p className={cx("bold-text")}>{data?.address?.full_name}</p>
            <p>
              Địa chỉ: {data?.address?.note} , {data?.address?.address} ,{" "}
              {data?.address?.ward} , {data?.address?.district} ,{" "}
              {data?.address?.province} ,
            </p>
            <p>Điện thoại: {data?.address?.phone} </p>
          </div>
        </div>
        <div className={cx("info-box")}>
          <h3>Hình thức giao hàng</h3>
          <div className={cx("infor")}>
            <p className={cx("bold-text")}>{data?.address?.full_name} </p>

            <p className={cx("text")}>
              <Shiped /> Giao hàng tại nhà
            </p>
          </div>
        </div>
        <div className={cx("info-box")}>
          <h3>Hình thức thanh toán</h3>
          <div className={cx("infor")}>
            <p>{data?.payment_method}</p>
          </div>
        </div>
      </div>

      <div className={cx("cart")}>
        <h3>
          GIỎ HÀNG <span>({data?.items?.length} sản phẩm)</span>
        </h3>
        <table className={cx("cart-table")}>
          <thead>
            <tr>
              <th>Tên Hàng</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Tạm Tính</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((item) => (
              <tr key={item.id}>
                <td className={cx("product-info")}>
                  <img
                    src={`http://127.0.0.1:8000/storage/variant/${item?.variant?.image}`}
                    alt={data?.code}
                  />
                  <div>
                    <p>{truncateText(item?.product.name)}</p>
                    {item?.variant?.variant_attribute_value?.map((i) => (
                      <p>
                        {i?.attribute?.name} : {i?.attribute_value?.value}
                      </p>
                    ))}
                  </div>
                </td>
                <td>
                  <span className={cx("sale-price")}>
                    {convertVND(item.price)}
                  </span>
                  <span className={cx("original-price")}>
                    {convertVND(item.price)}
                  </span>
                </td>
                <td>x{item.quantity}</td>
                <td>{convertVND(item?.total_price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={cx("summary")}>
        <div className={cx("summary-row")}>
          <span>Tạm tính</span>
          <span>{convertVND(Number(data?.total_price))} đ</span>
        </div>
        <div className={cx("summary-row")}>
          <span>Phí vận chuyển</span>
          <span>{convertVND(Number(data?.shipping_fee))} đ</span>
        </div>
        <div className={cx("summary-row")}>
          <span>Mã giảm giá</span>
          <span>-{convertVND(Number(data?.coupon?.max_discount_value))} đ</span>
        </div>
        <div className={cx("summary-total")}>
          <span>Tổng cộng</span>
          <span>{convertVND(Number(data?.total_price))} đ</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
