import classNames from "classnames/bind";
import styles from "./OrderDetail.module.scss";
import OrderTableDetail from "./OrderTableDetail/OrderTableDetail";
import ShippingInfo from "./ShippingInfo/ShippingInfo";
import PaymentDetails from "./PaymentDetails/PaymentDetails";
import OrderSummary from "./OrderSummary/OrderSummary";
import TrackOrder from "./TrackOrder/TrackOrder";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { getOrder } from "../../../../Features/Slices/orderSlice";

const cx = classNames.bind(styles);

const OrderDetail = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);
  const { admin } = useAppSelector((state) => state.order);
  const { id } = useParams();

  const orderRecod = admin.find((a) => a.id == Number(id)) || null;
  console.log(orderRecod);

  return (
    <div className={cx("order-details")}>
      <h1>Order Details</h1>
      <div className={cx("container-body")}>
        <div className={cx("left-body")}>
          <OrderTableDetail data={orderRecod} />
          <div className={cx("grid-lane")}>
            <ShippingInfo data={orderRecod?.address ?? null} /> <PaymentDetails />
          </div>
        </div>
        <div className={cx("right-body")}>
          <OrderSummary data={orderRecod} />
          <TrackOrder data={orderRecod} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
