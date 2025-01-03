import { useState } from "react";
import classNames from "classnames/bind";
import style from "./AuthBox.module.scss";
import { FaPagelines, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { PropsVoid } from "../../../../../interfaces/childrendInterface";
import { Link } from "react-router-dom";
import { accountService } from "../../../../../services/accountService";
import { authService } from "../../../../../services/Auth/AuthService";
import { ToastError, ToastSucess } from "../../../../../utils/toast";
const cx = classNames.bind(style);
const AuthBox: React.FC<PropsVoid> = ({ authenticated }) => {
  const [showBox, setShowBox] = useState(false);
  const user = accountService.accountValue;
  const handleMouseLeave = () => setShowBox(false);

  const handleMouseEnter = () => setShowBox(true);

  const logout = async () => {
    try {
      const res = await authService.logout();
      if (res) {
        ToastSucess("Đăng xuất thành công !");
        authenticated();
      }
    } catch (error) {
      ToastError("Có lỗi xảy ra không thể đăng xuẩt");
    }
  };
  return (
    <div
      className={cx("navigation-btn-wrapper")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={cx("navigation-btn")}>
        <FaUserCircle />
      </button>
      {showBox && (
        <div
          className={cx("hover-box")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={cx("box-user-infor")}>
            <FaUserCircle size={40} />
            <div className={cx("user-infor")}>
              <div className={cx("name")}>
                {user?.user?.first_name} {user?.user?.last_name}
              </div>
              <div className={cx("pointer")}>
                <span>
                  <FaPagelines />
                </span>{" "}
                Điểm thưởng : 0
              </div>
            </div>
          </div>
          <div className={cx("line")}></div>
          <div className={cx("navigation")}>
            <ul>
              <li>
                <Link to="/order" className={cx("pre")}>
                  📋 Đơn Hàng
                </Link>
              </li>
              <li>
                <Link to="/view-products" className={cx("pre")}>
                  🔍 Sản Phẩm Đã Xem
                </Link>
              </li>
              {user?.user?.max_level_security == 1 && (
                <li>
                  <Link to="/admin" className={cx("pre")}>
                    <FaUserCircle /> Vào trang quản trị viên
                  </Link>
                </li>
              )}
              <li>
                <button className={cx("logout")} onClick={logout}>
                  <FaSignOutAlt /> Đăng Xuất
                </button>
              </li>
            
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthBox;
