import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import style from "./ListBrand.module.scss";
import classNames from "classnames/bind";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { destroyBrand, getBrand } from "../../../../Features/Slices/brandSlice";
import { ToastSucess } from "../../../../utils/toast";
const cx = classNames.bind(style);
const ListBrand = () => {
  const dispatch = useAppDispatch();
  const { brand } = useAppSelector((state) => state.brand);
  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);
  const hanleDelete =(id:number)=>{
    if(confirm('Bạn muốn xoá ?')){
      dispatch(destroyBrand(id)).then(()=>{
        ToastSucess('Xoá thương hiệu thành công');
      })
    }
    
  }
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("search-container")}>
          <FaSearch className={cx("search-icon")} />
          <input
            type="text"
            placeholder="Type your query and press enter"
            className={cx("brand-search")}
          />
        </div>
        <Link to="/admin/brand/create" className={cx("add-brand-button")}>
          + Thêm Thương Hiệu
        </Link>
      </div>

      <table className={cx("brand-table")}>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên Thương Hiệu</th>
            <th>Ảnh Mô Tả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {brand?.map((a) => (
            <tr key={a?.id}>
              <th>{a?.id}</th>
              <th>{a?.name}</th>
              <th>
                <img src={`http://127.0.0.1:8000/storage/brand/${a?.image}`} width={100} alt="" />
              </th>

              <th>
                <Link
                  to={`/admin/brand/edit/${a?.id}`}
                  className={cx("edit-button")}
                  style={{ color: "orange" }}
                  title="Sửa thương hiệu"
                >
                  <FaEdit />
                </Link>

                <button
                onClick={()=>hanleDelete(Number(a?.id))}
                  style={{
                    color: "red",
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "18px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  title="Xoá thương Hiệu"
                >
                  <FaTrash />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBrand;
