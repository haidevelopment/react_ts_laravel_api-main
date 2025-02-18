import { Link, useLocation } from 'react-router-dom';
import './SideBar.css';
import { MenuItem } from '../../../../interfaces/admin/interface';

const SideBar: React.FC= () => {
    const location = useLocation();  

    const menuItems: MenuItem[] = [
        { icon: 'bxs-dashboard', text: 'Bảng điều khiển', url: '/admin' },
        { icon: 'bx-category', text: 'Danh mục', url: '/admin/category' },
        { icon: 'bxl-product-hunt', text: 'Sản phẩm', url: '/admin/product' },
        { icon: 'bx-hive', text: 'Thuộc tính', url: '/admin/attribute' },
        { icon: 'bx-bold', text: 'Thương hiệu', url: '/admin/brand' },
        { icon: 'bxs-coupon', text: 'Mã giảm giá', url: '/admin/coupon' },
        { icon: 'bx-shopping-bag', text: 'Đơn hàng', url: '/admin/order' },
        
    ];

    return (
        <>
            <Link to="/admin" className="brand">
                <i className="bx bxs-smile"></i>
                <span className="text">Admin</span>
            </Link>
            <ul className="side-menu top">
                {menuItems.map((item) => (
                    <li
                        key={item.text}
                        className={location.pathname === item.url ? 'active' : ''} 
                    >
                        <Link to={item.url} >
                            <i className={`bx ${item.icon}`}></i>
                            <span className="text">{item.text}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className="side-menu">
                <li>
                    <a href="#" className="logout">
                        <i className="bx bxs-log-out-circle"></i>
                        <span className="text">Logout</span>
                    </a>
                </li>
            </ul>
        </>
    );
};

export default SideBar;
