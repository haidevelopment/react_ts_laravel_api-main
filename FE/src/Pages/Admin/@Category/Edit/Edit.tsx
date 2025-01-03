import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import './Edit.css'
import { schema } from "../../../../utils/validation/c_r_u_d";
import { IFormInput } from "../../../../interfaces/admin/Form";
import { editCategory, getCategories } from "../../../../Features/Slices/categorySlice";
import { ToastError, ToastSucess } from "../../../../utils/toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";

const Edit = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { categories } = useAppSelector((state) => state.category);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });
  console.log(categories);
  

  useEffect(() => {
    dispatch(getCategories()); 

    if (categories ) {
      const category = categories?.original?.find((cat) => cat.id === Number(id));
      if (category) {
        reset({
          name: category.name,
          description: category.description,
          image: undefined, 
          active: category.active ,
        });
      } else {
        ToastError("Không tìm thấy danh mục!");
      }
    }
  }, [id]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const fileList = data.image as unknown as FileList;
    const imageFile = fileList[0] || null;

    const formInput: IFormInput = {
      id: Number(id), 
      name: data.name,
      description: data.description,
      image: imageFile,
      active: data.active,
    };
    console.log(id);
    

    dispatch(editCategory({ id: Number(id), data: formInput }))
      .then(() => {
        ToastSucess("Chỉnh sửa danh mục thành công!");
        nav('/admin/category');
      })
      .catch((error) => {
        ToastError("Có lỗi xảy ra, vui lòng thử lại!");
        console.log(error);
      });
  };

  return (
    <div className="edit-category-container">
      <div className="edit-category-form-card">
        <div className="edit-form-header">
          <h2>Chỉnh Sửa Danh Mục</h2>
        </div>
        <div className="edit-form-description">
          <p className="edit-form-description-text">Mô tả</p>
          <p className="edit-form-description-text-add">Chỉnh sửa danh mục của website bạn</p>
        </div>
        <form className="edit-category-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="edit-form-input">
            <div className="edit-form-group-row">
              <label htmlFor="title">Tên Danh Mục *</label>
              <input
                type="text"
                id="title"
                placeholder="Tên danh mục ..."
                className="edit-form-control"
                {...register("name")}
              />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>
            <div className="edit-form-group-row">
              <label htmlFor="description">Mô tả *</label>
              <textarea
                id="description"
                placeholder="Mô tả"
                className="edit-form-control edit-textarea"
                {...register("description")}
              />
              {errors.description && <span className="error">{errors.description.message}</span>}
            </div>
            <div className="edit-form-group-row">
              <label htmlFor="image">Ảnh (nếu cần thay đổi)</label>
              <input
                type="file"
                id="image"
                className="edit-form-control"
                {...register("image")}
              />
              {errors.image && <span className="error">{errors.image.message}</span>}
            </div>
            <div className="edit-form-group-row">
              <label htmlFor="status">Trạng thái *</label>
              <select id="status" className="edit-form-control" {...register("active")}>
                <option value="">Chọn trạng thái</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
              {errors.active && <span className="error">{errors.active.message}</span>}
            </div>
          </div>
          <div className="edit-category-button-container">
            <button type="submit" className="edit-add-category-button">
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
