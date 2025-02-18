import React, { useEffect, useState } from "react";
import { orderTabs } from "../../../../data/tabOrderData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import nullorder from "../../../../assets/image/logo/nullorder.jpg";
import { getOrder } from "../../../../Features/Slices/orderSlice";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import style from "./OrderComponent.module.scss";
import classNames from "classnames/bind";
import { convertVND, replaceTimes } from "../../../../utils/func/convert";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const OrderComponent = () => {
  const cx = classNames.bind(style);
  const [activeSidebar, setActiveSidebar] = useState("orders");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { client } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setActiveSidebar(params.get("menu") || "orders");
    setActiveTab(params.get("tab") || "all");
  }, [location]);

  const toggleOrder = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleTabChange = (key: string) => {
    navigate(`?menu=${activeSidebar}&tab=${key}`);
  };

  const orderCounts = client.reduce((acc, order) => {
    acc["all"] = (acc["all"] || 0) + 1;
    acc[order.order_status] = (acc[order.order_status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filteredOrders =
    activeTab === "all"
      ? client
      : client.filter((order) => order.order_status === activeTab);
  const handleCanceledOrder = (id: number) => {
    console.log(id);
    
  };

  return (
    <div className={cx("content")}>
      <h2 className={cx("title")}>TẤT CẢ ĐƠN HÀNG</h2>

      <div className={cx("tabs")}>
        {orderTabs.map((tab) => (
          <button
            key={tab.key}
            className={cx("tab-item", { active: activeTab === tab.key })}
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
            {orderCounts[tab.key] > 0 && (
              <span className={cx("badge")}>{orderCounts[tab.key]}</span>
            )}
          </button>
        ))}
      </div>

      <div className={cx("order-list")}>
        {filteredOrders.length > 0 ? (
          <table className={cx("table")}>
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Sản phẩm</th>
                <th>Ngày mua</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr>
                    <td>{order.code}</td>
                    <td>{order.items.length} sản phẩm</td>
                    <td>{replaceTimes(order.created_at)}</td>
                    <td className={cx("price")}>
                      {convertVND(order?.total_price)}
                    </td>
                    <td>
                      <span className={cx("status", order.order_status)}>
                        {order.order_status}
                      </span>
                    </td>
                    <td>
                      {order?.order_status == "new" ? (
                        <button
                          className={cx("canceled-btn")}
                          onClick={() => handleCanceledOrder(order?.id)}
                        >
                          Huỷ Đơn Hàng
                        </button>
                      ) : (
                        <Link
                          to={`/order/history/${order?.code}`}
                          className={cx("detail-btn")}
                        >
                          Xem chi tiết
                        </Link>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={7} className={cx("dropdow")}>
                      <button
                        className={cx("dropdown-btn")}
                        onClick={() => toggleOrder(order.id)}
                      >
                        {expandedOrder === order.id ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr className={cx("order-detail")}>
                      <td colSpan={7}>
                        {order.items.map((product) => (
                          <div
                            key={product.id}
                            className={cx("product-detail")}
                          >
                            <img
                              src={`http://127.0.0.1:8000/storage/variant/${product.product.image}`}
                              alt={product.product.name}
                            />
                            <div className={cx("info")}>
                              <p>{product.product.name}</p>
                              {product.variant.variant_attribute_value.map(
                                (v, index) => (
                                  <p key={index}>
                                    {v?.attribute?.name} :{" "}
                                    {v?.attribute_value?.value}
                                  </p>
                                )
                              )}
                            </div>
                            <p className={cx("quantity")}>
                              x{product.quantity}
                            </p>
                            <p className={cx("price")}>
                              {convertVND(product.price)}
                            </p>
                            <p className={cx("price")}>
                              {convertVND(product.total_price)}
                            </p>
                          </div>
                        ))}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={cx("null-order")}>
            <img src={nullorder} alt="" width={90} />
            <p>Đơn hàng trống</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderComponent;
