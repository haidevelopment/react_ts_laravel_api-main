import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { attributeInput } from "../../../../../interfaces/admin/Form";
import { schemaAttribute } from "../../../../../utils/validation/c_r_u_d";
import style from "./FormAttribute.module.scss";
import classNames from "classnames/bind";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { AddAtrribute, EditAtrribute } from "../../../../../Features/Slices/attributeSlice";
import { ToastError, ToastSucess } from "../../../../../utils/toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getOneAttribute } from "../../../../../services/Api/AttributeAPI";

const cx = classNames.bind(style);

const FormAttribute = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<attributeInput>({
    resolver: zodResolver(schemaAttribute),
  });

  useEffect(() => {
     (async()=>{
      if (id) {
        const data = await getOneAttribute(Number(id));
        const name = data.name;
        reset({name});
        
       } 
     })();
  }, [id, reset]);

  const onSubmit: SubmitHandler<attributeInput> = (data) => {
    const input: attributeInput = {
      name: data.name,
    };
    console.log(input);
    

    if (id) {
     dispatch(EditAtrribute({id:Number(id),data:input})).then(()=>{
      ToastSucess("Cập nhật thuộc tính thành công !");
      nav("/admin/attribute");
     }).catch(()=>{
      ToastError('Có lỗi xảy ra')
     })
    } else {
      dispatch(AddAtrribute(input)).then(() => {
        ToastSucess("Thêm mới thuộc tính thành công !");
        reset();
        nav("/admin/attribute");
      });
    }
  };

  return (
    <div className={cx("create-category-container")}>
      <div className={cx("create-category-form-card")}>
        <div className={cx("create-form-header")}>
          <h2>{id ? "Chỉnh Sửa Thuộc Tính" : "Thêm Thuộc Tính"}</h2>
        </div>
        <div className={cx("create-form-description")}>
          <p className={cx("create-form-description-text")}>Mô tả</p>
          <p className={cx("create-form-description-text-add")}>
            {id ? "Chỉnh sửa thuộc tính của website bạn" : "Thêm thuộc tính của website bạn"}
          </p>
        </div>
        <form
          className="create-category-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="create-form-input">
            <div className="create-form-group-row">
              <label htmlFor="title">Tên Thuộc Tính *</label>
              <input
                type="text"
                id="title"
                placeholder="Tên thuộc tính ..."
                className="create-form-control"
                {...register("name")}
              />
              {errors.name && (
                <span className="error">{errors.name.message}</span>
              )}
            </div>
          </div>
          <div className="create-category-button-container">
            <button type="submit" className="create-add-category-button">
              {id ? "Cập Nhật" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAttribute;
