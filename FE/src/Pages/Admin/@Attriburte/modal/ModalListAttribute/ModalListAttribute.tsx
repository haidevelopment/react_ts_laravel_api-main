import { FaEdit, FaTrash } from "react-icons/fa";
import style from "./ModalListAttribute.module.scss";
import classNames from "classnames/bind";
import { ModalIntefaceProps } from "../../../../../interfaces/admin/interface";
import { useState } from "react";
import ModalFormAttribute from "../ModalFormAttribute/ModalFormAttribute";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { DelAtrributeValue } from "../../../../../Features/Slices/attributeSlice";
import { ToastError, ToastSucess } from "../../../../../utils/toast";

const cx = classNames.bind(style);

const ModalListAttribute: React.FC<ModalIntefaceProps> = ({ handleClose, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleDelete =( id: number) =>{
   if(confirm('Bạn muốn xoá thuộc tính này ?')){
    dispatch(DelAtrributeValue(id)).then(()=>{
      ToastSucess('Xoá giá trị thuộc tính thành công');
    }).catch((error)=>{
      console.log(error);
      ToastError('Có lỗi xảy ra ');
      
    })
   }
    
  }

  return (
    <div className={cx("modal-list-container")}>
      <div className={cx("modal-header")}>
        <h1>Giá trị thuộc tính</h1>
        <button onClick={handleClose}>x</button>
      </div>
      <div className={cx("line")}></div>
      <div className={cx("modal-list-body")}>
        <button className={cx("btn-create")} onClick={() => setIsOpen(!isOpen)}>
          + Thêm thuộc tính
        </button>
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên giá trị thuộc tính</th>
              <th>Thuộc tính</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
           {data?.attribute_value?.map((a)=>(
            <tr key={a?.id}>
            <td>{a?.id}</td>
            <td>{a?.value}</td>
            <td>{data?.name}</td>
            <td>
              <button className={cx("btn-edit")}>
                <FaEdit />
              </button>
              <button className={cx("btn-del")} onClick={()=>handleDelete(Number(a?.id))}>
                <FaTrash />
              </button>
            </td>
          </tr>
           ))}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <div className={cx("modal-x")}>
          <ModalFormAttribute handleClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default ModalListAttribute;
