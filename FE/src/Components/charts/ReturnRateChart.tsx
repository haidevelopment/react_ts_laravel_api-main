import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import instance from "../../utils/Requests/instance";
import styles from "./charts.module.scss";
import classNames from "classnames/bind";
import { FaBox } from "react-icons/fa";

const cx = classNames.bind(styles);

const COLORS = ["#FF4D4F", "#52C41A"];

const ReturnRateChart: React.FC = () => {
    const [returnRate, setReturnRate] = useState<number>(0);

    useEffect(() => {
        instance.get("/statistics/return-rate").then((res) => {
            setReturnRate(res.data.return_rate);
        });
    }, []);

    const data = [
        { name: "Hoàn trả", value: returnRate },
        { name: "Thành công", value: 100 - returnRate },
    ];

    return (
        <div className={cx("chart-rating-chart")}>
            <h3><FaBox /> Tỷ lệ hoàn trả hàng</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie 
                        data={data} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={60} 
                        outerRadius={80} 
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ReturnRateChart;
