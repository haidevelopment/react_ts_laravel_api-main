import classNames from "classnames/bind";
import style from "./ModalFormAttribute.module.scss";
import React, { useEffect } from "react";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import {
  AddAtrributeValue,
  getAtrribute,
} from "../../../../../Features/Slices/attributeSlice";
import { ToastError, ToastSucess } from "../../../../../utils/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { attributeValueInput } from "../../../../../interfaces/admin/Form";

const cx = classNames.bind(style);

const schema = z.object({
  value: z.string().min(1, "Giá trị thuộc tính không được để trống"),
  attribute_id: z.coerce.number().min(1, "Bạn phải chọn một thuộc tính"),
});

interface Props {
  handleClose: () => void;
}

const ModalFormAttribute: React.FC<Props> = ({ handleClose }) => {
  const dispatch = useAppDispatch();
  const { attribute } = useAppSelector((state) => state.attribute);

  useEffect(() => {
    dispatch(getAtrribute());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<attributeValueInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: "",
      attribute_id: 0,
    },
  });

  const onSubmit = (data: attributeValueInput) => {
    dispatch(AddAtrributeValue(data))
      .then(() => {
        ToastSucess("Bạn đã thêm thành công giá trị thuộc tính");
        handleClose();
      })
      .catch(() => {
        ToastError("Có lỗi xảy ra khi thêm giá trị thuộc tính");
      });
  };

  return (
    <div className={cx("box-attribute-add")}>
      <div className={cx("box-header")}>
        <h2>Thêm giá trị thuộc tính</h2>
        <button onClick={handleClose}>x</button>
      </div>
      <div className={cx("body-box")}>
        <form onSubmit={handleSubmit(onSubmit)} className={cx("form")}>
          <div className={cx("form-group")}>
            <div className={cx("form-label")}>Nhập Giá trị thuộc tính</div>
            <input
              type="text"
              className={cx("form-control")}
              placeholder="Nhập giá trị thuộc tính"
              {...register("value")}
            />
            {errors.value && (
              <p className={cx("error-text")}>{String(errors.value.message)}</p>
            )}
          </div>

          <div className={cx("form-group")}>
            <div className={cx("form-label")}>Chọn thuộc tính</div>
            <select className={cx("form-control")} {...register("attribute_id")}>
              <option value={0}>Chọn thuộc tính</option>
              {attribute?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.attribute_id && (
              <p className={cx("error-text")}>
                {String(errors.attribute_id.message)}
              </p>
            )}
          </div>

          <button type="submit" className={cx("btn-submit")}>
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalFormAttribute;
