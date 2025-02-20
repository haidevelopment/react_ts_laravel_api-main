import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import instance from "../../utils/Requests/instance";
import style from './charts.module.scss';
import classNames from "classnames/bind";
const cx = classNames.bind(style);
const COLORS = ["#4CAF50", "#FF9800", "#F44336"]; 

interface OrderData {
    name: string;
    value: number;
}

const OrderChart: React.FC = () => {
    const [data, setData] = useState<OrderData[]>([]);
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get("/statistics/orders");
                const orders = [
                    { name: "Đã đặt", value: res.data.total_orders },
                    { name: "Đã giao", value: res.data.delivered_orders },
                    { name: "Đã hủy", value: res.data.canceled_orders },
                ];
                setData(orders);
                setTotalOrders(res.data.total_orders + res.data.delivered_orders + res.data.canceled_orders);
            } catch (error) {
                console.error("Error fetching order data:", error);
            }
        })();
    }, []);

    const formatLabel = (entry: OrderData) => {
        const percentage = ((entry.value / totalOrders) * 100).toFixed(1);
        return `${entry.name} (${percentage}%)`;
    };

    return (
        <div className={cx("order-chart")} >
            <h3 >Thống kê đơn hàng</h3>
            <ResponsiveContainer width="100%" height="75%">
                <PieChart>
                    <Pie 
                        data={data} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={70} 
                        outerRadius={100} 
                        fill="#8884d8" 
                        dataKey="value" 
                        label={({ name, value }) => formatLabel({ name, value })}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} đơn hàng`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OrderChart;
