import { FaCog, FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import style from "./ListAttribute.module.scss";
import classNames from "classnames/bind";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { useEffect, useState } from "react";
import {
  DelAtrribute,
  getAtrribute,
} from "../../../../../Features/Slices/attributeSlice";
import { ToastSucess } from "../../../../../utils/toast";
import ModalListAttribute from "../../modal/ModalListAttribute/ModalListAttribute";
import { stateAttribute } from "../../../../../interfaces/admin/Api";
import Loading from "../../../../../Components/Loading";

const cx = classNames.bind(style);

const ListAttribute = () => {
  const dispatch = useAppDispatch();
  const { attribute } = useAppSelector((state) => state.attribute);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState<stateAttribute>({
    id: "",
    name: "",
    attribute_value: [],
  });

  useEffect(() => {
    dispatch(getAtrribute());
  }, [dispatch]);

  const handleRemove = (id: number) => {
    if (confirm("Bạn muốn xoá thuộc tính này?")) {
      dispatch(DelAtrribute(id)).then(() => {
        ToastSucess("Xoá thành công thuộc tính");
      });
    }
  };

  const handleEdit = (attribute: stateAttribute) => {
    setSelectedAttribute(attribute);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedAttribute({
      id: "",
      name: "",
      attribute_value: [],
    });
  };
  console.log(selectedAttribute);

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("search-container")}>
          <FaSearch className={cx("search-icon")} />
          <input
            type="text"
            placeholder="Type your query and press enter"
            className={cx("attribute-search")}
          />
        </div>
        <Link
          to="/admin/attribute/create"
          className={cx("add-attribute-button")}
        >
          + Thêm Thuộc Tính
        </Link>
      </div>

      <table className={cx("attribute-table")}>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên Thuộc Tính</th>
            <th>Giá trị thuộc tính</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {attribute.length == 0 ? (
            <tr>
              <td colSpan={4} className={cx("loading-container")}>
                <Loading />
              </td>
            </tr>
          ) : attribute?.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Không có thuộc tính nào
              </td>
            </tr>
          ) : (
            attribute?.map((a, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{a?.name}</td>
                <td>
                  {a?.attribute_value?.length
                    ? a.attribute_value.map((e, index) => (
                        <span key={e?.id}>
                          {e?.value}
                          {index < a.attribute_value.length - 1 && " - "}
                        </span>
                      ))
                    : "Không có giá trị thuộc tính"}
                </td>
                <td>
                  <Link
                    to={`/admin/attribute/edit/${a?.id}`}
                    className={cx("edit-button")}
                    style={{ color: "orange" }}
                    title="Sửa thuộc tính"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleEdit(a)}
                    style={{
                      color: "black",
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                    title="Chỉnh sửa & thêm các giá trị thuộc tính"
                  >
                    <FaCog />
                  </button>
                  <button
                    onClick={() => handleRemove(Number(a?.id))}
                    style={{
                      color: "red",
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "18px",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    title="Xoá thuộc tính"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isOpen && (
        <div className={cx("modal")}>
          <ModalListAttribute
            handleClose={handleClose}
            data={selectedAttribute}
          />
        </div>
      )}
    </div>
  );
};

export default ListAttribute;
