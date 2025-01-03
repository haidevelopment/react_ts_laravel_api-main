import classNames from "classnames/bind";
import styles from './ListProduct.module.scss'
import { FaEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
const ListProduct = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("search-container")}>
            <FaSearch className={cx("search-icon")} />
            <input type="text" placeholder="Type your query and press enter" className={cx("product-search")} />

        </div>
        <Link to="/admin/create-product" className={cx("add-product-button")} >
            + Thêm Sản Phẩm
        </Link>
      </div>
      <table className={cx("product-table")}>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Tên Sản Phẩm</th>
                      <th>Giá sản phẩm</th>
                      <th>Ảnh</th>
                      <th>Mô tả</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Quần</td>
                  <td>1000</td>
                  <td>image</td>
                  <td>mô tả</td>
                  <td>active</td>
                  <td>
                    <Link to={`/admin/edit-category/`} className={cx("edit-button" )}>
                        <FaEdit />
                    </Link>
                    <button className={cx("delete-button")} >
                        <FaTrashAlt />
                     </button>
                  </td>
                </tr>
                    
                 
              </tbody>
          </table>
    </div>
  );
}

export default ListProduct;
