import classNames from "classnames/bind";
import style from "./ModalAddress.module.scss";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  AddressData,
  apiRequestLocal,
} from "../../../../interfaces/admin/Form";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { createNewAddress } from "../../../../Features/Slices/authSlice";

const cx = classNames.bind(style);

interface Props {
  handleClose: () => void;
}

const ModalAddress: React.FC<Props> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddressData>();
  const [provinces, setProvinces] = useState<apiRequestLocal[]>([]);
  const [districts, setDistricts] = useState<apiRequestLocal[]>([]);
  const [wards, setWards] = useState<apiRequestLocal[]>([]);
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((res) => setProvinces(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const provinceCode = watch("province");
    if (provinceCode) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
        .then((res) => {
          setDistricts(res.data.districts || []);
          setProvinceName(res.data.name);
        })
        .catch((err) => console.error(err));

      setValue("district", "");
      setValue("ward", "");
      setWards([]);
    }
  }, [watch("province"), setValue]);

  useEffect(() => {
    const districtCode = watch("district");
    if (districtCode) {
      axios
        .get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
        .then((res) => {
          setWards(res.data.wards || []);
          setDistrictName(res.data.name);
        })
        .catch((err) => console.error(err));

      setValue("ward", "");
      setWardName("");
    }
  }, [watch("district"), setValue]);

  useEffect(() => {
    const wardCode = watch("ward");
    if (wardCode && wards.length) {
      const ward = wards.find((w) => w.code == wardCode);
      if (ward) {
        setWardName(ward.name);
      }
    }
  }, [watch("ward"), wards]);

  useEffect(() => {
    const districtCode = watch("district");
    if (districtCode) {
      axios
        .get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
        .then((res) => {
          setWards(res.data.wards || []);
          setDistrictName(res.data.name);
        })
        .catch((err) => console.error(err));

      setValue("ward", "");
      setWardName("");
    }
  }, [watch("district"), setValue]);

  useEffect(() => {
    const wardCode = watch("ward");
    if (wardCode && wards.length) {
      const ward = wards.find((w) => w.code == wardCode);
      if (ward) {
        setWardName(ward.name);
      }
    }
  }, [watch("ward"), wards]);

  const onSubmit = (data: AddressData) => {
    const formattedData = {
      ...data,
      province: provinceName,
      district: districtName,
      ward: wardName,
    };
    dispatch(createNewAddress(formattedData));
    handleClose();
    
  };
  return (
    <div className={cx("container")}>
      <div className={cx("header-modal")}>
        <h2 className={cx("title")}>Thêm địa chỉ mới</h2>
        <button onClick={handleClose}>x</button>
      </div>
      <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx("formGroup")}>
          <label>Họ Tên *</label>
          <input
            {...register("full_name", {
              required: "Họ tên không được để trống",
            })}
            type="text"
            placeholder="Nhập họ tên của bạn"
          />
          {errors.full_name && (
            <p className={cx("error")}>{errors.full_name.message}</p>
          )}
        </div>
        <div className={cx("formGroup")}>
          <label>Email *</label>
          <input
            {...register("email", { required: "Email không được để trống" })}
            type="email"
            placeholder="Nhập email của bạn"
          />
          {errors.email && (
            <p className={cx("error")}>{errors.email.message}</p>
          )}
        </div>
        <div className={cx("formGroup")}>
          <label>SĐT *</label>
          <input
            {...register("phone", {
              required: "Số điện thoại không được để trống",
            })}
            type="text"
            placeholder="Nhập số điện thoại"
          />
          {errors.phone && (
            <p className={cx("error")}>{errors.phone.message}</p>
          )}
        </div>
        <div className={cx("formGroupRow")}>
          <div className={cx("formGroup")}>
            <label>Tỉnh / Thành phố *</label>
            <select
              {...register("province", {
                required: "Vui lòng chọn tỉnh/thành phố",
              })}
            >
              <option value="">Chọn tỉnh / thành phố</option>
              {provinces.map((p: apiRequestLocal) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.province && (
              <p className={cx("error")}>{errors.province.message}</p>
            )}
          </div>
          <div className={cx("formGroup")}>
            <label>Quận / Huyện *</label>
            <select
              {...register("district", {
                required: "Vui lòng chọn quận/huyện",
              })}
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((d: apiRequestLocal) => (
                <option key={d.code} value={d.code}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className={cx("error")}>{errors.district.message}</p>
            )}
          </div>
          <div className={cx("formGroup")}>
            <label>Phường / Xã</label>
            <select {...register("ward")}>
              <option value="">Chọn phường/xã</option>
              {wards.map((w: apiRequestLocal) => (
                <option key={w.code} value={w.code}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={cx("formGroup")}>
          <label>Địa chỉ *</label>
          <input
            {...register("address", {
              required: "Địa chỉ không được để trống",
            })}
            type="text"
            placeholder="Nhập địa chỉ của bạn"
          />
          {errors.address && (
            <p className={cx("error")}>{errors.address.message}</p>
          )}
        </div>
        <div className={cx("formGroup")}>
          <label>Ghi chú</label>
          <textarea {...register("note")} placeholder="Nhập ghi chú của bạn" />
        </div>
        <button className={cx("submitBtn")} type="submit">
          Thêm địa chỉ mới
        </button>
      </form>
    </div>
  );
};

export default ModalAddress;
