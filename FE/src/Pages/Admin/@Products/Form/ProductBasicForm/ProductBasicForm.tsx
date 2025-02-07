import classNames from "classnames/bind";
import style from "./ProductBasicForm.module.scss";
import React, { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa";
import Input from "../../../../../Components/Input/Input";
import { productData } from "../../../../../interfaces/admin/Form";
import { ToastError } from "../../../../../utils/toast";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { getCategories } from "../../../../../Features/Slices/categorySlice";
import { getBrand } from "../../../../../Features/Slices/brandSlice";

const cx = classNames.bind(style);
interface propsProduct {
  setData: React.Dispatch<React.SetStateAction<productData>>;
  data: productData;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  submit: boolean;
}

const ProductBasicForm: React.FC<propsProduct> = ({
  setData,
  data,
  error,
  setError,
  submit,
}) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const { brand } = useAppSelector((state) => state.brand);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrand());
  }, [dispatch]);
  const [images, setImages] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages(fileArray);
      setSelectedImage(URL.createObjectURL(fileArray[0]));

      setData((prevState) => ({
        ...prevState,
        images: fileArray,
        image: fileArray[0],
      }));
    }
  };


  const handleImageClick = (image: File) => {
    const imageUrl = URL.createObjectURL(image);
    setSelectedImage(imageUrl);

    setData((prevState) => ({
      ...prevState,
      image: image,
    }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (error) {
      ToastError("Vui lòng nhập đầy đủ thông tin");
      setError(false);
    }
  }, [error]);

  return (
    <div className={cx("container")}>
      <div className={cx("left-form")}>
        <div className={cx("image-box")}>
          <div className={cx("text-title")}>Thêm ảnh sản phẩm</div>
          <div className={cx("line")}></div>

          <div className={cx("prevew-single-image")}>
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Ảnh chính"
                className={cx("main-image")}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div className={cx("null-image")}>Chọn ảnh sản phẩm</div>
            )}
          </div>

          <div className={cx("prevew-thumb-image")}>
            {images.length > 0 ? (
              images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Ảnh ${index + 1}`}
                  className={cx("thumb-image")}
                  style={{
                    width: "60px",
                    height: "70px",
                    objectFit: "cover",
                    margin: "5px",
                    cursor: "pointer",
                    border:
                      selectedImage === URL.createObjectURL(image)
                        ? "2px solid #007bff"
                        : "1px solid #ddd",
                  }}
                  onClick={() => handleImageClick(image)}
                />
              ))
            ) : (
              <>
                <div className={cx("null-image")}>+</div>
                <div className={cx("null-image")}>+</div>
                <div className={cx("null-image")}>+</div>
              </>
            )}
          </div>

          <div className={cx("line")}></div>

          <div className={cx("input-image")}>
            <label htmlFor="multiple">
              <FaImages /> Thêm ảnh
            </label>
            <input
              type="file"
              id="multiple"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </div>
          {submit && !images && <span color="red">Vui lòng thêm ảnh</span>}
        </div>
        <div className={cx("category-box")}>
          <div className={cx("text-title")}>Chọn danh mục bán</div>
          <div className={cx("line")}></div>

          <select
            name="category_id"
            id=""
            className={cx("category-select")}
            onChange={handleInputChange}
          >
            <option value="">Chọn danh mục</option>
            {categories?.original?.map((c) => (
              <option value={c?.id} key={c?.id}>
                {c?.name}
              </option>
            ))}
          </select>
        </div>
        <div className={cx("category-box")}>
          <div className={cx("text-title")}>Chọn thương hiệu sản phẩm</div>
          <div className={cx("line")}></div>

          <select
            name="brand_id"
            id=""
            className={cx("category-select")}
            onChange={handleInputChange}
          >
            <option value="">Chọn thương hiệu</option>
            {brand?.map((c) => (
              <option value={c?.id} key={c?.id}>
                {c?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={cx("right-form")}>
        <div className={cx("product-information")}>
          <div className={cx("text-title")}>Thông tin cơ bản sản phẩm</div>
          <div className={cx("line")}></div>
          <Input
            placeholder="Nhập tên sản phẩm "
            name="name"
            label="Tên sản phẩm"
            required={true}
            onChange={handleInputChange}
            values={data.name}
            submit={submit}
          />
          <div className={cx("grid-input")}>
            <Input
              placeholder="Nhập mã sản phẩm"
              name="sku"
              label="Mã sản phẩm"
              required={true}
              onChange={handleInputChange}
              values={data.sku}
              submit={submit}
            />
            <Input
              placeholder="Nhập giá sản phẩm"
              name="price"
              label="Giá sản phẩm"
              required={true}
              html="input"
              type="number"
              left="5px"
              onChange={handleInputChange}
              values={data.price}
              submit={submit}
            />
          </div>
          <div className={cx("grid-input")}>
            <Input
              placeholder="Nhập cân nặng "
              name="weight"
              label="Cân nặng"
              onChange={handleInputChange}
              values={data.weight}
              submit={submit}
            />
            <Input
              placeholder="Nhập tags sản phẩm"
              name="tags"
              label="Tags sản phẩm"
              html="input"
              type="text"
              left="5px"
              onChange={handleInputChange}
              values={data.tags}
              submit={submit}
            />
          </div>
          <Input
            placeholder="Nhập mô tả sản phẩm "
            name="description"
            label="Mô tả sản phẩm"
            required={true}
            html="textarea"
            left="5px"
            onChange={handleInputChange}
            values={data.description}
            submit={submit}
          />
        </div>
        <div className={cx("product-quantity")}>
          <div className={cx("text-title")}>Quản lí thành phần khác</div>
          <div className={cx("line")}></div>
          <div className={cx("grid-input")}>
            <Input
              placeholder="Nhập số lượng sản phẩm "
              name="quantity"
              label="Số lượng sản phẩm"
              required={true}
              type="number"
              html="input"
              onChange={handleInputChange}
              values={data.quantity}
              submit={submit}
            />
            <Input
              placeholder="Nhập số lượng tối thiểu "
              name="quantity_warning"
              label="Số lượng tối thiểu"
              required={false}
              html="input"
              type="number"
              left="5px"
              onChange={handleInputChange}
              values={data.quantity_warning}
              submit={submit}
            />
          </div>
          <div className={cx("image-intruct")}>
            <label htmlFor="instructional_images">Hình ảnh hướng dẫn chọn size ( 1 ảnh )</label>
            <input
              type="file"
              name="instructional_images"
              id="instructional_images"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setData((prev) => ({ ...prev, instructional_images: file }));
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBasicForm;
