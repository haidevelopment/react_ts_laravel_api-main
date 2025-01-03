import { memo, useState } from 'react';
import './AdminLayout.css';
import { Link } from 'react-router-dom';
import { AdminLayoutProps } from '../../interfaces/admin/interface';
import SideBar from '../Components/Admin/SideBar/SideBar';



const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [isSidebarHidden, setSidebarHidden] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

  

    const toggleSidebar = () => {
        setSidebarHidden(!isSidebarHidden);
    };

  

    return (
        <div className={`body ${isDarkMode ? 'dark' : ''}`}>
                <section id="sidebar">
                    <SideBar />
                </section>

            <section id="content">
                    <nav>
                        <i className="bx bx-menu" onClick={toggleSidebar}></i>
                        <Link to="/qtv" className="nav-link">
                            ADMIN
                        </Link>
                        <form action="#">
                            <div className="form-input">
                                <input type="search" placeholder="Search..." />
                                <button type="submit" className="search-btn">
                                    <i className="bx bx-search"></i>
                                </button>
                            </div>
                        </form>
                        <input
                            type="checkbox"
                            id="switch-mode"
                            hidden
                            onChange={() => setIsDarkMode(!isDarkMode)}
                        />
                        <label htmlFor="switch-mode" className="switch-mode"></label>
                        <a href="#" className="notification">
                            <i className="bx bxs-bell"></i>
                            <span className="num">8</span>
                        </a>
                        <div className="profile" >
                            <img
                                src="https://a0.anyrgb.com/pngimg/124/832/google-account-user-profile-password-activity-account-login-avatar-customer-service-user-email.png"
                                alt="User"
                            />
                          
                        </div>
                    </nav>
                {children}
            </section>
        </div>
    );
};

export default memo(AdminLayout);
