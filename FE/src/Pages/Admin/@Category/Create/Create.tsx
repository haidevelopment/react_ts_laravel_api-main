import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import './Create.css';
import { schema } from "../../../../utils/validation/c_r_u_d";
import { IFormInput } from "../../../../interfaces/admin/Form";
import { addCategory } from "../../../../Features/Slices/categorySlice";
import { ToastError, ToastSucess } from "../../../../utils/toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
const Create = () => {
  const { register, handleSubmit,reset, formState: { errors } } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });
  const dispatch = useAppDispatch();
 const  nav = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const fileList = data.image as unknown as FileList; 
    const imageFile = fileList[0];
    const formInput: IFormInput = {
      id:undefined,
      name: data.name,
      description: data.description,
      image: imageFile,
      active: data.active
    };
    
    dispatch(addCategory(formInput)).then(()=>{
       ToastSucess("Thêm mới danh mục thành công !");
       reset();
       nav('/admin/category');
    }).catch((error)=>{
      ToastError("Có lỗi xảy ra vui lòng thử lại !");
      console.log(error);
      
    })
    
  };

  return (
    <div className="create-category-container">
      <div className="create-category-form-card">
        <div className="create-form-header">
          <h2>Thêm Danh Mục</h2>
        </div>
        <div className="create-form-description">
          <p className="create-form-description-text">Mô tả</p>
          <p className="create-form-description-text-add">Thêm danh mục của website bạn</p>
        </div>
        <form className="create-category-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="create-form-input">
            <div className="create-form-group-row">
              <label htmlFor="title">Tên Danh Mục *</label>
              <input
                type="text"
                id="title"
                placeholder="Tên danh mục ..."
                className="create-form-control"
                {...register("name")}
              />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>
            <div className="create-form-group-row">
              <label htmlFor="description">Mô tả *</label>
              <textarea
                id="description"
                placeholder="Mô tả"
                className="create-form-control create-textarea"
                {...register("description")}
              />
              {errors.description && <span className="error">{errors.description.message}</span>}
            </div>
            <div className="create-form-group-row">
              <label htmlFor="image">Ảnh *</label>
              <input
                type="file"
                id="image"
                className="create-form-control"
                {...register("image")}
              />
              {errors.image && <span className="error">{errors.image.message}</span>}
            </div>
            <div className="create-form-group-row">
              <label htmlFor="status">Trạng thái *</label>
              <select id="status" className="create-form-control" {...register("active")}>
              <option value="">Chọn trạng thái</option>

                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
              {errors.active && <span className="error">{errors.active.message}</span>}
            </div>
          </div>
          <div className="create-category-button-container">
            <button type="submit" className="create-add-category-button">
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
