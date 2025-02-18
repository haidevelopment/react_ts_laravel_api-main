import classNames from "classnames/bind";
import style from './OrderAdmin.module.scss';
import OrderStatusCard from "./OrderStatusCard/OrderStatusCard";
import OrderTable from "./OrderTable/OrderTable";
const cx = classNames.bind(style);
const OrderAdmin = () => {
  return (
    <div className={cx("orders-page")}>
    <h1 className={cx("title")}>Orders</h1>

    <div className={cx("status-container")}>
        <OrderStatusCard
            title="ORDER STATUSES"
            stats={[
                { label: "ALL", value: "2K", icon: "bx-list-ol" },
                { label: "PENDING", value: "70", icon: "bx-loader" },
                { label: "COMPLETED", value: "120", icon: "bx-check-circle" },
                { label: "PROGRESS", value: "60", icon: "bxs-truck" },
            ]}
            color="#15CAB8"
        />

        <OrderStatusCard
            title="FAILED ORDERS"
            stats={[
                { label: "ABANDONED", value: "160", icon: "bxs-error" },
                { label: "RETURNED", value: "222", icon: "bx-recycle" },
                { label: "CANCELED", value: "78", icon: "bx-x-circle" },
            ]}
            color="#44A6E9"
        />
    </div>

    <OrderTable />
</div>
  );
}

export default OrderAdmin;
