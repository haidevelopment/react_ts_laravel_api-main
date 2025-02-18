import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./OrderTable.module.scss";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { getOrder } from "../../../../Features/Slices/orderSlice";
import { convertVND, replaceTimes } from "../../../../utils/func/convert";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const cx = classNames.bind(styles);

const OrderTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const { admin } = useAppSelector((state) => state.order);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(getOrder());
    }, [dispatch]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredOrders = admin.filter((order) =>
        order.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            filteredOrders.map((order) => ({
                "Mã đơn hàng": order.code,
                "Khách hàng": order.address.full_name,
                "Tổng tiền": convertVND(order.total_price),
                "Phương thức thanh toán": order.payment_method,
                "Ngày đặt hàng": replaceTimes(order.created_at),
                "Trạng thái": order.order_status,
            }))
        );

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        saveAs(data, `orders_${new Date().toISOString()}.xlsx`);
    };

    return (
        <div className={cx("table-container")}>
            <div className={cx("table-header")}>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo mã đơn hàng..."
                    className={cx("search-input")}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className={cx("export-btn")} onClick={exportToExcel}>
                    <i className="bx bx-download"></i> Export Excel
                </button>
                <button className={cx("create-order-btn")}>Create Order</button>
            </div>
            <div className={cx("line")}></div>

            <table className={cx("table")}>
                <thead>
                    <tr>
                        <th>ORDER ID</th>
                        <th>CUSTOMER</th>
                        <th>AMOUNT</th>
                        <th>PAYMENT METHOD</th>
                        <th>ORDER DATE</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order, index) => (
                            <tr key={index}>
                                <td>#{order.code}</td>
                                <td>{order.address.full_name}</td>
                                <td>{convertVND(order.total_price)}</td>
                                <td>{order.payment_method}</td>
                                <td>{replaceTimes(order.created_at)}</td>
                                <td className={cx("status", order.order_status)}>
                                    <span>{order.order_status}</span>
                                </td>
                                <td>
                                    <Link to={`/admin/order/detail/${order?.id}`}>Xem Chi Tiết</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className={cx("no-data")}>
                                Không tìm thấy đơn hàng nào!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
