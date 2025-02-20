import classNames from "classnames/bind";
import styles from "./ListProduct.module.scss";
import { FaEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import {
  getProducts,
  removeProduct,
} from "../../../../Features/Slices/productSlice";
import { convertStatus, convertVND } from "../../../../utils/func/convert";
import { ToastError, ToastSucess } from "../../../../utils/toast";
import Loading from "../../../../Components/Loading";
import ProductInventory from "../StockStatus/ProductInventory";
const cx = classNames.bind(styles);
const ListProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const handleDelete = (id: number) => {
    if (confirm("Bạn muốn xoá sản phẩm này ?")) {
      dispatch(removeProduct(id))
        .then(() => {
          ToastSucess("Xoá thành công sản phẩm ");
        })
        .catch((error) => {
          console.log(error);
          ToastError("Có lỗi xảy ra không thể xoá");
        });
    }
  };
  const handleModalInventory = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("search-container")}>
          <FaSearch className={cx("search-icon")} />
          <input
            type="text"
            placeholder="Type your query and press enter"
            className={cx("product-search")}
          />
        </div>
        <div className={cx("group-btn")}>
          <Link to="/admin/create-product" className={cx("add-product-button")}>
            + Thêm Sản Phẩm
          </Link>
          <button className={cx("inventory")} onClick={handleModalInventory}>
            Xem tồn kho
          </button>
        </div>
      </div>
      <table className={cx("product-table")}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Sản Phẩm</th>
            <th>Giá sản phẩm</th>
            <th>Ảnh</th>
            <th>Ảnh nhỏ</th>
            <th>Mô tả</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={8}>
                <Loading />
              </td>
            </tr>
          ) : (
            products?.map((p, index) => (
              <tr key={p?.id || index}>
                <td>{index + 1}</td>
                <td>{p?.name}</td>
                <td>{convertVND(p?.price)}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/storage/product/${p?.image}`}
                    alt="Ảnh sản phẩm"
                    width={100}
                  />
                </td>
                <td>
                  {p?.attachments?.map((a, idx) => (
                    <img
                      key={idx}
                      src={`http://127.0.0.1:8000/storage/product/attachments/${a?.image_url}`}
                      alt={`Ảnh nhỏ ${idx}`}
                      width={50}
                    />
                  ))}
                </td>
                <td>{p?.description}</td>
                <td>{convertStatus(p?.active)}</td>
                <td>
                  <Link
                    to={`/admin/edit-product/${p?.id}`}
                    className={cx("edit-button")}
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className={cx("delete-button")}
                    onClick={() => handleDelete(Number(p?.id))}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isOpen && (
        <div className={cx("modal-inventory")}>
          <ProductInventory onClose={handleModalInventory} />
        </div>
      )}
    </div>
  );
};

export default ListProduct;
