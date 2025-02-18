import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Order.module.scss";
import { FaUserCircle } from "react-icons/fa";
import OrderIcon from "../../../Components/UserPageSvg/OrderIcon";
import UserIcon from "../../../Components/UserPageSvg/UserIcon";
import CouponIcon from "../../../Components/UserPageSvg/CouponIcon";
import ReviewIcon from "../../../Components/UserPageSvg/ReviewIcon";
import ProductViewIcon from "../../../Components/UserPageSvg/ProductViewIcon";
import OrderComponent from "./OrderComponent/OrderComponent";
import Profile from "./Profile/Profile";
import Review from "./Review/Review";

const cx = classNames.bind(styles);

const sidebarTabs = [
  { key: "orders", label: "Đơn hàng của tôi", icon: <OrderIcon />, component: <OrderComponent /> },
  { key: "account", label: "Tài khoản của tôi", icon: <UserIcon />, component: <Profile /> },
  { key: "vouchers", label: "Mã khuyến mại", icon: <CouponIcon />, component: <div>Mã giảm giá</div> },
  { key: "reviews", label: "Đánh giá của tôi", icon: <ReviewIcon />, component: <Review /> },
  { key: "history", label: "Sản phẩm đã xem", icon: <ProductViewIcon />, component: <div>Sản phẩm đã xem</div> },
];

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSidebar, setActiveSidebar] = useState("orders");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setActiveSidebar(params.get("menu") || "orders");
    setActiveTab(params.get("tab") || "all");
  }, [location]);

  const handleSidebarChange = (key: string) => {
    navigate(`?menu=${key}&tab=${activeTab}`);
  };

  const activeComponent = sidebarTabs.find((tab) => tab.key === activeSidebar)?.component || <div>Không tìm thấy</div>;

  return (
    <div className={cx("container")}>
      <div className={cx("order-header")}>
        <div className={cx("icon-user")}>
          <FaUserCircle size={50} />
        </div>
        <div className={cx("infor-user")}>
          <div className={cx("welcome")}>Xin chào ,</div>
          <div className={cx("name")}>Lê Đức Ngọc Hải</div>
        </div>
      </div>
      <div className={cx("order-body")}>
        <div className={cx("sidebar")}>
          {sidebarTabs.map((tab) => (
            <button
              key={tab.key}
              className={cx("sidebar-item", { active: activeSidebar === tab.key })}
              onClick={() => handleSidebarChange(tab.key)}
            >
              <span className={cx("icon")}>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        <div className={cx("content")}>
          {activeComponent}
        </div>
      </div>
    </div>
  );
};

export default Order;
