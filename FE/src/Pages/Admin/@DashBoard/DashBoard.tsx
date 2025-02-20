import React from "react";
import styles from "./Dashboard.module.scss";
import classNames from "classnames/bind";
import RevenueChart from "../../../Components/charts/RevenueChart";
import OrderChart from "../../../Components/charts/OrderChart";
import AOVCard from "../../../Components/charts/AOVCard";
import ConversionChart from "../../../Components/charts/ConversionChart";
import BestSellingProducts from "../../../Components/charts/BestSellingProducts";
import StockStatus from "../../../Components/charts/StockStatus";
import ReturnRateChart from "../../../Components/charts/ReturnRateChart";
import OrderStatusBoxes from "../../../Components/charts/OrderStatusBoxes";
const cx = classNames.bind(styles);
const Dashboard: React.FC = () => {
  return (
    <main className={cx("main")}>
      <div className={cx("headTitle")}>
        <div className={cx("left")}>
          <h1>Dashboard</h1>
          <ul className={cx("breadcrumb")}>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className={cx("active")} href="#">
                Home
              </a>
            </li>
          </ul>
        </div>
        <a href="#" className={cx("btnDownload")}>
          <i className="bx bxs-cloud-download"></i>
          <span className={cx("text")}>Download PDF</span>
        </a>
      </div>
      <div className={cx("status-order-revenue")}>
        <OrderStatusBoxes />
      </div>
      <div className={cx("card-revenue")}>
        <AOVCard />
      </div>
      <div className={cx("revenur-01")}>
        <RevenueChart />
        <OrderChart />
      </div>

      <div className={cx("revenue-2")}>
        <ConversionChart />
        <BestSellingProducts />
      </div>
      <div className={cx("stock-status")}>
        <StockStatus />
      </div>
      <div className={cx("status-chart")}>
        <ReturnRateChart />
      </div>
    </main>
  );
};

export default Dashboard;
