import { Link } from "react-router-dom";

import style from "./VoucherList.module.scss";
import classNames from "classnames/bind";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useEffect } from "react";
import { destroyCoupon, getCoupon } from "../../../../Features/Slices/couponSlice";
import Loading from "../../../../Components/Loading";
import { convertVND } from "../../../../utils/func/convert";
const cx = classNames.bind(style);
const VoucherList = () => {
  const dispatch = useAppDispatch();
  const { coupon } = useAppSelector((state) => state.coupon);
  useEffect(() => {
    dispatch(getCoupon());
  }, [dispatch]);
  const hanleDelete = (id: number) => {
    if(confirm('Bạn muốn xoá ?')){
      dispatch(destroyCoupon(id));
    }
  };
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <div className={cx("search-container")}>
          <FaSearch className={cx("search-icon")} />
          <input
            type="text"
            placeholder="Type your query and press enter"
            className={cx("coupon-search")}
          />
        </div>
        <Link to="/admin/coupon/create" className={cx("add-coupon-button")}>
          + Thêm Mã Giảm Giá
        </Link>
      </div>

      <table className={cx("coupon-table")}>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã</th>
            <th>Tiêu đề</th>
            <th>Loại mã</th>
            <th>Giảm giá</th>
            <th>Kiểu giảm giá</th>
            <th>Giá trị đơn hàng tối thiểu</th>
            <th>Giảm tối đa</th>
            <th>Lượt sử dụng</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {coupon?.length === 0 ? (
            <tr>
              <td colSpan={13}>
                <Loading />
              </td>
            </tr>
          ) : (
            coupon?.map((a) => (
              <tr key={a?.id}>
                <td>{a?.id}</td>
                <td>{a?.code}</td>
                <td>{a?.title}</td>
                <td>{a?.voucher_type}</td>
                <td>{a?.value}</td>
                <td>{a?.discount_type}</td>
                <td>{convertVND(a?.min_order_value)}</td>
                <td>{convertVND(a?.max_discount_value)}</td>
                <td>{a?.limit}</td>
                <td>{a?.start_date}</td>
                <td> {a?.end_date}</td>

                <td>
                  <Link
                    to={`/admin/coupon/edit/${a?.id}`}
                    className={cx("edit-button")}
                    style={{ color: "orange" }}
                    title="Sửa mã giảm giá"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    onClick={() => hanleDelete(Number(a?.id))}
                    style={{
                      color: "red",
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "18px",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    title="Xoá mã giảm giá"
                  >
                    <FaTrash />
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

export default VoucherList;
