import React from "react";
import classNames from "classnames/bind";
import styles from "./ShippingInfo.module.scss";
import { AddressInterface } from "../../../../../interfaces/authInterface";

const cx = classNames.bind(styles);
interface props {
  data : AddressInterface | null;
}
const ShippingInfo:React.FC<props> = ({data}) => {
  return (
    <div className={cx("shipping-box")}>
      <h3>Shipping Information</h3>
      <div className={cx("info")}>
        <p><strong>Full Name:</strong> {data?.full_name}</p>
        <p><strong>Address:</strong> {data?.note} , {data?.address} , {data?.ward} , {data?.district} , {data?.province}</p>
        <p><strong>Phone Number:</strong> {data?.phone}</p>
        <p><strong>Email:</strong> {data?.email}</p>
      </div>
    </div>
  );
};

export default ShippingInfo;
