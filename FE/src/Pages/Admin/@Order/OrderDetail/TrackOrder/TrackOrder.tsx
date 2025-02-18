import React from "react";
import classNames from "classnames/bind";
import styles from "./TrackOrder.module.scss";
import {
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import { stateOrder } from "../../../../../interfaces/admin/Api";

const cx = classNames.bind(styles);

interface Props {
  data: stateOrder | null;
}

const statuses = [
  { id: "new", label: "New", icon: <FaBoxOpen />, className: "new" },
  { id: "processing", label: "Processing", icon: <FaHourglassHalf />, className: "processing" },
  { id: "shipped", label: "Shipped", icon: <FaShippingFast />, className: "shipped" },
  { id: "delivered", label: "Delivered", icon: <FaCheckCircle />, className: "delivered" },
  { id: "canceled", label: "Canceled", icon: <FaTimesCircle />, className: "canceled" },
];

const TrackOrder: React.FC<Props> = ({ data }) => {
  if (!data) return <p>Loading...</p>;

  const currentIndex = statuses.findIndex((status) => status.id === data.order_status);

  return (
    <div className={cx("track-order")}>
      <h3>Track Order</h3>
      <p className={cx("tracking-id")}>Tracking ID: {data.code}</p>

      <div className={cx("timeline")}>
        {statuses.map((status, index) => {
          const isActive = data.order_status === "canceled" ? index === currentIndex : index <= currentIndex;

          return (
            <div key={status.id} className={cx("step", status.className, { active: isActive })}>
              <div className={cx("icon")}>{status.icon}</div>
              <div className={cx("content")}>
                <h4>{status.label}</h4>
                <p>{isActive ? "✔ Status updated" : "⏳ Pending"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackOrder;
