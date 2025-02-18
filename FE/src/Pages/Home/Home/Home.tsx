import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import SliderBanner from "./SliderBanner";
import CategoryHome from "./CategoryHome";
import VoucherList from "./VoucherList/VoucherList";
import ProductList from "./ProductList/ProductList";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useEffect } from "react";
import { getProducts } from "../../../Features/Slices/productSlice";
import { getCoupon } from "../../../Features/Slices/couponSlice";
const cx = classNames.bind(styles);
const Home = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { coupon } = useAppSelector((state) => state.coupon);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCoupon());
  }, [dispatch]);
  console.log(coupon);

  return (
    <div>
      <SliderBanner />
      <section className={cx("main")}>
        <h2>Tết An Lành</h2>
        <CategoryHome />
        <div className={cx("coupon-list")}>
          <h2>THÊM YÊU THÊM DEAL ĐỘC QUYỀN ONLINE</h2>
          {coupon.map((c) => (
            <VoucherList coupon={c} key={c?.id} />
          ))}
        </div>
        <ProductList type="nomal" data={products} />
      </section>
    </div>
  );
};

export default Home;
