import { FaEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import "./List.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  getCategories,
  removeCategory,
} from "../../../../Features/Slices/categorySlice";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { ToastSucess } from "../../../../utils/toast";
import Loading from "../../../../Components/Loading";
const List = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleDel = (id: number) => {
    if (confirm("Bạn muốn xoá chứ ?")) {
      dispatch(removeCategory(id))
        .then(() => {
          ToastSucess("Xoá thành công danh mục");
        })
        .catch((error) => {
          console.log("Error deleting category:", error);
        });
    }
  };

  return (
    <div className="category-container">
      <div className="category-header">
        <div className="category-search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Type your query and press enter"
            className="category-search"
          />
        </div>
        <Link to="/admin/create-category" className="add-category-button">
          + Thêm Danh Mục
        </Link>
      </div>
      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Danh Mục</th>
            <th>Ảnh</th>
            <th>Mô tả</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories?.original.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <Loading />
              </td>
            </tr>
          ) : (
            categories?.original?.map((c) => (
              <tr key={c?.id}>
                <td>{c?.id}</td>
                <td>{c?.name}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/storage/category/${c?.image}`}
                    width="100px"
                    alt="Ảnh danh mục"
                  />
                </td>
                <td>{c?.description}</td>
                <td>{c?.active}</td>
                <td>
                  <Link
                    to={`/admin/edit-category/${c?.id}`}
                    className="edit-button"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => handleDel(Number(c?.id))}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
