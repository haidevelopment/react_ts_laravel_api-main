import { FaArrowLeft } from 'react-icons/fa';
import style from './CreateProduct.module.scss';
import classNames from 'classnames/bind';
import ProductBasicForm from '../Form/ProductBasicForm/ProductBasicForm';
import ProductVariantForm from '../Form/ProductVariantForm/ProductVariantForm';
import VariantManager from '../VariantManager ';
import { productData } from '../../../../interfaces/admin/Form';
import { useState } from 'react';
const cx = classNames.bind(style);
const CreateProduct = () => {
  const [data, setData] = useState<productData>({
    name: "",
    sku: "",
    price: "",
    description: "",
    quantity_warning: "",
    quantity: "",
    image: null,
    images: [],
  });
  console.log(data);
  
  return (
    <div style={{marginBottom:"20px"}}>
      <div className={cx("header")}>
        <div className={cx("navigation")}>
          <div className={cx("back-navigation")}><FaArrowLeft  /></div>
          <div className={cx("text-nav")}>
            <div className={cx("text-top")}>Quay trở lại trang danh sách</div>
            <div className={cx("text-bottom")}>Thêm sản phẩm mới</div>
          </div>
        </div>
        <div className={cx("submit-form")}>
          <button className={cx("btn-submit")}>Lưu sản phẩm</button>
        </div>
      </div>
     <ProductBasicForm setData={setData} data={data}  />
     <ProductVariantForm />
     <VariantManager />
    </div>
  );
}

export default CreateProduct;
