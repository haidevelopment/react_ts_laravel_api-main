import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import instance from "../../utils/Requests/instance";
import styles from "./charts.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type ProductData = {
    name: string;
    total_sold: number;
    product: {
        name: string;
    };
};

const BestSellingProducts: React.FC = () => {
    const [data, setData] = useState<ProductData[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get('/statistics/best-selling-products');
                setData(res.data.map((product: ProductData) => ({
                    name: product.product.name,
                    total_sold: product.total_sold,
                })));
            } catch (error) {
                console.error("Lỗi lấy dữ liệu sản phẩm bán chạy:", error);
            }
        })();
    }, []);

    return (
        <div className={cx("chart-product-selling")}>
            <h3 className={cx("chart-title")}>🔝 Sản phẩm bán chạy nhất</h3>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                    <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 12 }} />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: 10, border: "none", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }} />
                    <Legend />
                    <defs>
                        <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4CAF50" />
                            <stop offset="100%" stopColor="#81C784" />
                        </linearGradient>
                    </defs>
                    <Bar dataKey="total_sold" fill="url(#barColor)" radius={[10, 10, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BestSellingProducts;
