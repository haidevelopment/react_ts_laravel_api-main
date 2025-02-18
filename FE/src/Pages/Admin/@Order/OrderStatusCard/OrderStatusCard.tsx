import React from "react";
import classNames from "classnames/bind";
import styles from "./OrderStatusCard.module.scss";

const cx = classNames.bind(styles);

interface Stat {
    label: string;
    value: string;
    icon: string;
}

interface Props {
    title: string;
    stats: Stat[];
    color: string;
}

const OrderStatusCard: React.FC<Props> = ({ title, stats, color }) => {
    return (
        <div className={cx("card")} style={{backgroundColor:color}}>
            <h3>{title}</h3>
            <div className={cx("stats")}>
                {stats.map((stat, index) => (
                    <div key={index} className={cx("stat-item")}>
                        <span className={cx("icon")}>
                        <i className={`bx ${stat.icon}`} ></i>
                        </span>
                        <div>
                            <strong className={cx("value")}>{stat.value}</strong>
                            <p>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderStatusCard;
