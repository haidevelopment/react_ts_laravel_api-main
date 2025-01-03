import { useState } from "react";
import classNames from "classnames/bind";
import style from "./BoxForm.module.scss";
import { FaUserAlt, FaUserPlus } from "react-icons/fa";
import { PropsVoid } from "../../../../../interfaces/childrendInterface";
const cx = classNames.bind(style);
const BoxForm: React.FC<PropsVoid> = ({ onOpen }) => {
  const [showBox, setShowBox] = useState(false);

  const handleMouseLeave = () => setShowBox(false);

  const handleMouseEnter = () => setShowBox(true);
  return (
    <div
      className={cx("navigation-btn-wrapper")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={cx("navigation-btn")}>
        <FaUserAlt />
      </button>
      {showBox && (
        <div
          className={cx("hover-box")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p>CHÀO MỪNG QUÝ KHÁCH ĐẾN VỚI TOKYOLIFE</p>
          <button className={cx("login-btn")} onClick={() => onOpen()}>
            <FaUserAlt /> ĐĂNG NHẬP
          </button>
          <button className={cx("register-btn")} onClick={() => onOpen()}>
            <FaUserPlus /> ĐĂNG KÝ
          </button>
        </div>
      )}
    </div>
  );
};

export default BoxForm;
