import React from "react";
import classNames from "classnames/bind";
import styles from "./PaymentDetails.module.scss";

const cx = classNames.bind(styles);

const PaymentDetails = () => {
  return (
    <div className={cx("payment-box")}>
      <h3>Payment Details</h3>
      <div className={cx("info")}>
        <p><strong>Transaction:</strong> #AME12346127341</p>
        <p><strong>Payment Method:</strong> Debit Card</p>
        <p><strong>Card Holder Name:</strong> Gabriel Pires</p>
        <p><strong>Card Number:</strong> xxxx xxxx xxxx 1234</p>
      </div>
    </div>
  );
};

export default PaymentDetails;
