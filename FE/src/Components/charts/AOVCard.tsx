import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Thêm icon
import instance from "../../utils/Requests/instance";
import { convertVND } from "../../utils/func/convert";
import styles from "./charts.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const AOVCard: React.FC = () => {
    const [aov, setAov] = useState<number>(0);

    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get("/statistics/aov");
                setAov(res.data.AOV);
            } catch (error) {
                console.error("Error fetching AOV:", error);
            }
        })();
    }, []);

    return (
        <div className={cx("card")}>
            <div className={cx("icon")}>
                <FaShoppingCart />
            </div>
            <div className={cx("info")}>
                <h3>Giá trị trung bình mỗi đơn</h3>
                <p>{convertVND(aov)}</p>
            </div>
        </div>
    );
};

export default AOVCard;
