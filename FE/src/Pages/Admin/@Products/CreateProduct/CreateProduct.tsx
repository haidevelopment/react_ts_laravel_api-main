import { FaArrowLeft } from "react-icons/fa";
import style from "./CreateProduct.module.scss";
import classNames from "classnames/bind";
import ProductBasicForm from "../Form/ProductBasicForm/ProductBasicForm";
import ProductVariantForm from "../Form/ProductVariantForm/ProductVariantForm";
import {
  productData,
  VariantDataInterface,
} from "../../../../interfaces/admin/Form";
import React, { useState } from "react";
import { addProducts } from "../../../../Features/Slices/productSlice";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { ToastError, ToastSucess } from "../../../../utils/toast";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(style);
const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<boolean>(false);
  const [submit, setSubmit] = useState(false);
  const [variantData, setVariantData] = useState<VariantDataInterface[]>([]);
  const [data, setData] = useState<productData>({
    name: "",
    sku: "",
    price: "",
    description: "",
    quantity_warning: "",
    quantity: "",
    weight: "",
    tags: "",
    category_id: "",
    brand_id: "",
    image: null,
    images: [],
    instructional_images: null
  });
  const nav = useNavigate();
  const checkRequiredFields = () => {
    const requiredFields = [
      "name",
      "sku",
      "price",
      "description",
      "quantity",
      "tags",
      "image",
      "category_id",
    ];

    for (const field of requiredFields) {
      if (!data[field as keyof productData]) {
        return false;
      }
    }

    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
    const form = {
      data,
      variant: variantData,
    };
    console.log(form);

    if (!checkRequiredFields()) {
      setError(true);
      return false;
    }
    try {
      await dispatch(addProducts(form)).unwrap();
      ToastSucess("Thêm sản phẩm thành công!");
      setSubmit(false);
      nav("/admin/product");
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error);
      ToastError("Thêm sản phẩm thất bại!");
    }
  };
  return (
    <form style={{ marginBottom: "10px" }} onSubmit={handleSubmit}>
      <div className={cx("header")}>
        <div className={cx("navigation")}>
          <div className={cx("back-navigation")}>
            <Link to="/admin/product">
              <FaArrowLeft />
            </Link>
          </div>
          <div className={cx("text-nav")}>
            <div className={cx("text-top")}>Quay trở lại trang danh sách</div>
            <div className={cx("text-bottom")}>Thêm sản phẩm mới</div>
          </div>
        </div>
        <div className={cx("submit-form")}>
          <button className={cx("btn-submit")}>Lưu sản phẩm</button>
        </div>
      </div>
      <ProductBasicForm
        setData={setData}
        data={data}
        error={error}
        setError={setError}
        submit={submit}
      />
      <ProductVariantForm setVariant={setVariantData} />
    </form>
  );
};

export default CreateProduct;
