import classNames from "classnames/bind";
import style from "./ProductBasicForm.module.scss";
import React, { useState } from "react";
import { FaImages } from "react-icons/fa";
import Input from "../../../../../Components/Input/Input";
import { productData } from "../../../../../interfaces/admin/Form";

const cx = classNames.bind(style);
interface propsProduct {
  setData: React.Dispatch<React.SetStateAction<productData>>;
  data: productData;
}


const ProductBasicForm: React.FC<propsProduct> = ({ setData, data }) => {
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

  const handleInputChange = (name: string, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
                    height: "60px",
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
        </div>
        <div className={cx("category-box")}>
          <div className={cx("text-title")}>Chọn danh mục bán</div>
          <div className={cx("line")}></div>

          <select name="" id="" className={cx("category-select")}>
            <option value="">Chọn danh mục</option>
          </select>
        </div>
      </div>
      <div className={cx("right-form")}>
        <div className={cx("product-information")}>
          <div className={cx("text-title")}>Chọn danh mục bán</div>
          <div className={cx("line")}></div>
          <Input
            placeholder="Nhập tên sản phẩm "
            name="name"
            label="Tên sản phẩm"
            required={true}
            onChange={handleInputChange}
            values={data.name}
          />
          <div className={cx("grid-input")}>
            <Input
              placeholder="Nhập mã sản phẩm"
              name="sku"
              label="Mã sản phẩm"
              required={true}
              onChange={handleInputChange}
              values={data.sku}
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
          />
        </div>
        <div className={cx("product-quantity")}>
          <div className={cx("text-title")}>Chọn danh mục bán</div>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBasicForm;
