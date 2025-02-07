import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import style from "./BrandForm.module.scss";
import classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { addBrand, editBrand } from "../../../../Features/Slices/brandSlice";
import { InputBrand } from "../../../../interfaces/admin/Form";
import { ToastSucess } from "../../../../utils/toast";

const cx = classNames.bind(style);

const brandSchema = z.object({
  name: z.string().min(1, "Tên thương hiệu không được để trống"),
  image: z.any().optional(),
});

const BrandForm = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();
  const [preview, setPreview] = useState<string | null>(null);
  const { brand } = useAppSelector((state) => state.brand);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputBrand>({
    resolver: zodResolver(brandSchema),
  });
  useEffect(() => {
    if (id) {
      const selectedBrand = brand.find((b) => String(b?.id) == id);
      if (selectedBrand) {
        reset({
          name: selectedBrand.name,
        });
      }
    }
  }, [id, brand, reset]);

  const onSubmit = (data: InputBrand) => {
    if (id) {
      dispatch(editBrand({ data, id: Number(id) })).then(() => {
        ToastSucess("Sửa thương hiệu thành công");
      });
    } else {
      dispatch(addBrand(data)).then(() => {
        ToastSucess("Thêm thương hiệu thành công");
      });
    }
   nav('/admin/brand');
    
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className={cx("create-category-container")}>
      <div className={cx("create-category-form-card")}>
        <div className={cx("create-form-header")}>
          <h2>{id ? "Chỉnh Sửa Thương Hiệu" : "Thêm Thương Hiệu"}</h2>
        </div>
        <div className={cx("create-form-description")}>
          <p className={cx("create-form-description-text")}>Mô tả</p>
          <p className={cx("create-form-description-text-add")}>
            {id
              ? "Chỉnh sửa thuộc tính của website bạn"
              : "Thêm thuộc tính của website bạn"}
          </p>
        </div>
        <form
          className={cx("create-category-form")}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={cx("create-form-input")}>
            <div className={cx("create-form-group-row")}>
              <label htmlFor="name">Tên Thương Hiệu *</label>
              <input
                type="text"
                id="name"
                placeholder="Nhập tên thương hiệu ..."
                className={cx("create-form-control")}
                {...register("name")}
              />
              {errors.name && (
                <span className={cx("error")}>{errors.name.message}</span>
              )}
            </div>
          </div>
          <div className={cx("create-form-input")}>
            <div className={cx("create-form-group-row")}>
              <label htmlFor="image">Ảnh Thương Hiệu</label>
              <input
                type="file"
                id="image"
                className={cx("create-form-control")}
                {...register("image")}
                onChange={handleImageChange}
              />
              {errors.image && (
                <span className={cx("error")}>{errors.image.message}</span>
              )}
            </div>
            {preview && (
              <div className={cx("image-preview")}>
                <img
                  src={preview}
                  alt="Xem trước ảnh"
                  width={150}
                  className={cx("preview-img")}
                />
              </div>
            )}
          </div>
          <div className={cx("create-category-button-container")}>
            <button type="submit" className={cx("create-add-category-button")}>
              {id ? "Cập Nhật" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandForm;
