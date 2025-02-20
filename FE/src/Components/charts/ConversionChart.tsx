import { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from "recharts";
import instance from "../../utils/Requests/instance";
import styles from "./charts.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ConversionChart = () => {
    const [data, setData] = useState<{ name: string; value: number }[]>([]);
    
    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get("/statistics/conversion-rate");
                setData([{ name: "Tỷ lệ chuyển đổi", value: res.data.conversion_rate * 100 }]); 
            } catch (error) {
                console.error("Error :", error);
            }
        })();
    }, []);

    return (
        <div className={cx("chart-container")}>
            <h3 className={cx("chart-title")}>Tỷ lệ chuyển đổi</h3>
            <ResponsiveContainer width="100%" height={300}>
                <RadialBarChart innerRadius="20%" outerRadius="90%" data={data} startAngle={90} endAngle={-270}>
                    <RadialBar 
                        minAngle={15} 
                        label={{ position: "insideStart", fill: "#fff", fontSize: 14, fontWeight: "bold" }} 
                        dataKey="value" 
                        background 
                        fill="url(#colorGradient)"
                    />
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#4caf50" />
                            <stop offset="100%" stopColor="#81c784" />
                        </linearGradient>
                    </defs>
                    <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                    <Legend />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ConversionChart;
