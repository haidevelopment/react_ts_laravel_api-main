import React, { useEffect, useState } from "react";
import instance from "../../utils/Requests/instance";
import styles from "./charts.module.scss";
import classNames from "classnames/bind";
import { FaShoppingCart, FaBoxOpen, FaShippingFast, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const cx = classNames.bind(styles);

type OrderStatus = "new" | "processing" | "shipped" | "delivered" | "canceled";

const STATUS_CONFIG: Record<OrderStatus, { label: string; icon: JSX.Element; className: string }> = {
    new: { label: "Mới", icon: <FaShoppingCart />, className: "new" },
    processing: { label: "Đang xử lý", icon: <FaBoxOpen />, className: "processing" },
    shipped: { label: "Đang giao", icon: <FaShippingFast />, className: "shipped" },
    delivered: { label: "Đã giao", icon: <FaCheckCircle />, className: "delivered" },
    canceled: { label: "Đã hủy", icon: <FaTimesCircle />, className: "canceled" },
};

const OrderStatusBoxes: React.FC = () => {
    const [orderCounts, setOrderCounts] = useState<Record<OrderStatus, number>>({
        new: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        canceled: 0,
    });

    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get("/statistics/order-status");
                const data = res.data;

                const updatedCounts: Record<OrderStatus, number> = { ...orderCounts };

                data.status_counts.forEach((item: { order_status: string; count: number }) => {
                    const key = item.order_status as OrderStatus;
                    updatedCounts[key] = item.count;
                });

                setOrderCounts(updatedCounts);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
            }
        })();
    }, []);

    return (
        <div className={cx("status-container")}>
            {Object.entries(STATUS_CONFIG).map(([key, { label, icon, className }]) => (
                <div key={key} className={cx("status-box", className)}>
                    <div className={cx("icon")}>{icon}</div>
                    <h4>{label}</h4>
                    <p>{orderCounts[key as OrderStatus]} đơn</p>
                </div>
            ))}
        </div>
    );
};

export default OrderStatusBoxes;
