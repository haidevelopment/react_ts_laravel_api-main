import classNames from "classnames/bind";
import style from "./ModalSelectAddress.module.scss";
import { AddressInterface } from "../../../../interfaces/authInterface";
import React from "react";
import area from "../../../../assets/image/logo/area.jpg";
const cx = classNames.bind(style);
interface Props {
  handleClose: () => void;
  setAddress: React.Dispatch<React.SetStateAction<AddressInterface | null>>;
  addressDefault: AddressInterface | null;
  data?: AddressInterface[];
}

const ModalSelectAddress: React.FC<Props> = ({
  handleClose,
  setAddress,
  addressDefault,
  data,
}) => {
  const handleConfirmAddress = () => {
    handleClose();
  };
  return (
    <div className={cx("container")}>
      <div className={cx("header-modal")}>
        <h2 className={cx("title")}>Chọn địa chỉ giao hàng</h2>
        <button onClick={handleClose}>x</button>
      </div>
      <div className={cx("container-address")}>
        {data?.map((a) => (
          <div
            className={cx("body-address")}
            key={a?.id}
            onClick={() => setAddress(a)}
          >
            {addressDefault?.id == a?.id && (
              <img src={area} alt="" height={100} />
            )}
            <div
              className={cx("box-notify", {
                active: addressDefault?.id == a?.id,
              })}
            >
              <div className={cx("address-infor")}>
                <div className={cx("infor")}>
                  <div className={cx("name-phone")}>
                    <div className={cx("detail")}>
                      <h4>Họ và Tên : {a?.full_name} </h4>
                      <h4>SĐT : {a?.phone} </h4>
                    </div>
                    <div className={cx("active-main")}>{addressDefault?.id == a?.id && "Địa chỉ mặc định"}</div>
                  </div>
                  <div className={cx("address")}>
                    <div className={cx("title")}>Địa chỉ giao hàng :</div>
                    <div className={cx("address-detail")}>
                      {" "}
                      {a?.note} , {a?.ward}, {a?.district} ,{a?.province}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className={cx("action-btn")}>
          <button onClick={handleConfirmAddress}>Chọn địa chỉ</button>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectAddress;
