import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import instance from "../../utils/Requests/instance";
import style from './charts.module.scss';
import classNames from "classnames/bind";
import { convertVND } from "../../utils/func/convert";
const cx = classNames.bind(style);
const RevenueChart = () => {
    const [data, setData] = useState<{ name: string; revenue: number }[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get('/statistics/revenue?timeframe=monthly');
                setData([{ name: "Tháng này", revenue: parseFloat(res.data.revenue) }]);
            } catch (error) {
                console.error("Lỗi lấy dữ liệu doanh thu:", error);
            }
        })();
    }, []);
    

    return (
        <div className={cx("revenueChart")} >
            <h3 >Doanh thu hàng tháng</h3>
            <ResponsiveContainer width="90%" height="90%">
                <LineChart data={data}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#A78BFA" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => convertVND(value)} style={{fontSize:"10px"}} />
                    <Tooltip formatter={(value) => convertVND(Number(value)) } />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="url(#colorRevenue)" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;
