import { useEffect, useState } from "react";
import instance from "../../utils/Requests/instance";
import styles from "./charts.module.scss";
import classNames from "classnames/bind";
import { FaExclamationTriangle, FaClock } from "react-icons/fa";
const cx = classNames.bind(styles);

interface Product {
    id: number;
    name: string;
    quantity?: number;
}

const StockStatus = () => {
    const [lowStock, setLowStock] = useState<Product[]>([]);
    const [slowMoving, setSlowMoving] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get("/statistics/stock-status");
                setLowStock(res.data.low_stock);
                setSlowMoving(res.data.slow_moving);
                console.log(res);
                
            } catch (error) {
                console.error("Lỗi lấy dữ liệu kho:", error);
            }
        })();
    }, []);

    return (
        <div className={cx("stockStatus")}>
            <div className={cx("card")}>
                <h3><FaExclamationTriangle size={20} color="#E63946" /> Sản phẩm sắp hết hàng</h3>
                {lowStock.length > 0 ? (
                    <ul>
                        {lowStock.map((p) => (
                            <li key={p.id}>
                                <span className={cx("productName")}>{p.name}</span>
                                <span className={cx("quantity")}>{p.quantity} cái</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={cx("empty")}>Không có sản phẩm nào sắp hết hàng.</p>
                )}
            </div>

            <div className={cx("card")}>
                <h3><FaClock size={20} color="#457B9D" /> Sản phẩm tồn kho lâu</h3>
                {slowMoving.length > 0 ? (
                    <ul>
                        {slowMoving.map((p) => (
                            <li key={p.id}>
                                <span className={cx("productName")}>- {p.name}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={cx("empty")}>Không có sản phẩm tồn kho lâu.</p>
                )}
            </div>
        </div>
    );
};

export default StockStatus;
