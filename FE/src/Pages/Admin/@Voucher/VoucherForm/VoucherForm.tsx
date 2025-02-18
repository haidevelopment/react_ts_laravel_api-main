import classNames from "classnames/bind";
import style from "./VoucherForm.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CouponInput } from "../../../../interfaces/admin/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { addCoupon, editCoupon } from "../../../../Features/Slices/couponSlice";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useEffect } from "react";

const cx = classNames.bind(style);

const couponSchema = z.object({
  code: z.string().min(1, "Mã giảm giá không được để trống"),
  title: z.string().min(1, "Tiêu đề không được để trống"),
  voucher_type: z.string().min(1, "Loại voucher không được để trống"),
  value: z.number().min(1, "Giá trị phải lớn hơn 0"),
  discount_type: z.string().min(1, "Loại giảm giá không được để trống"),
  min_order_value: z.number().min(0, "Giá trị đơn hàng tối thiểu không hợp lệ"),
  max_discount_value: z.number().min(0, "Giá trị giảm giá tối đa không hợp lệ"),
  start_date: z.date({ required_error: "Ngày bắt đầu không được để trống" }),
  end_date: z.date({ required_error: "Ngày kết thúc không được để trống" }),
  limit: z.number().min(1, "Số lượng sử dụng phải lớn hơn 0"),
  is_active: z.enum(["1", "0"]),
});

const discountTypeOptions = [
  { value: "percent", label: "Giảm theo %" },
  { value: "fixed", label: "Giảm giá cố định" },
];

const voucherTypeOptions = [
  { value: "discount", label: "Mã giảm giá" },
  { value: "freeship", label: "Miễn phí vận chuyển" },
];

const statusOptions = [
  { value: "1", label: "Kích hoạt" },
  { value: "0", label: "Chưa kích hoạt" },
];

const VoucherForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const {coupon} = useAppSelector((state)=>state.coupon);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CouponInput>({
    resolver: zodResolver(couponSchema),
  });
    useEffect(() => {
    if (id) {
      const foundCoupon = coupon.find((c) => String(c.id) == id); 
      if (foundCoupon) {
        reset({
          ...foundCoupon,
          start_date: new Date(foundCoupon.start_date).toISOString().slice(0, 16),
          end_date: new Date(foundCoupon.end_date).toISOString().slice(0, 16),
        });
      }
    }
  }, [id, coupon, reset]);

  const onSubmit = (data: CouponInput) => {
    const formattedData = {
      ...data,
      start_date: new Date(data.start_date).toISOString().slice(0, 19).replace("T", " "),
      end_date: new Date(data.end_date).toISOString().slice(0, 19).replace("T", " ")
    };
    if(id){
      dispatch(editCoupon({ data: formattedData, id: Number(id) }));

    }else{
      dispatch(addCoupon(formattedData));

    }
    nav('/admin/coupon');
  };
 
  return (
    <div className={cx("create-category-container")}>
      <div className={cx("create-category-form-card")}>
        <div className={cx("create-form-header")}>
          <h2>Thêm Voucher</h2>
        </div>
        <div className={cx("create-form-description")}>
          <p className={cx("create-form-description-text")}>Mô tả</p>
          <p className={cx("create-form-description-text-add")}>
            {id
              ? "Chỉnh sửa thuộc tính của website bạn"
              : "Thêm thuộc tính của website bạn"}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={cx("create-form-input")}>
            <label htmlFor="code">Mã giảm giá *</label>
            <input
              type="text"
              id="code"
              placeholder="Nhập mã..."
              {...register("code")}
            />
            {errors.code && (
              <span className={cx("error")}>{errors.code.message}</span>
            )}
          </div>

          <div className={cx("create-form-input")}>
            <label htmlFor="title">Tiêu đề *</label>
            <input
              type="text"
              id="title"
              placeholder="Nhập tiêu đề..."
              {...register("title")}
            />
            {errors.title && (
              <span className={cx("error")}>{errors.title.message}</span>
            )}
          </div>
          <div className={cx("create-form-input")}>
          <label htmlFor="min_order_value">Giá trị đơn hàng tối thiểu *</label>
          <input type="number" id="min_order_value" placeholder="Nhập giá trị tối thiểu..." {...register("min_order_value", { valueAsNumber: true })} />
          {errors.min_order_value && <span className={cx("error")}>{errors.min_order_value.message}</span>}
        </div>

        <div className={cx("create-form-input")}>
          <label htmlFor="max_discount_value">Giá trị giảm giá tối đa *</label>
          <input type="number" id="max_discount_value" placeholder="Nhập số tiền giảm tối đa..." {...register("max_discount_value", { valueAsNumber: true })} />
          {errors.max_discount_value && <span className={cx("error")}>{errors.max_discount_value.message}</span>}
        </div>

          <div className={cx("create-form-input")}>
            <label htmlFor="voucher_type">Loại Voucher *</label>
            <select id="voucher_type" {...register("voucher_type")}>
              {voucherTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.voucher_type && (
              <span className={cx("error")}>{errors.voucher_type.message}</span>
            )}
          </div>

          <div className={cx("create-form-input")}>
            <label htmlFor="value">Giá trị *</label>
            <input
              type="number"
              id="value"
              placeholder="Nhập giá trị..."
              {...register("value", { valueAsNumber: true })}
            />
            {errors.value && (
              <span className={cx("error")}>{errors.value.message}</span>
            )}
          </div>

          <div className={cx("create-form-input")}>
            <label htmlFor="discount_type">Loại giảm giá *</label>
            <select id="discount_type" {...register("discount_type")}>
              {discountTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.discount_type && (
              <span className={cx("error")}>
                {errors.discount_type.message}
              </span>
            )}
          </div>

          <div className={cx("create-form-input")}>
            <label htmlFor="start_date">Ngày bắt đầu *</label>
            <input
              type="datetime-local"
              id="start_date"
              {...register("start_date", { valueAsDate: true })}
            />
            {errors.start_date && (
              <span className={cx("error")}>{errors.start_date.message}</span>
            )}
          </div>

          <div className={cx("create-form-input")}>
            <label htmlFor="end_date">Ngày kết thúc *</label>
            <input
              type="datetime-local"
              id="end_date"
              {...register("end_date", { valueAsDate: true })}
            />
            {errors.end_date && (
              <span className={cx("error")}>{errors.end_date.message}</span>
            )}
          </div>

          <div className={cx("create-form-input")}>
            <label htmlFor="limit">Số lượng sử dụng *</label>
            <input
              type="number"
              id="limit"
              placeholder="Nhập số lượng..."
              {...register("limit", { valueAsNumber: true })}
            />
            {errors.limit && (
              <span className={cx("error")}>{errors.limit.message}</span>
            )}
          </div>

          <div className={cx("create-form-input")}>
            <label htmlFor="is_active">Trạng thái kích hoạt *</label>
            <select id="is_active" {...register("is_active")}>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.is_active && (
              <span className={cx("error")}>{errors.is_active.message}</span>
            )}
          </div>

          <div className={cx("create-category-button-container")}>
            <button type="submit" className={cx("create-add-category-button")}>
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoucherForm;
