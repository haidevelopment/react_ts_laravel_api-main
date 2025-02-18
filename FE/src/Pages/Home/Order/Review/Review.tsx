import React, { useState } from "react";
import styles from "./Review.module.scss";
import classNames from "classnames/bind";
import nullorder from '../../../../assets/image/logo/nullorder.jpg';
import nullreview from '../../../../assets/image/logo/null-review.jpg';
const cx = classNames.bind(styles);

const Review: React.FC = () => {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className={cx("container")}>
      <h2 className={cx("title")}>Đánh giá của tôi</h2>

      <div className={cx("tabs")}>
        <span
          className={cx("tab", { active: activeTab === "pending" })}
          onClick={() => setActiveTab("pending")}
        >
          Chưa đánh giá
        </span>
        <span
          className={cx("tab", { active: activeTab === "reviewed" })}
          onClick={() => setActiveTab("reviewed")}
        >
          Đã đánh giá
        </span>
      </div>

      <div className={cx("content")}>
        {activeTab === "pending" ? (
          <div className={cx("pen")}>
            <div className={cx("null-order")}>
                <img src={nullorder} alt="" width={90} />
                <p>Đơn hàng trống</p>
            </div>
          </div>
        ) : (
          <div className={cx("reviewed-list")}>
             <div className={cx("null-review")}>
                <img src={nullreview} alt="" width={250} />
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
