import React from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import classNames from "classnames/bind";
import styles from "./ModalAuth.module.scss";
import { PropsVoid } from "../../interfaces/childrendInterface";
import { AiOutlineClose } from "react-icons/ai";

const ModalAuth: React.FC<PropsVoid> = ({ onClose,authenticated }) => {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("modalWrapper")}>
      <div className={cx("modal")} >
        <Login onClose={onClose} authenticated={authenticated} />
        <div className={cx("line")}></div>
        <Register />
      </div>
      <button className={cx("btn-close")} onClick={onClose}>{<AiOutlineClose />}</button>
    </div>
  );
};

export default ModalAuth;
