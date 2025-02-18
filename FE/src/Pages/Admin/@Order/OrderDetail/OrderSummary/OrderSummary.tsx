import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./OrderSummary.module.scss";
import { stateOrder } from "../../../../../interfaces/admin/Api";
import { convertVND } from "../../../../../utils/func/convert";
import { status } from "../../../../../data/data";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { UpdateOrder } from "../../../../../Features/Slices/orderSlice";

const cx = classNames.bind(styles);

interface Props {
  data: stateOrder | null;
}

const OrderSummary: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();

  const currentStatusIndex = status.findIndex(
    (s) => s.value === data?.order_status
  );
  const [selectedStatus, setSelectedStatus] = useState(
    data?.order_status || "new"
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdate = () => {
    const input = {
      id: Number(data?.id),
      order_status: selectedStatus,
    };
    dispatch(UpdateOrder(input));
  };

  return (
    <div className={cx("summary-box")}>
      <h1>Order Summary</h1>
      <ul>
        <li>
          SUB TOTAL: <span>{convertVND(Number(data?.total_price))}</span>
        </li>
        <li>
          DISCOUNT:{" "}
          <span>{convertVND(Number(data?.coupon?.max_discount_value))}</span>
        </li>
        <li>
          SHIPPING CHARGE: <span>{convertVND(Number(data?.shipping_fee))}</span>
        </li>
        <li>
          ESTIMATED TAX: <span>0 đ</span>
        </li>
        <li className={cx("total")}>
          TOTAL (VNĐ): <span>{convertVND(Number(data?.total_price))}</span>
        </li>
      </ul>

      <select value={selectedStatus} onChange={handleChange}>
        {status?.map((s, index) => {
          const isDisabled =
            index < currentStatusIndex ||
            (s.value === "canceled" &&
              currentStatusIndex >=
                status.findIndex((st) => st.value === "processing"));

          return (
            <option key={s.value} value={s.value} disabled={isDisabled}>
              {s.name}
            </option>
          );
        })}
      </select>

      <button
        onClick={handleUpdate}
        disabled={selectedStatus === data?.order_status}
      >
        Update
      </button>
    </div>
  );
};

export default OrderSummary;
