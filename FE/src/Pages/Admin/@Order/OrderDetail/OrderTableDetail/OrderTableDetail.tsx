import React from "react";
import classNames from "classnames/bind";
import styles from "./OrderTableDetail.module.scss";
import { stateOrder } from "../../../../../interfaces/admin/Api";
import { convertVND, truncateText } from "../../../../../utils/func/convert";

const cx = classNames.bind(styles);

interface Props {
  data: stateOrder | null;
}

const OrderTableDetail: React.FC<Props> = ({ data }) => {
  console.log(data);

  return (
    <div className={cx("table-container")}>
      <div className={cx("table-header")}>
        <div className={cx("code")}>Order #{data?.code}</div>
        <button className={cx("invoid")}>Hoá đơn</button>
      </div>
      <div className={cx("line")}></div>

      <table className={cx("table")}>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>PAYMENT METHOD</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((order, index) => (
            <tr key={index}>
              <td className={cx("product-cell")}>
                <img
                  src={`http://127.0.0.1:8000/storage/variant/${order?.variant?.image}`}
                  alt={order.product.name}
                  className={cx("product-image")}
                />
                <div className={cx("product-info")}>
                  <strong>{truncateText(order.product.name)}</strong>
                  {order.variant.variant_attribute_value?.map((v, i) => (
                    <p key={i} className={cx("variant-info")}>
                      {v?.attribute?.name}: {v?.attribute_value?.value}
                    </p>
                  ))}
                </div>
              </td>
              <td>{convertVND(order.price)}</td>
              <td>x{order.quantity}</td>
              <td>{data.payment_method}</td>
              <td>{convertVND(order.total_price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTableDetail;
